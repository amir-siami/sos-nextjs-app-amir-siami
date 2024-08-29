import * as React from "react";

import BlogCard from "@/app/_components/blog/BlogCard";

export const metadata = {
  title: "بلاگ",
};

const BlogList = () => {
  const blogs = [
    {
      image: "/arctic-fox.webp",
      title: "راهنمای دریافت معرفی نامه",
      description:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و...",
      duration: "5 دقیقه",
    },
    {
      image: "/arctic-fox.webp",
      title: "راهنمای دریافت معرفی نامه",
      description:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و...",
      duration: "5 دقیقه",
    },
    {
      image: "/arctic-fox.webp",
      title: "راهنمای دریافت معرفی نامه",
      description:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و...",
      duration: "5 دقیقه",
    },
    {
      image: "/arctic-fox.webp",
      title: "راهنمای دریافت معرفی نامه",
      description:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و...",
      duration: "5 دقیقه",
    },
    // ...other blogs
  ];

  return (
    <div className="flex gap-4 justify-between">
      {blogs.map((blog, index) => (
        <BlogCard
          key={index}
          image={blog.image}
          title={blog.title}
          description={blog.description}
          duration={blog.duration}
        />
      ))}
    </div>
  );
};

export default BlogList;
