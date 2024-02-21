import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const CreatePostInput = () => {
  return (
    <div className="my-4 flex w-full rounded-xl border border-[#E5E7EB] p-4 pb-3 shadow-md shadow-gray-100">
      <div className="mr-4 flex items-start justify-start">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="Avatar"
            width={24}
            height={24}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-grow flex-col">
        <Textarea
          placeholder={
            "Title of your post\nShare your thoughts with the world!"
          }
          className="resize-none rounded-none border-0 border-b border-gray-300 p-0 text-base focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <div className="flex w-full justify-end ">
          <Button className="mt-2 rounded-lg px-4 py-2 text-sm text-white">
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostInput;
