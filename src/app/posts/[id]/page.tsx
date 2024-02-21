import Link from "next/link";
import React from "react";
import PostDetail from "@/components/PostDetail";
import Comment from "@/components/Comment";
import BackIcon from "@/components/icons/BackIcon";
import SidebarWrapper from "@/providers/SidebarWrapper";

export default function PostPage() {
  return (
    <SidebarWrapper>
      <div className="flex flex-col items-center">
        <div className="w-full px-2 py-6">
          <Link href={"/"} className="flex items-center hover:text-primary [&_path]:hover:stroke-primary">
            <BackIcon color="black" />
            <p className="ml-4">Back to posts</p>
          </Link>
        </div>

        <PostDetail />

        <h1 className="w-full px-2 mt-8">All comments</h1>
        <Comment />
      </div>
    </SidebarWrapper>
  );
}