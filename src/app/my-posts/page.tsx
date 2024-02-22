"use client";

import React from "react";
import { Loader } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import CreatePostInput from "@/components/CreatePostInput";
import Post from "@/components/Post";
import { PostProps } from "@/lib/interface";
import SidebarWrapper from "@/providers/SidebarWrapper";
import { api } from "@/trpc/react";

// This component represents a page displaying posts authored by the current user.
export default function MyPostsPage() {
  // State variables to manage loading state and post list.
  const [isLoading, setIsLoading] = React.useState(true);
  const [postList, setPostList] = React.useState<PostProps[]>([]);
  
  // Fetch posts using tRPC query.
  const posts: any = api.post.getAll.useQuery().data;
  
  // Retrieve current user using Clerk.
  const { user } = useClerk();

  // Effect hook to update post list and loading state when posts data changes.
  React.useEffect(() => {
    // Update post list when posts data is available.
    setPostList(posts);
    // Once posts data is available, set loading state to false.
    posts && setIsLoading(false);
  }, [posts]);

  return (
    // SidebarWrapper provides a layout structure for the page.
    <SidebarWrapper>
      {/* Main content container */}
      <div className="flex flex-col w-full px-4 md:px-0 md:w-[600px] py-12">
        {/* Component for creating new posts */}
        <CreatePostInput list={postList} setter={setPostList} />

        {/* Conditional rendering based on loading state and post list */}
        {isLoading ? (
          // Render a loading spinner while posts are being fetched
          <div className="flex justify-center w-full p-8">
            <Loader size={48} className="text-dark animate-spin duration-1000" />
          </div>
        ) : postList?.length > 0 ? (
          // Render each post authored by the current user
          postList.filter((list: PostProps) => list.authorId === user!.id).map((post: PostProps) => post.id && (
            <Post key={post.id} {...post} />
          ))
        ) : (
          // Render a message when there are no posts to display
          <p className="w-full p-4 text-center text-xl text-gray-400">No Posts</p>
        )}
      </div>
    </SidebarWrapper>
  );
}
