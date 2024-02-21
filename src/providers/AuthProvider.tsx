import React from "react";
import { currentUser } from "@clerk/nextjs";
import { api } from "@/trpc/server";

export default async function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  return (
    <div>{children}</div>
  );
}