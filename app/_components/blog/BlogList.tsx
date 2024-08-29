"use client";

import * as React from "react";
import BlogCard from "@/app/_components/blog/BlogCard";
import { Blog } from "@/app/types/blog"; // Assuming you have a Blog type defined

interface BlogListProps {
  blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  return (
    <div className="flex gap-4 justify-between">
      {blogs.map((blog, index) => (
        <BlogCard
          key={index}
          image={blog.image}
          title={blog.title}
          description={blog.description}
          duration={blog.duration}
          slug={blog.slug}
        />
      ))}
    </div>
  );
};

export default BlogList;
