import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AutosizeTextarea } from "./ui/autosize-textarea";

const ReplyInput = () => {
  return (
    <div className="my-4 flex w-full rounded-xl border border-[#E5E7EB] p-4 pb-3 shadow-md shadow-gray-100">
      <div className="mr-4 flex items-start justify-start">
        <Avatar className="w-6 h-6">
          <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-grow flex-col">
        <AutosizeTextarea
          placeholder="Comment your thoughts"
          className="min-h-[55px] resize-none rounded-none border-0 border-b border-gray-300 p-0 text-sm focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
        />

        <div className="flex w-full justify-end ">
          <Button className="mt-2 rounded-lg px-4 py-2 text-sm text-white">
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReplyInput;
