"use client";

import React from "react";
import { useClerk } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { api } from "@/trpc/react";

const ReplyInput = ({ post, setter }: any) => {
  const { user } = useClerk(); // Accessing the currently logged-in user using Clerk authentication
  const mutation = api.post.create.useMutation(); // Defining a mutation hook for creating a new comment

  const [content, setContent] = React.useState(""); // Storing the content of the comment
  const [isLoading, setIsLoading] = React.useState(false); // Managing loading state of comment submission

  const postComment = () => {
    setIsLoading(true); // Setting loading state to true when submitting comment

    mutation.mutate(
      {
        title: "Comment",
        content,
        parentId: post.id,
        authorId: user?.id || "" // 'authorId' is required and fallbacks to an empty string if user is not available
      },
      {
        onSuccess: (data) => { // Callback function for successful comment submission
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
          className="min-h-[55px] resize-none rounded-none border-0 border-b border-gray-300 p-0 text-sm focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0" // Styling for the comment input field
          value={content}
          onChange={({ target: { value } }) => setContent(value)}
          disabled={isLoading} // Disabling the input field when comment is being submitted
        />

        <div className="flex w-full justify-end ">
          <Button
            className="mt-2 rounded-lg px-4 py-2 text-sm text-white"
            onClick={postComment} // Function to be called when the comment submission button is clicked
            disabled={isLoading} // Disabling the button when comment is being submitted
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReplyInput;
