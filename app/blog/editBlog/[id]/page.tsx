import React from "react";
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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/posts/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch blog");
    }

    const data = await res.json();
    console.log("Fetched blog data:", data); // Add this line for debugging

    return { blog: data };
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const EditBlog: React.FC<PageProps> = async ({ params }) => {
  const { id } = params;

  const blogData = await getBlogById(id);
  if (!blogData || !blogData.blog) {
    return <h1>Failed to load blog data</h1>;
  }

  const { _id, title, description, image, author, slug } = blogData.blog;

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
