"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UpvoteIcon from "@/components/icons/UpvoteIcon";
import DownvoteIcon from "@/components/icons/DownvoteIcon";
import { PostType } from "@/lib/interface";
import { calculateAgeOfPost, checkVoteStatus, unvotePost, votePost } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useClerk } from "@clerk/nextjs";

const PostDetail = (props: PostType) => {
  const { id, title, content, votes, voteUsers, authorId, createdAt } = props;
  const mutation = api.post.votePost.useMutation();
  const { data: poster }: any = api.user.get.useQuery({ id: authorId });
  const { user } = useClerk();

  const [localVotes, setLocalVotes] = React.useState(votes);
  const [localVoteUsers, setLocalVoteUsers] = React.useState(voteUsers || []);

  return (
    <div className="w-full px-4 md:px-0 md:w-[600px]">
      <div className="flex w-full my-2">
        <div className="flex flex-col justify-between items-center h-24 mx-2">
          <button className="[&_path]:hover:stroke-primary" onClick={() => votePost(mutation, id, user!.id, localVotes, localVoteUsers, setLocalVotes, setLocalVoteUsers)}>
            <UpvoteIcon color={checkVoteStatus(user!.id, localVoteUsers) === 1 ? "#4F46E5" : "black"} />
          </button>

          <p>{localVotes}</p>

          <button className="[&_path]:hover:stroke-primary" onClick={() => unvotePost(mutation, id, user!.id, localVotes, localVoteUsers, setLocalVotes, setLocalVoteUsers)}>
            <DownvoteIcon color={checkVoteStatus(user!.id, localVoteUsers) === 1 ? "#4F46E5" : "black"} />
          </button>
        </div>

        <div className="flex flex-col w-full ml-2">
          <div className="flex items-center">
            <Avatar className="w-6 h-6">
              <AvatarImage src={poster?.avatar} alt="shadcn" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>

            <p className="ml-2 text-sm text-gray-700">
              Posted by {poster?.name} {calculateAgeOfPost(createdAt)}
            </p>
          </div>

          <h1 className="py-2">{title}</h1>

          <p className="text-sm text-gray-700">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;