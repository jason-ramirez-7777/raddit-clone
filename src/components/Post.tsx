"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UpvoteIcon from "@/components/icons/UpvoteIcon";
import DownvoteIcon from "@/components/icons/DownvoteIcon";
import { PostType } from "@/lib/interface";
import { calculateAgeOfPost, sliceContent } from "@/lib/utils";
import { api } from "@/trpc/react";

const Post = (props: PostType) => {
  const { id, title, content, votes, authorId, createdAt } = props;
  const router = useRouter();

  const { data: user }: any = api.user.get.useQuery({ id: authorId });

  return (
    <div className="w-[600px]">
      <div className="flex w-full my-10">
        <div className="flex flex-col justify-between items-center h-20 mx-2">
          <button className="[&_path]:hover:stroke-primary">
            <UpvoteIcon color="black" />
          </button>

          <p>{votes}</p>

          <button className="[&_path]:hover:stroke-primary">
            <DownvoteIcon color="black" />
          </button>
        </div>

        <div className="flex flex-col w-full ml-2 cursor-pointer">
          <div className="flex items-center">
            <Avatar className="w-6 h-6">
              <AvatarImage src={user?.avatar} alt="shadcn" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>

            <p className="ml-2 text-sm text-gray-700">
              Posted by {user?.name} {calculateAgeOfPost(createdAt)}
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