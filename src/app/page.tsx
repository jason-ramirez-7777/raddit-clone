"use client";

import React from "react";
import { Loader } from "lucide-react";
import CreatePostInput from "@/components/CreatePostInput";
import Post from "@/components/Post";
import { PostProps } from "@/lib/interface";
import SidebarWrapper from "@/providers/SidebarWrapper";
import { api } from "@/trpc/react";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true); // State to manage loading status
  const [postList, setPostList] = React.useState<PostProps[]>([]); // State to manage list of posts

  // Fetching posts data using trpc hook
  const posts: any = api.post.getAll.useQuery().data;

  React.useEffect(() => {
    // Updating postList state when posts data is fetched
    setPostList(posts);
    // Setting loading status to false if posts data is available
    posts && setIsLoading(false);
  }, [posts]); // Running this effect whenever posts data changes

  return (
    <SidebarWrapper>
      <div className="flex flex-col w-full px-4 md:px-0 md:w-[600px] py-12">
        <CreatePostInput list={postList} setter={setPostList} /> {/* Rendering CreatePostInput component with props */}

        {
          isLoading ? ( // Conditional rendering based on loading status
            <div className="flex justify-center w-full p-8">
              <Loader size={48} className="text-dark animate-spin duration-1000" /> {/* Rendering loader component */}
            </div>
          ) : postList?.length > 0 ? ( // Conditional rendering based on presence of posts in the list
            postList.map((post: PostProps) => post.id && (
              <Post key={post.id} {...post} /> // Rendering Post component with individual post data
            ))
          ) : (
            <p className="w-full p-4 text-center text-xl text-gray-400">No Posts</p> // Rendering a message when no posts are available
          )
        }
      </div>
    </SidebarWrapper>
  );
}
