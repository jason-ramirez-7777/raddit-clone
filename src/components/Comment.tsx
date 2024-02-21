"use client";

import React from "react";
import UpvoteIcon from "@/components/icons/UpvoteIcon";
import DownvoteIcon from "@/components/icons/DownvoteIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReplyIcon from "@/components/icons/ReplyIcon";
import ReplyInput from "@/components/ReplyInput";
import { CommentProps, User } from "@/lib/interface";
import { users } from "@/lib/mockdata";
import { calculateAgeOfPost } from "@/lib/utils";

const Comment = (props: CommentProps) => {
  const { content, votes, authorId, date, children } = props;
  const user = users.find((user: User) => user.id === authorId);
  const [isCommentOpen, setIsCommentOpen] = React.useState(false);

  const toggleCommentOpen = () => setIsCommentOpen(!isCommentOpen);
  const upvoteComment = () => { };
  const downvoteComment = () => { };
  const postComment = () => { };

  return (
    <div className="w-full my-6">
      <div className="flex w-full">
        <div className="flex flex-col w-full ml-2">
          <div className="flex items-center">
            <Avatar className="w-6 h-6">
              <AvatarImage src={user?.avatar} alt="shadcn" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>

            <p className="ml-2 text-sm text-gray-700">
              Posted by {user?.name} {calculateAgeOfPost(date)}
            </p>
          </div>

          <p className="my-3 text-sm">{content}</p>
        </div>
      </div>

      <div className="flex items-center px-2">
        <button className="[&_path]:hover:stroke-primary" onClick={upvoteComment}>
          <UpvoteIcon color="black" />
        </button>

        <p className="px-2">{votes}</p>

        <button className="[&_path]:hover:stroke-primary" onClick={downvoteComment}>
          <DownvoteIcon color="black" />
        </button>

        <button onClick={toggleCommentOpen} className={`flex items-center ml-6 [&_path]:hover:stroke-primary hover:text-primary ${isCommentOpen && "text-primary [&_path]:stroke-primary"}`}>
          <ReplyIcon color="black" />
          <p className="ml-2">Reply</p>
        </button>
      </div>

      {isCommentOpen && <ReplyInput />}

      {
        children.length > 0 && children.map((comment: CommentProps) => (
          <div key={comment.id} className="pl-12">
            <Comment {...comment} />
          </div>
        ))
      }
    </div>
  );
};

export default Comment;
