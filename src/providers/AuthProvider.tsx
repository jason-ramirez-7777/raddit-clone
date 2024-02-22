import React from "react";
import { currentUser } from "@clerk/nextjs";
import { api } from "@/trpc/server";

export default async function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  if (user) {
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