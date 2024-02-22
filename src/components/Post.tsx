"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UpvoteIcon from "@/components/icons/UpvoteIcon";
import DownvoteIcon from "@/components/icons/DownvoteIcon";
import { PostType } from "@/lib/interface";
import { calculateAgeOfPost, unvotePost, sliceContent, votePost, checkVoteStatus } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useClerk } from "@clerk/nextjs";

const Post = (props: PostType) => {
  const { id, title, content, votes, voteUsers, authorId, createdAt } = props;
  const router = useRouter();
  const mutation = api.post.votePost.useMutation();
  const { data: poster }: any = api.user.get.useQuery({ id: authorId });
  const { user } = useClerk();

  const [localVotes, setLocalVotes] = React.useState(votes);
  const [localVoteUsers, setLocalVoteUsers] = React.useState(voteUsers || []);

  return (
    <div className="w-full px-4 md:px-0 md:w-[600px]">
      <div className="flex w-full my-10">
        <div className="flex flex-col justify-between items-center h-20 mx-2">
          <button className="[&_path]:hover:stroke-primary" onClick={() => votePost(mutation, id, user!.id, localVotes, localVoteUsers, setLocalVotes, setLocalVoteUsers)}>
            <UpvoteIcon color={checkVoteStatus(user!.id, localVoteUsers) === 1 ? "#4F46E5" : "black"} />
          </button>

          <p>{localVotes}</p>

          <button className="[&_path]:hover:stroke-primary" onClick={() => unvotePost(mutation, id, user!.id, localVotes, localVoteUsers, setLocalVotes, setLocalVoteUsers)}>
            <DownvoteIcon color={checkVoteStatus(user!.id, localVoteUsers) === -1 ? "#4F46E5" : "black"} />
          </button>
        </div>

        <div className="flex flex-col w-full ml-2 cursor-pointer">
          <div className="flex items-center">
            <Avatar className="w-6 h-6">
              <AvatarImage src={poster?.avatar} alt="shadcn" />
              <AvatarFallback>{poster?.name.slice(0, 1)}</AvatarFallback>
            </Avatar>

            <p className="ml-2 text-sm text-gray-700">
              Posted by {poster?.name} {calculateAgeOfPost(createdAt)}
            </p>
          </div>

          <h1 className="py-2 hover:text-primary" onClick={() => router.push(`/posts/${id}`)}>{title}</h1>
          <p className="text-sm text-gray-700">{sliceContent(content)}</p>
        </div>
      </div>

      <Separator />
    </div>
  );
};

export default Post;