import React from "react";
import { currentUser } from "@clerk/nextjs";
import { api } from "@/trpc/server";

export default async function AuthProvider({ children }: { children: React.ReactNode }) {
  // Fetching the current user using the currentUser function from Clerk
  const user = await currentUser();

  if (user) {
    // Calling the mutate function of the user.auth endpoint in the server-side tRPC API
    await api.user.auth.mutate({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0]?.emailAddress || "",
      avatar: user.imageUrl
    });
  }

  return (
    <div>{children}</div>
  );
}
