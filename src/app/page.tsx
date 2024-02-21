// "use client";

import { unstable_noStore as noStore } from "next/cache";
import React from "react";

import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/Sidebar";
import PostList from "@/components/PostList";

import { api } from "@/trpc/server";

export default async function Home() {
  noStore();

  // const user = api.user.auth.mutate({
  //   email: 'anthony.bartolotte.1010@gmail.com',
  //   name: 'Anthony Bartolotte',
  //   avatar: 'https://www.no.avatar.com/m.png'
  // });

  // const user = api.user.get.query({ id: 1 });

  // console.log(user);

  return (
    <main className="flex w-full min-h-screen">
      <Sidebar />
      <Separator orientation="vertical" className="h-screen" />
      <PostList />
    </main>
  );
}
