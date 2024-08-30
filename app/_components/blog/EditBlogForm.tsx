"use client";

import React, { useState } from "react";

interface EditBlogFormProps {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  slug: string;
}

const EditBlogForm: React.FC<EditBlogFormProps> = ({
  id,
  title,
  description,
  image,
  author,
  slug,
}) => {
  const [formData, setFormData] = useState({
    title,
    description,
    image,
    author,
    slug,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    try {
      const response = await fetch(`${baseUrl}/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      const updatedBlog = await response.json();
      console.log("Blog updated successfully:", updatedBlog);
      // Optionally, redirect to the blog page or show a success message
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Title"
        className="border p-2"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Description"
        className="border p-2"
      />
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleInputChange}
        placeholder="Image URL"
        className="border p-2"
      />
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleInputChange}
        placeholder="Author"
        className="border p-2"
      />
      <input
        type="text"
        name="slug"
        value={formData.slug}
        onChange={handleInputChange}
        placeholder="Slug"
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Update Blog
      </button>
    </form>
  );
};

export default EditBlogForm;
