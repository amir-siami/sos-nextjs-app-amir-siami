import * as React from "react";
import BlogCard from "@/app/_components/blog/BlogCard";
import { IPost } from "@/app/types/blog";

interface BlogListProps {
  blogs?: IPost[];
  onDelete: (id: string) => Promise<void>; // Add onDelete prop
}

const BlogList: React.FC<BlogListProps> = ({ blogs, onDelete }) => {
  // Check if blogs is undefined or an empty array
  if (!blogs || blogs.length === 0) {
    return (
      <div
        className="bg-orange-100 border border-orange-400 text-orange-400 px-4 py-3 rounded relative"
        role="alert"
      >
        <h2 className="font-semibold">اطلاعاتی برای مشاهده وجود ندارد</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          id={blog._id}
          image={blog.image}
          title={blog.title}
          description={blog.description}
          duration={blog.duration}
          slug={blog.slug}
          onDelete={onDelete} // Pass onDelete to BlogCard
        />
      ))}
    </div>
  );
};

export default BlogList;
