"use client";

import React from "react";

import CreatePostInput from "@/components/CreatePostInput";
import Post from "@/components/Post";
import { PostType } from "@/lib/interface";
import SidebarWrapper from "@/providers/SidebarWrapper";
import { api } from "@/trpc/react";
import { useClerk } from "@clerk/nextjs";

export default function MyPostsPage() {
  const { user } = useClerk();
  const { data: posts }: any = api.post.getAll.useQuery();

  return (
    <SidebarWrapper>
      <div className="flex flex-col w-[600px] py-12">
        <CreatePostInput />

        {
          posts && posts.filter((post: PostType) => post.authorId === user?.id).map((post: PostType) => (
            <Post key={post.id} {...post} />
          ))
        }
      </div>
    </SidebarWrapper>
  );
}
