"use client";

import React from "react";
import UpvoteIcon from "@/components/icons/UpvoteIcon";
import DownvoteIcon from "@/components/icons/DownvoteIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReplyIcon from "./icons/ReplyIcon";

const Comment = () => {
  return (
    <div className="w-full">

      <div className="flex w-full">
        <div className="flex flex-col w-full ml-2">
          <div className="flex items-center">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>PJ</AvatarFallback>
            </Avatar>

            <p className="ml-2 text-sm text-gray-700">Posted by limerider 3 hours ago</p>
          </div>

          <p className="my-3 text-sm">Tell me your good and bad experiences of using Lime as a Rider in London</p>
        </div>
      </div>

      <div className="flex items-center px-2">
        <button className="[&_path]:hover:stroke-primary">
          <UpvoteIcon color="black" />
        </button>

        <p className="px-2">-15</p>

        <button className="[&_path]:hover:stroke-primary">
          <DownvoteIcon color="black" />
        </button>

        <button className="flex items-center ml-6 [&_path]:hover:stroke-primary hover:text-primary">
          <ReplyIcon color="black" />
          <p className="ml-2">Reply</p>
        </button>
      </div>
    </div>
  );
};

export default Comment;
