import * as React from "react";
import BlogList from "@/app/_components/blog/BlogList";
import { blogs } from "@/app/data/blog";

export const metadata = {
  title: "بلاگ",
};

const BlogPage: React.FC = () => {
  return (
    <div className="flex gap-4 justify-between">
      <BlogList blogs={blogs} />
    </div>
  );
};

export default BlogPage;
