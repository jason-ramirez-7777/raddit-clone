"use client";

import React from "react";
import { useClerk } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { api } from "@/trpc/react";

const CreatePostInput = ({ list, setter }: any) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { user } = useClerk();
  const mutation = api.post.create.useMutation();

  const createPost = () => {
    setIsLoading(true);

    mutation.mutate(
      {
        title,
        content,
        authorId: user?.id || ""
      },
      {
        onSuccess: (newPost) => {
          setTitle("");
          setContent("");
          setter([newPost, ...list]);
          setIsLoading(false);
        },
        onError: (error) => {
          console.error("Mutation Error", error);
          setIsLoading(false);
        }
      }
    );
  };

  return (
    <div className="flex w-full rounded-xl border border-[#E5E7EB] p-4 mb-2 shadow-md shadow-gray-100">
      <div className="mr-4 flex items-start justify-start">
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>{user?.firstName?.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-grow flex-col">
        <input
          placeholder="Title of your post"
          className="outline-none mb-2"
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
          disabled={isLoading}
        />

        <AutosizeTextarea
          placeholder="Share your thoughts with the world!"
          className="resize-none rounded-none tracking-wide border-0 border-b border-gray-300 p-0 text-base focus-visible:border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={content}
          onChange={({ target: { value } }) => setContent(value)}
          disabled={isLoading}
        />

        <div className="flex w-full justify-end ">
          <Button
            className="mt-2 rounded-lg px-4 py-2 text-sm text-white"
            onClick={createPost}
            disabled={isLoading}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostInput;
