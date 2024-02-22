"use client";

import React from "react";
import UpvoteIcon from "@/components/icons/UpvoteIcon";
import DownvoteIcon from "@/components/icons/DownvoteIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReplyIcon from "@/components/icons/ReplyIcon";
import ReplyInput from "@/components/ReplyInput";
import { PostType } from "@/lib/interface";
import { calculateAgeOfPost } from "@/lib/utils";
import { api } from "@/trpc/react";

const Comment = (props: PostType) => {
  const mutation = api.post.update.useMutation();

  const [isCommentOpen, setIsCommentOpen] = React.useState(true);
  const [postDetail, setPostDetail] = React.useState(props);
  const { data: user }: any = api.user.get.useQuery({ id: postDetail.authorId });
  const [localVotes, setLocalVotes] = React.useState(props.votes);

  const toggleCommentOpen = () => setIsCommentOpen(!isCommentOpen);

  const upvoteComment = () => {
    mutation.mutate({
      ...props,
      votes: localVotes + 1
    });
    setLocalVotes(localVotes + 1);
  };

  const downvoteComment = () => {
    mutation.mutate({
      ...props,
      votes: localVotes - 1
    });
    setLocalVotes(localVotes - 1);
  };

  React.useEffect(() => {
    toggleCommentOpen();
  }, [postDetail]);

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
              Posted by {user?.name} {calculateAgeOfPost(postDetail.createdAt)}
            </p>
          </div>

          <p className="my-3 text-sm">{postDetail.content}</p>
        </div>
      </div>

      <div className="flex items-center px-2">
        <button className="[&_path]:hover:stroke-primary" onClick={upvoteComment}>
          <UpvoteIcon color="black" />
        </button>

        <p className="px-2">{localVotes}</p>

        <button className="[&_path]:hover:stroke-primary" onClick={downvoteComment}>
          <DownvoteIcon color="black" />
        </button>

        <button onClick={toggleCommentOpen} className={`flex items-center ml-6 [&_path]:hover:stroke-primary hover:text-primary ${isCommentOpen && "text-primary [&_path]:stroke-primary"}`}>
          <ReplyIcon color="black" />
          <p className="ml-2">Reply</p>
        </button>
      </div>

      {isCommentOpen && <ReplyInput post={postDetail} setter={setPostDetail} />}

      {
        postDetail.children && postDetail.children.length > 0 && postDetail.children.map((comment: any) => (
          <div key={comment.id} className="pl-12">
            <Comment {...comment} />
          </div>
        ))
      }
    </div>
  );
};

export default Comment;
