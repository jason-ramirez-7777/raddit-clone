import React from "react";

import Post from "@/components/Post";
import { PostProps } from "@/lib/interface";
import SidebarWrapper from "@/providers/SidebarWrapper";

import { api } from "@/trpc/server";
import { posts } from "@/lib/mockdata";

export default async function MyPostsPage() {
  return (
    <SidebarWrapper>
      <div className="flex flex-col w-[600px] py-12">
        {
          posts.map((post: PostProps) => (
            <Post key={post.id} {...post} />
          ))
        }
      </div>
    </SidebarWrapper>
  );
}
