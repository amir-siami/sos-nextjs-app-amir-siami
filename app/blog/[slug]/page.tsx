import React from "react";
import { getPosts } from "@/_actions/postAction";
import { IPost } from "@/app/types/blog";
import PostDetail from "@/app/_components/blog/BlogDetail";

interface PageProps {
  params: {
    id: string;
  };
}

const BlogDetailPage: React.FC<PageProps> = async ({ params }) => {
  const { id } = params;
  const { data, errMsg }: { data?: IPost[]; errMsg?: string } =
    await getPosts();

  if (!data) return <h1>No data available</h1>;
  if (errMsg) return <h1>{errMsg}</h1>;

  const getBlogData = (id: string) => {
    return data.find((blog) => blog?._id === id) || null;
  };
  const blog = getBlogData(id);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return <PostDetail blog={blog} />;
};

export default BlogDetailPage;
