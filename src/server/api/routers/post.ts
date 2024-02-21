import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// Recursive function to fetch nested children posts
async function fetchNestedChildren(db: any, postId: number) {
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
      return {
        ...child,
        children: grandchildren,
      };
    }),
  );

  return nestedChildren;
}

export const postRouter = createTRPCRouter({

  // Create a new post
  create: publicProcedure
    .input(z.object({
      title: z.string().min(1),
      content: z.string().min(1),
      authorId: z.number(),
      parentId: z.number().optional()
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          title: input.title,
          content: input.content,
          votes: 0,
          authorId: input.authorId,
          parentId: input.parentId || null, // Assuming "parentId" is optional and can be null
        },
      });
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
        return posts;
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
          return {
            ...post,
            children: nestedChildren
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
      return ctx.db.post.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
          votes: input.votes,
        },
      });
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
});
