import React from "react";

import CreatePostInput from "@/components/CreatePostInput";
import Post from "@/components/Post";
import { posts } from "@/lib/mockdata";
import { PostProps } from "@/lib/interface";
import SidebarWrapper from "@/providers/SidebarWrapper";

// import { api } from "@/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <SidebarWrapper>
      <div className="flex flex-col py-12">
        <CreatePostInput />

        {
          posts.map((post: PostProps) => (
            <Post key={post.id} {...post} />
          ))
        }
      </div>
    </SidebarWrapper>
  );
}
