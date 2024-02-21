import React from "react";

import CreatePostInput from "@/components/CreatePostInput";
import Post from "@/components/Post";
import { PostProps } from "@/lib/interface";
import SidebarWrapper from "@/providers/SidebarWrapper";

import { api } from "@/trpc/server";

export default async function Home() {
  const posts = await api.post.getAll.query();

  return (
    <SidebarWrapper>
      <div className="flex flex-col w-[600px] py-12">
        <CreatePostInput />

        {/* {
          posts.map((post: PostProps) => (
            <Post key={post.id} {...post} />
          ))
        } */}
      </div>
    </SidebarWrapper>
  );
}
