import { unstable_noStore as noStore } from "next/cache";
import React from "react";

import PostList from "@/components/PostList";
import SidebarWrapper from "@/providers/SidebarWrapper";

import { api } from "@/trpc/server";

export default async function Home() {
  noStore();
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  // const user = api.user.auth.mutate({
  //   email: 'anthony.bartolotte.1010@gmail.com',
  //   name: 'Anthony Bartolotte',
  //   avatar: 'https://www.no.avatar.com/m.png'
  // });

  // const user = api.user.get.query({ id: 1 });

  // console.log(user);

  return (
    <SidebarWrapper>
      <PostList />
    </SidebarWrapper>
  );
}
