import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UpvoteIcon from "@/components/icons/UpvoteIcon";
import DownvoteIcon from "@/components/icons/DownvoteIcon";
import { PostProps, User } from "@/lib/interface";
import { users } from "@/lib/mockdata";

const PostDetail = (props: PostProps) => {
  const { id, title, content, votes } = props;
  const user = users.find((user: User) => user.id === id);

  return (
    <div className="w-[600px]">
      <div className="flex w-full my-2">
        <div className="flex flex-col justify-between items-center h-24 mx-2">
          <button className="[&_path]:hover:stroke-primary">
            <UpvoteIcon color="black" />
          </button>

          <p>{votes}</p>

          <button className="[&_path]:hover:stroke-primary">
            <DownvoteIcon color="black" />
          </button>
        </div>

        <div className="flex flex-col w-full ml-2">
          <div className="flex items-center">
            <Avatar className="w-6 h-6">
              <AvatarImage src={user?.avatar} alt="shadcn" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>

            <p className="ml-2 text-sm text-gray-700">Posted by {user?.name} 3 hours ago</p>
          </div>

          <h1 className="py-2">{title}</h1>

          <p className="text-sm text-gray-700">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;