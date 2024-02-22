import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// Recursive function to fetch nested children posts
const fetchNestedChildren = async (db: any, postId: number) => {
  const children = await db.post.findMany({
    where: {
      parentId: postId,
    },
  });

  if (children.length === 0) {
    return [];
  }

  const nestedChildren = await Promise.all(
    children.map(async (child: any) => {
      const grandchildren = await fetchNestedChildren(db, child.id);
      const voteUsers = await fetchVoteUsers(db, postId);
      return {
        ...child,
        children: grandchildren,
        voteUsers
      };
    }),
  );

  return nestedChildren;
}

const fetchVoteUsers = async (db: any, postId: number) => {
  const voteUsers = await db.vote.findMany({ where: { postId } });
  return voteUsers;
}

export const postRouter = createTRPCRouter({
  // Create a new post
  create: publicProcedure
    .input(z.object({
      title: z.string().min(1),
      content: z.string().min(1),
      authorId: z.string(),
      parentId: z.number().optional()
    }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.create({
        data: {
          title: input.title,
          content: input.content,
          votes: 0,
          authorId: input.authorId,
          parentId: input.parentId || null, // Assuming "parentId" is optional and can be null
        },
      });

      return post;
    }),

  // Fetch all posts
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      try {
        const posts = await ctx.db.post.findMany({
          where: {
            parentId: null // Fetch only top-level posts
          }
        });
        const postsWithVoteUsers = posts.map(async (post) => ({
          ...post,
          voteUsers: await fetchVoteUsers(ctx.db, post.id)
        }));
        return postsWithVoteUsers.reverse();
      } catch (error) {
        console.error("Error fetching posts:", error);
        return { error: "Internal server error" };
      }
    }),

  // Fetch post details
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;
      try {
        const post = await ctx.db.post.findUnique({ where: { id } });
        if (post) {
          const nestedChildren = await fetchNestedChildren(ctx.db, post.id);
          const voteUsers = await fetchVoteUsers(ctx.db, post.id);
          return {
            ...post,
            children: nestedChildren,
            voteUsers
          };
        }
        return { error: "Post not found" };
      } catch (error) {
        console.error("Error fetching posts:", error);
        return { error: "Internal server error" };
      }
    }),

  // Update a post
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().min(1).optional(),
      content: z.string().min(1).optional(),
      votes: z.number().optional()
    }))
    .mutation(async ({ ctx, input }) => {
      const updatedPost = await ctx.db.post.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
          votes: input.votes,
        },
      });

      return updatedPost;
    }),

  // Delete a post
  delete: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.post.delete({
        where: { id: input.id },
      });
      return { message: `Post with ID ${input.id} deleted successfully.` };
    }),

  votePost: publicProcedure
    .input(z.object({
      id: z.number(),
      score: z.number(),
      userId: z.string().min(1)
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, score, userId } = input;
      try {
        const [post, user, vote] = await Promise.all([
          ctx.db.post.findUnique({ where: { id } }),
          ctx.db.user.findUnique({ where: { id: userId } }),
          ctx.db.vote.findUnique({ where: { voteId: { postId: id, userId } } })
        ]);

        if (!post || !user) {
          throw new Error('Post or user not found');
        }

        await ctx.db.$transaction(async (tx) => {
          if (vote) {
            const updatedPostVotes = post.votes - vote.score + score;
            await Promise.all([
              tx.post.update({ where: { id }, data: { votes: updatedPostVotes } }),
              tx.vote.update({ where: { id: vote.id }, data: { score } })
            ]);
            return { message: 'Vetoed successfully.' };
          } else {
            await Promise.all([
              tx.post.update({ where: { id }, data: { votes: { increment: score } } }),
              await tx.vote.create({ data: { userId: user.id, postId: post.id, score } })
            ]);
            return { message: 'Voted successfully.' };
          }
        });
      } catch (error) {
        console.error('Error in votePost:', error);
        throw new Error('Failed to vote or veto');
      }
    }),
});
