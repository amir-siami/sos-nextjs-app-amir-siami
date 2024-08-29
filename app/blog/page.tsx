import * as React from "react";
import BlogList from "@/app/_components/blog/BlogList";
import { IPost } from "../types/blog";
import { getPosts } from "@/_actions/postAction";
// import { blogs } from "@/app/data/blog";

export const metadata = {
  title: "بلاگ",
};

const BlogPage: React.FC = async () => {
  const { data, errMsg }: { data?: IPost[]; errMsg?: string } =
    await getPosts();

  if (errMsg) return <h1>{errMsg}</h1>;
  return (
    <div className="flex gap-4 justify-between">
      <BlogList blogs={data} />
    </div>
  );
};

export default BlogPage;
