// "use client";

import { unstable_noStore as noStore } from "next/cache";
import React from "react";

import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/Sidebar";
import PostList from "@/components/PostList";

// import { api } from "@/trpc/server";

export default async function Home() {
  noStore();

  return (
    <main className="flex w-full min-h-screen">
      <Sidebar />
      <Separator orientation="vertical" className="h-screen" />
      <PostList />
    </main>
  );
}
