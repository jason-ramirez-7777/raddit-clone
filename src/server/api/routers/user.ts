// Importing necessary dependencies
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// Creating a TRPC router for handling user-related operations
export const userRouter = createTRPCRouter({

    // Defining an authentication procedure for user-related operations
    auth: publicProcedure
        .input(z.object({
            id: z.string().min(1),
            email: z.string().email(),
            name: z.string().min(1),
            avatar: z.string().min(1)
        }))
        // Handling user registration (mutation)
        .mutation(async ({ ctx, input }) => {
            const { id, email, name, avatar } = input;
            try {
                // Check if user with the provided email already exists
                const existingUser = await ctx.db.user.findUnique({ where: { id } });

                // If user already exists, return an error
                if (existingUser) {
                    return existingUser;
                }

                // If user doesn't exist, create a new user
                const user = await ctx.db.user.create({
                    data: { id, email, name, avatar }
                });
                return user;
            } catch (error) {
                // Log and return an error message in case of any errors
                console.error('Error registering user:', error);
                return { error: 'Internal server error' };
            }
        }),

    // Handling fetching user details (query)
    get: publicProcedure
        .input(z.object({ id: z.string().min(1) }))
        .query(async ({ ctx, input }) => {
            const { id } = input;
            try {
                // Find the user with the provided ID
                const user = await ctx.db.user.findUnique({ where: { id } });
                if (!user) {
                    // If user not found, return an error
                    return { error: 'User not found' };
                }
                // Return user details
                return user;
            } catch (error) {
                // Log and return an error message in case of any errors
                console.error('Error logging in:', error);
                return { error: 'Internal server error' };
            }
        }),
});
