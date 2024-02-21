import React from "react";
import CreatePostInput from "@/components/CreatePostInput";
import Post from "@/components/Post";
import { posts } from "@/lib/mockdata";
import { PostProps } from "@/lib/interface";

const PostList = () => {
  return (
    <section className="flex justify-center w-full">
      <div className="flex flex-col py-12">
        <CreatePostInput />

        {
          posts.map((post: PostProps) => (
            <Post key={post.id} {...post} />
          ))
        }
      </div>
    </section>
  );
};

export default PostList;