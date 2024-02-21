import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UpvoteIcon from "@/components/icons/UpvoteIcon";
import DownvoteIcon from "@/components/icons/DownvoteIcon";

const PostDetail = () => {
  return (
    <div className="w-[600px]">
      <div className="flex w-full my-2">
        <div className="flex flex-col justify-between items-center h-24 mx-2">
          <button className="[&_path]:hover:stroke-primary">
            <UpvoteIcon color="black" />
          </button>

          <p>105</p>

          <button className="[&_path]:hover:stroke-primary">
            <DownvoteIcon color="black" />
          </button>
        </div>

        <div className="flex flex-col w-full ml-2">
          <div className="flex items-center">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>PJ</AvatarFallback>
            </Avatar>

            <p className="ml-2 text-sm text-gray-700">Posted by limerider 3 hours ago</p>
          </div>

          <h1 className="py-2">Honest opinions on Lime ebikes in London</h1>

          <p className="text-sm text-gray-700">
            Tell me your good and bad experiences of using Lime as a Rider in London Tell me your good and bad experiences of using Lime as a Rider in LondonTell me your good and bad experiences of using Lime as a Rider in LondonTell me your good and bad experiences of using Lime as a Rider in LondonTell me your good and bad experiences of using Lime as a Rider in London
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;