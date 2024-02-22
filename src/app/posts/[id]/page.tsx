"use client";

import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import PostDetail from "@/components/PostDetail";
import Comment from "@/components/Comment";
import ReplyInput from "@/components/ReplyInput";
import BackIcon from "@/components/icons/BackIcon";
import SidebarWrapper from "@/providers/SidebarWrapper";
import { PostType, QueryProps } from "@/lib/interface";
import { api } from "@/trpc/react";

export default function PostPage(props: QueryProps) {
  const { id } = props.params;
  const { data: post }: any = api.post.get.useQuery({ id: Number(id) });

  const [postDetail, setPostDetail] = React.useState<PostType | undefined>(undefined);

  React.useEffect(() => {
    setPostDetail(post);
  }, [post]);

  return postDetail !== undefined ? (
    <SidebarWrapper>
      <div className="flex flex-col items-end w-[600px]">
        <div className="w-full px-2 py-6">
          <Link href={"/"} className="flex items-center hover:text-primary [&_path]:hover:stroke-primary">
            <BackIcon color="black" />
            <p className="ml-4">Back to posts</p>
          </Link>
        </div>

        <PostDetail {...postDetail} />
        <ReplyInput post={postDetail} setter={setPostDetail} />

        <h1 className="w-full px-2 mt-8 mb-4">All comments</h1>
        <Separator className="w-full h-[1px] bg-gray-200" />

        {
          postDetail.children && postDetail.children.length > 0 ? postDetail.children.map((comment: any) => (
            <Comment key={comment.id} {...comment} />
          )) : (
            <p className="w-full p-2 text-gray-400">No comments for this post</p>
          )
        }
      </div>
    </SidebarWrapper>
  ) : (
    <React.Fragment></React.Fragment>
  );
}