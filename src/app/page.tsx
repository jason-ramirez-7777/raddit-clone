import { unstable_noStore as noStore } from "next/cache";
import React from "react";

import PostList from "@/components/PostList";
import SidebarWrapper from "@/providers/SidebarWrapper";

// import { api } from "@/trpc/server";

export default async function Home() {
  noStore();
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <SidebarWrapper>
      <PostList />
    </SidebarWrapper>
  );
}
