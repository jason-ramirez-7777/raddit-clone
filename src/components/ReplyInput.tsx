"use client";

import React from "react";
import { useClerk } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

const ReplyInput = ({ post, setter }: any) => {
  const { user } = useClerk();
  const mutation = api.post.create.useMutation();

  const [content, setContent] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const postComment = () => {
    setIsLoading(true);

    mutation.mutate(
      {
        title: "Comment",
        content,
        parentId: post.id,
        authorId: user?.id || ""
      },
      {
        onSuccess: (data) => {
          setter({ ...post, children: [...post.children, data] });
          setContent("");
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
    <div className="my-4 flex w-full rounded-xl border border-[#E5E7EB] p-4 pb-3 shadow-md shadow-gray-100">
      <div className="mr-4 flex items-start justify-start">
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>{user?.firstName?.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-grow flex-col">
        <AutosizeTextarea
          placeholder="Comment your thoughts"
          className="min-h-[55px] resize-none rounded-none border-0 border-b border-gray-300 p-0 text-sm focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={content}
          onChange={({ target: { value } }) => setContent(value)}
          disabled={isLoading}
        />

        <div className="flex w-full justify-end ">
          <Button
            className="mt-2 rounded-lg px-4 py-2 text-sm text-white"
            onClick={postComment}
            disabled={isLoading}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReplyInput;
