"use client";

import * as React from "react";
import BlogCard from "@/app/_components/blog/BlogCard";
import { IPost } from "@/app/types/blog";
// import { Blog } from "@/app/types/blog"; // Assuming you have a Blog type defined

interface BlogListProps {
  blogs?: IPost[]; // Optional array of IPost
}

// BlogList component definition
const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  if (!blogs || blogs.length === 0) {
    return <h2>No blogs available</h2>;
  }
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
