"use client";

import React, { useEffect, useState, useCallback } from "react";
import BlogList from "@/app/_components/blog/BlogList";
import { IPost } from "@/app/types/blog";
import { getPosts } from "@/_actions/postAction";

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<IPost[]>([]);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch posts
  const fetchPosts = useCallback(async () => {
    setLoading(true); // Ensure loading is true during fetch
    try {
      const { data, errMsg } = await getPosts();
      if (errMsg) {
        setErrMsg(errMsg);
        setBlogs([]); // Clear blogs if there's an error
      } else {
        setBlogs(data || []); // Safeguard against undefined data
        setErrMsg(null); // Clear any previous errors
      }
    } catch (error) {
      console.error("Unexpected error fetching posts:", error);
      setErrMsg("An unexpected error occurred while fetching posts.");
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  }, []);

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Handle delete action (if needed)
  const handleDelete = async (id: string) => {
    try {
      const baseUrl = (
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      ).replace(/\/?$/, "/");
      const response = await fetch(`${baseUrl}api/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPosts(); // Re-fetch posts after successful deletion
      } else {
        console.error("Failed to delete post");
        setErrMsg("Failed to delete post.");
      }
    } catch (error) {
      console.error("Unexpected error during deletion:", error);
      setErrMsg("An unexpected error occurred while deleting the post.");
    }
  };

  // Render loading state
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // Render error state
  if (errMsg) {
    return <h1>{errMsg}</h1>;
  }

  // Render no data state
  if (blogs.length === 0) {
    return (
      <div
        className="bg-orange-100 border border-orange-400 text-orange-400 px-4 py-3 rounded relative"
        role="alert"
      >
        <h2 className="font-semibold">اطلاعاتی برای مشاهده وجود ندارد</h2>
      </div>
    );
  }

  // Render the blog list
  return (
    <div className="flex gap-4 justify-center">
      <BlogList blogs={blogs} onDelete={handleDelete} />
    </div>
  );
};

export default BlogPage;
