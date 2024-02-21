import React from "react";
import Post from "@/components/Post";
import CreatePostInput from "@/components/CreatePostInput";

const PostList = () => {
  return (
    <section className="flex justify-center w-full">
      <div className="flex flex-col py-12">
        <CreatePostInput />

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