import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({

    login: publicProcedure
        .input(z.object({ email: z.string().email() }))
        .mutation(async ({ ctx, input }) => {
            const { email } = input;
            try {
                const user = await ctx.db.user.findUnique({
                    where: {
                        email
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

    register: publicProcedure
        .input(z.object({ email: z.string().email(), name: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            const { email, name } = input;
            try {
                // Check if user with the provided email already exists
                const existingUser = await ctx.db.user.findUnique({
                    where: {
                        email
                    }
                });

                // If user already exists, return an error
                if (existingUser) {
                    return { error: 'Email already in use' };
                }

                // If user doesn't exist, create a new user
                const user = await ctx.db.user.create({
                    data: {
                        email,
                        name
                    }
                });
                return user;
            } catch (error) {
                console.error('Error registering user:', error);
                return { error: 'Internal server error' };
            }
        }),
});
