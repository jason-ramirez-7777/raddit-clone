"use client";

import React from "react";
import { useClerk } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UpvoteIcon from "@/components/icons/UpvoteIcon";
import DownvoteIcon from "@/components/icons/DownvoteIcon";
import { PostProps } from "@/lib/interface";
import { calculateAgeOfPost, checkVoteStatus, devotePost, votePost } from "@/lib/utils";
import { api } from "@/trpc/react";

const PostDetail = (props: PostProps) => {
  const { id, title, content, votes, voteUsers, authorId, createdAt } = props;  // Initialize TRPC mutation for voting
  const mutation = api.post.votePost.useMutation(); // Fetch poster data using TRPC query
  const { data: poster }: any = api.user.get.useQuery({ id: authorId });  // Get current user using Clerk hook
  const { user } = useClerk();

  // Local state for votes and vote users
  const [localVotes, setLocalVotes] = React.useState(votes);
  const [localVoteUsers, setLocalVoteUsers] = React.useState(voteUsers || []);

  return (
    <div className="w-full px-4 md:px-0 md:w-[600px]">
      <div className="flex w-full my-2">
        {/* Upvote button */}
        <div className="flex flex-col justify-between items-center h-24 mx-2">
          <button className="[&_path]:hover:stroke-primary" onClick={() => votePost(mutation, id, user!.id, localVotes, localVoteUsers, setLocalVotes, setLocalVoteUsers)}>
            <UpvoteIcon color={checkVoteStatus(user!.id, localVoteUsers) === 1 ? "#4F46E5" : "black"} />
          </button>

          {/* Display total votes */}
          <p>{localVotes}</p>

          {/* Downvote button */}
          <button className="[&_path]:hover:stroke-primary" onClick={() => devotePost(mutation, id, user!.id, localVotes, localVoteUsers, setLocalVotes, setLocalVoteUsers)}>
            <DownvoteIcon color={checkVoteStatus(user!.id, localVoteUsers) === 1 ? "#4F46E5" : "black"} />
          </button>
        </div>

        {/* Post details */}
        <div className="flex flex-col w-full ml-2">
          <div className="flex items-center">
            {/* Display poster avatar */}
            <Avatar className="w-6 h-6">
              <AvatarImage src={poster?.avatar} alt="shadcn" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>

            {/* Display poster name and post age */}
            <p className="ml-2 text-sm text-gray-700">
              Posted by {poster?.name} {calculateAgeOfPost(createdAt)}
            </p>
          </div>

          {/* Display post title */}
          <h1 className="py-2">{title}</h1>

          {/* Display post content */}
          <p className="text-sm text-gray-700">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
