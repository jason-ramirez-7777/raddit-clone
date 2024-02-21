import React from "react";
import Post from "@/components/Post";

const PostList = () => {
  return (
    <section className="flex justify-center w-full">
      <div className="flex flex-col py-12">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </section>
  );
};

export default PostList;