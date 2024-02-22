"use client";

import React from "react";
import { Loader } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import CreatePostInput from "@/components/CreatePostInput";
import Post from "@/components/Post";
import { PostType } from "@/lib/interface";
import { api } from "@/trpc/react";
import SidebarWrapper from "@/providers/SidebarWrapper";

export default function MyPostsPage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [postList, setPostList] = React.useState<PostType[]>([]);
  const posts: any = api.post.getAll.useQuery().data;
  const { user } = useClerk();

  React.useEffect(() => {
    setPostList(posts);
    posts && setIsLoading(false);
  }, [posts]);

  return (
    <SidebarWrapper>
      <div className="flex flex-col w-full px-4 md:px-0 md:w-[600px] py-12">
        <CreatePostInput list={postList} setter={setPostList} />

        {
          isLoading ? (
            <div className="flex justify-center w-full p-8">
              <Loader size={48} className="text-dark animate-spin duration-1000" />
            </div>
          ) : postList?.length > 0 ? postList.filter((list: PostType) => list.authorId === user!.id).map((post: PostType) => post.id && (
            <Post key={post.id} {...post} />
          )) : (
            <p className="w-full p-4 text-center text-xl text-gray-400">No Posts</p>
          )
        }
      </div>
    </SidebarWrapper>
  );
}
