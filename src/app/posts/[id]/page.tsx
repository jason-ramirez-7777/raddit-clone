"use client"; // Client component

import React from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import BackIcon from "@/components/icons/BackIcon";
import PostDetail from "@/components/PostDetail";
import ReplyInput from "@/components/ReplyInput";
import Comment from "@/components/Comment";
import { PostProps } from "@/lib/interface";
import SidebarWrapper from "@/providers/SidebarWrapper";
import { api } from "@/trpc/react";

interface PostPageProps {
  params: {
    id: string | number;
  }
}

export default function PostPage(props: PostPageProps) {
  const { id } = props.params; // Destructure id from url
  const { data: post }: any = api.post.get.useQuery({ id: Number(id) }); // Fetch post data using tRPC API
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true); // Initialize loading state
  const [postDetail, setPostDetail] = React.useState<PostProps | undefined>(undefined); // Initialize postDetail state

  React.useEffect(() => {
    // Effect to update postDetail and isLoading states when post data changes
    setPostDetail(post);
    post && setIsLoading(false); // Set loading to false when post data is available
  }, [post]);

  return (
    <SidebarWrapper>
      {isLoading ? ( // Display loader if loading
        <div className="flex justify-center w-full p-12">
          <Loader size={48} className="text-dark animate-spin duration-1000" />
        </div>
      ) : !postDetail || post?.error ? ( // Display "Post Not Found" if no post or error
        <h1 className="p-12 text-2xl">Post Not Found</h1>
      ) : (
        <div className="flex flex-col items-end w-full px-4 md:px-0 md:w-[600px]">
          <div className="w-full px-2 py-6">
            <div onClick={() => router.back()} className="flex items-center cursor-pointer hover:text-primary [&_path]:hover:stroke-primary">
              <BackIcon color="black" />
              <p className="ml-4">Back to posts</p>
            </div>
          </div>

          <PostDetail {...postDetail} /> {/* PostDetail component */}
          <ReplyInput post={postDetail} setter={setPostDetail} /> {/* ReplyInput component */}

          <h1 className="w-full px-2 mt-8 mb-4">All comments</h1>
          <Separator className="w-full h-[1px] bg-gray-200" /> {/* Shadcn/ui Separator */}

          <div className="w-full pb-16">
            {postDetail && postDetail.children && postDetail.children.length > 0 ? ( // Display comments if there are any
              postDetail.children.map((comment: any) => (
                <Comment key={comment.id} {...comment} />
              ))
            ) : (
              <p className="w-full p-2 text-gray-400">No comments for this post</p> // Display "No comments" message if no comments
            )}
          </div>
        </div>
      )}
    </SidebarWrapper>
  );
}
