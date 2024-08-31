"use client";
import React, { useEffect, useState } from "react";
import EditBlogForm from "@/app/_components/blog/EditBlogForm";
import { IPost } from "@/app/types/blog";

interface PageProps {
  params: {
    id: string;
  };
}

const getBlogById = async (
  id: string
): Promise<{ blog: IPost } | undefined> => {
  try {
    const baseUrl = (
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    ).replace(/\/?$/, "/");
    const res = await fetch(`${baseUrl}api/posts/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch blog");
    }

    const data = await res.json();
    console.log("Fetched blog data:", data); // Debugging statement

    return { blog: data };
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const EditBlog: React.FC<PageProps> = ({ params }) => {
  const { id } = params;
  const [blog, setBlog] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const fetchedBlog = await getBlogById(id);
      if (!fetchedBlog) {
        setError("Failed to load blog data");
      } else {
        setBlog(fetchedBlog.blog);
      }
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!blog) {
    return <h1>Blog not found</h1>;
  }

  const { _id, title, description, image, author, slug } = blog;

  return (
    <div className="flex justify-center p-6">
      <EditBlogForm
        id={_id}
        title={title}
        description={description}
        image={image}
        author={author}
        slug={slug}
      />
    </div>
  );
};

export default EditBlog;
