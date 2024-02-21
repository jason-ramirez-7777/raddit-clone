"use client";

import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import PostDetail from "@/components/PostDetail";
import Comment from "@/components/Comment";
import ReplyInput from "@/components/ReplyInput";
import BackIcon from "@/components/icons/BackIcon";
import SidebarWrapper from "@/providers/SidebarWrapper";
import { CommentProps, PostProps, QueryProps } from "@/lib/interface";
import { posts } from "@/lib/mockdata";

export default function PostPage(props: QueryProps) {
  const { id } = props.params;
  const post = posts.find((p: PostProps) => p.id === Number(id));

  return post ? (
    <SidebarWrapper>
      <div className="flex flex-col items-end w-[600px]">
        <div className="w-full px-2 py-6">
          <Link href={"/"} className="flex items-center hover:text-primary [&_path]:hover:stroke-primary">
            <BackIcon color="black" />
            <p className="ml-4">Back to posts</p>
          </Link>
        </div>

        <PostDetail {...post} />
        <ReplyInput />

        <h1 className="w-full px-2 mt-8 mb-4">All comments</h1>
        <Separator className="w-full h-[1px] bg-gray-200" />

        {
          post.children && post.children.map((comment: CommentProps) => (
            <Comment key={comment.id} {...comment} />
          ))
        }
      </div>
    </SidebarWrapper>
  ) : (
    <React.Fragment></React.Fragment>
  );
}