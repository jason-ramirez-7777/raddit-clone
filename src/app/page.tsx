import React from "react";

import CreatePostInput from "@/components/CreatePostInput";
import Post from "@/components/Post";
import { PostProps } from "@/lib/interface";
import SidebarWrapper from "@/providers/SidebarWrapper";

import { api } from "@/trpc/server";

export default async function Home() {
  const posts = await api.post.getAll.query();

  // const user = api.user.auth.mutate({
  //   email: 'anthony.bartolotte.1010@gmail.com',
  //   name: 'Anthony Bartolotte',
  //   avatar: 'https://www.no.avatar.com/m.png'
  // });

  // const user = api.user.get.query({ id: 1 });

  // console.log(user);

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
