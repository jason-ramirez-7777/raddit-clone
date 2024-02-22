// Importing necessary modules
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// Recursive function to fetch nested children posts
const fetchNestedChildren = async (db: any, postId: number) => {
  // Fetch direct children of the post with given postId
  const children = await db.post.findMany({
    where: {
      parentId: postId,
    },
  });

  // Base case: if no children found, return an empty array
  if (children.length === 0) {
    return [];
  }

  // Recursively fetch nested children for each direct child
  const nestedChildren = await Promise.all(
    children.map(async (child: any) => {
      const grandchildren = await fetchNestedChildren(db, child.id); // Recursive call
      const voteUsers = await fetchVoteUsers(db, postId); // Fetch users who voted for this post
      return {
        ...child,
        children: grandchildren,
        voteUsers
      };
    }),
  );

  return nestedChildren;
}

// Function to fetch users who voted for a post
const fetchVoteUsers = async (db: any, postId: number) => {
  const voteUsers = await db.vote.findMany({ where: { postId } });
  return voteUsers;
}

// Exporting the postRouter
export const postRouter = createTRPCRouter({
  // Method to create a new post
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

      return { ...post, children: [] };
    }),

  // Method to fetch all top-level posts
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      try {
        const posts = await ctx.db.post.findMany({
          where: {
            parentId: null // Fetch only top-level posts
          }
        });

        // Fetch vote users for each post in parallel
        const postsWithVoteUsers = await Promise.all(posts.map(async (post) => {
          const voteUsers = await fetchVoteUsers(ctx.db, post.id);
          return { ...post, voteUsers };
        }));
        return postsWithVoteUsers.reverse(); // Reverse the order of posts
      } catch (error) {
        console.error("Error fetching posts:", error);
        return { error: "Internal server error" };
      }
    }),

  // Method to fetch details of a specific post
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;
      try {
        const post = await ctx.db.post.findUnique({ where: { id } });
        if (post) {
          // Fetch nested children and vote users for the post
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

  // Method to update a post
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

  // Method to delete a post
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

  // Method to vote for a post
  votePost: publicProcedure
    .input(z.object({
      id: z.number(),
      score: z.number(),
      userId: z.string().min(1)
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, score, userId } = input;
      try {
        // Fetch post, user, and vote (if exists) in parallel
        const [post, user, vote] = await Promise.all([
          ctx.db.post.findUnique({ where: { id } }),
          ctx.db.user.findUnique({ where: { id: userId } }),
          ctx.db.vote.findUnique({ where: { voteId: { postId: id, userId } } })
        ]);

        if (!post || !user) {
          throw new Error('Post or user not found');
        }

        // Execute transaction to update post votes and insert/update vote record
        await ctx.db.$transaction(async (tx) => {
          if (vote) { // If vote already exists, update it
            const updatedPostVotes = post.votes - vote.score + score;
            await Promise.all([
              tx.post.update({ where: { id }, data: { votes: updatedPostVotes } }),
              tx.vote.update({ where: { id: vote.id }, data: { score } })
            ]);
            return { message: 'Voted successfully.' };
          } else { // If vote doesn't exist, create a new one
            await Promise.all([
              tx.post.update({ where: { id }, data: { votes: { increment: score } } }),
              tx.vote.create({ data: { userId: user.id, postId: post.id, score } })
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
