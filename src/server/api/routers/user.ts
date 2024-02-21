import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({

    auth: publicProcedure
        .input(z.object({ email: z.string().email(), name: z.string().min(1), avatar: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            const { email, name, avatar } = input;
            try {
                // Check if user with the provided email already exists
                const existingUser = await ctx.db.user.findUnique({
                    where: {
                        email
                    }
                });

                // If user already exists, return an error
                if (existingUser) {
                    return existingUser;
                }

                // If user doesn't exist, create a new user
                const user = await ctx.db.user.create({
                    data: {
                        email,
                        name,
                        avatar
                    }
                });
                return user;
            } catch (error) {
                console.error('Error registering user:', error);
                return { error: 'Internal server error' };
            }
        }),

    get: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ ctx, input }) => {
            const { id } = input;
            try {
                const user = await ctx.db.user.findUnique({
                    where: {
                        id
                    }
                });
                if (!user) {
                    return { error: 'User not found' };
                }
                return user;
            } catch (error) {
                console.error('Error logging in:', error);
                return { error: 'Internal server error' };
            }
        }),
});
