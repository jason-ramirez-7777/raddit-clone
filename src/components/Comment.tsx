"use client";

import React from "react";
import UpvoteIcon from "@/components/icons/UpvoteIcon";
import DownvoteIcon from "@/components/icons/DownvoteIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReplyIcon from "@/components/icons/ReplyIcon";
import ReplyInput from "@/components/ReplyInput";
import { PostType } from "@/lib/interface";
import { calculateAgeOfPost, checkVoteStatus, unvotePost, votePost } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useClerk } from "@clerk/nextjs";

const Comment = (props: PostType) => {
  const mutation = api.post.votePost.useMutation();

  const [isCommentOpen, setIsCommentOpen] = React.useState(true);
  const [postDetail, setPostDetail] = React.useState(props);
  const { data: poster }: any = api.user.get.useQuery({ id: postDetail.authorId });
  const { user } = useClerk();
  const [localVotes, setLocalVotes] = React.useState(props.votes);
  const [localVoteUsers, setLocalVoteUsers] = React.useState(props.voteUsers || []);

  const toggleCommentOpen = () => setIsCommentOpen(!isCommentOpen);

  React.useEffect(() => {
    toggleCommentOpen();
    console.log(postDetail);
  }, [postDetail]);

  return (
    <div className="w-full my-6">
      <div className="flex w-full">
        <div className="flex flex-col w-full ml-2">
          <div className="flex items-center">
            <Avatar className="w-6 h-6">
              <AvatarImage src={poster?.avatar} alt="shadcn" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>

            <p className="ml-2 text-sm text-gray-700">
              Posted by {poster?.name} {calculateAgeOfPost(postDetail.createdAt)}
            </p>
          </div>

          <p className="my-3 text-sm">{postDetail.content}</p>
        </div>
      </div>

      <div className="flex items-center px-2">
        <button className="[&_path]:hover:stroke-primary" onClick={() => votePost(mutation, postDetail.id, user!.id, localVotes, localVoteUsers, setLocalVotes, setLocalVoteUsers)}>
          <UpvoteIcon color={checkVoteStatus(user!.id, localVoteUsers) === 1 ? "#4F46E5" : "black"} />
        </button>

        <p className="px-2">{localVotes}</p>

        <button className="[&_path]:hover:stroke-primary" onClick={() => unvotePost(mutation, postDetail.id, user!.id, localVotes, localVoteUsers, setLocalVotes, setLocalVoteUsers)}>
          <DownvoteIcon color={checkVoteStatus(user!.id, localVoteUsers) === 1 ? "#4F46E5" : "black"} />
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
