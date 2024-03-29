"use client";

import React from "react";
import UpvoteIcon from "@/components/icons/UpvoteIcon";
import DownvoteIcon from "@/components/icons/DownvoteIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReplyIcon from "@/components/icons/ReplyIcon";
import ReplyInput from "@/components/ReplyInput";
import { PostProps } from "@/lib/interface";
import { calculateAgeOfPost, checkVoteStatus, devotePost, votePost } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useClerk } from "@clerk/nextjs";

// Functional component Comment which takes PostType props
const Comment = (props: PostProps) => {
  const mutation = api.post.votePost.useMutation(); // Mutation for voting on a post

  // State variables
  const [isCommentOpen, setIsCommentOpen] = React.useState(true); // Tracking if the comment is open or closed
  const [postDetail, setPostDetail] = React.useState(props); // Holding post details
  const { data: poster }: any = api.user.get.useQuery({ id: postDetail.authorId }); // Fetching user data for the author of the post
  const { user } = useClerk(); // Using Clerk hook to get the current user
  const [localVotes, setLocalVotes] = React.useState(props.votes); // Local storing the number of votes
  const [localVoteUsers, setLocalVoteUsers] = React.useState(props.voteUsers || []); // Local storing users who voted on the post

  // Function to toggle comment open/close state
  const toggleCommentOpen = () => setIsCommentOpen(!isCommentOpen);

  // Effect to toggle comment open/close when postDetail changes
  React.useEffect(() => {
    toggleCommentOpen();
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

            <p className="ml-2 text-sm text-gray-700"> {/* Author name and post age */}
              Posted by {poster?.name} {calculateAgeOfPost(postDetail.createdAt)}
            </p>
          </div>

          <p className="my-3 text-sm">{postDetail.content}</p> {/* Post content */}
        </div>
      </div>

      <div className="flex items-center px-2"> {/* Flex container for voting and reply */}
        <button className="[&_path]:hover:stroke-primary" onClick={() => votePost(mutation, postDetail.id, user!.id, localVotes, localVoteUsers, setLocalVotes, setLocalVoteUsers)}>
          <UpvoteIcon color={checkVoteStatus(user!.id, localVoteUsers) === 1 ? "#4F46E5" : "black"} />
        </button>

        <p className="px-2">{localVotes}</p> {/* Display number of votes */}

        <button className="[&_path]:hover:stroke-primary" onClick={() => devotePost(mutation, postDetail.id, user!.id, localVotes, localVoteUsers, setLocalVotes, setLocalVoteUsers)}>
          <DownvoteIcon color={checkVoteStatus(user!.id, localVoteUsers) === -1 ? "#4F46E5" : "black"} />
        </button>

        <button onClick={toggleCommentOpen} className={`flex items-center ml-6 [&_path]:hover:stroke-primary hover:text-primary ${isCommentOpen && "text-primary [&_path]:stroke-primary"}`}>
          <ReplyIcon color="black" />
          <p className="ml-2">Reply</p>
        </button>
      </div>

      {isCommentOpen && <ReplyInput post={postDetail} setter={setPostDetail} />} {/* Display reply input if comment is open */}

      {
        postDetail.children && postDetail.children.length > 0 && postDetail.children.map((comment: any) => (
          <div key={comment.id} className="pl-12">
            <Comment {...comment} /> {/* Render nested comment recursively */}
          </div>
        ))
      }
    </div>
  );
};

export default Comment; // Export Comment component
