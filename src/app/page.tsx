"use client";

import React from "react";

import CreatePostInput from "@/components/CreatePostInput";
import Post from "@/components/Post";
import { PostType } from "@/lib/interface";
import SidebarWrapper from "@/providers/SidebarWrapper";
import { api } from "@/trpc/react";

export default function Home() {
  const [postList, setPostList] = React.useState<any>([]);
  const posts = api.post.getAll.useQuery().data;

  React.useEffect(() => {
    setPostList(posts);
  }, [posts]);

  return (
    <SidebarWrapper>
      <div className="flex flex-col w-[600px] py-12">
        <CreatePostInput list={postList} setter={setPostList} />

        {
          postList && postList.map((post: PostType) => (
            <Post key={post.id} {...post} />
          ))
        }
      </div>
    </SidebarWrapper>
  );
}
