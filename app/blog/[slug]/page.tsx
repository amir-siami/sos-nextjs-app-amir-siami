import React from "react";
import { getPosts } from "@/_actions/postAction";
import { IPost } from "@/app/types/blog";
import PostDetail from "@/app/_components/blog/BlogDetail";

interface PageProps {
  params: {
    slug: string;
  };
}

const BlogDetailPage: React.FC<PageProps> = async ({ params }) => {
  const { slug } = params;
  const { data, errMsg }: { data?: IPost[]; errMsg?: string } =
    await getPosts();

  if (!data) return <h1>No data available</h1>;
  if (errMsg) return <h1>{errMsg}</h1>;

  const getBlogData = (slug: string) => {
    return data.find((blog) => blog?.slug === slug) || null;
  };
  const blog = getBlogData(slug);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return <PostDetail blog={blog} />;
};

export default BlogDetailPage;
