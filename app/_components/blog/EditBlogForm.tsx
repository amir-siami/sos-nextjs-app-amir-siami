"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface BlogPostFormProps {
  id: string; // Blog post ID
  title: string;
  description: string;
  image: string;
  author: string;
  slug: string;
}

const EditBlogForm: React.FC<BlogPostFormProps> = ({
  id,
  title,
  description,
  image,
  author,
  slug,
}) => {
  const [autoSlug, setAutoSlug] = useState(slug);
  const router = useRouter();

  const initialValues = {
    id,
    title,
    description,
    image,
    author,
    slug: autoSlug,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("این فیلد نمی‌تواند خالی باشد."),
    description: Yup.string().required("این فیلد نمی‌تواند خالی باشد."),
    author: Yup.string().required("این فیلد نمی‌تواند خالی باشد."),
    slug: Yup.string().required("این فیلد نمی‌تواند خالی باشد."),
    image: Yup.string().url("Invalid URL format."),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT", // Use PUT or PATCH depending on your API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          slug: autoSlug || values.title.toLowerCase().replace(/ /g, "-"),
          image: values.image || "elephants.webp", // Default image if none provided
        }),
      });

      if (response.ok) {
        router.push("/blog"); // Navigate to /blog on success
        console.log("Post updated:", await response.json());
      } else {
        throw new Error("Failed to update post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setAutoSlug(initialValues.title.toLowerCase().replace(/ /g, "-"));
  }, [initialValues.title]);

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-md bg-white rounded shadow-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-center">ویرایش بلاگ</h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ dirty, isValid, errors, touched, values, setFieldValue }) => (
            <Form>
              <div className="p-4 space-y-4">
                {/* Title Field */}
                <div className="w-full">
                  <label htmlFor="title" className="block mb-2 font-medium">
                    عنوان
                  </label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    className={`block w-full px-3 py-2 border rounded ${
                      touched.title && errors.title
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    style={{ textAlign: "right" }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("title", e.target.value);
                      setAutoSlug(
                        e.target.value.toLowerCase().replace(/ /g, "-")
                      );
                    }}
                  />
                  {touched.title && errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                {/* Slug Field (readonly) */}
                <div className="w-full">
                  <label htmlFor="slug" className="block mb-2 font-medium">
                    Slug
                  </label>
                  <Field
                    type="text"
                    id="slug"
                    name="slug"
                    value={autoSlug}
                    readOnly
                    className="block w-full px-3 py-2 border rounded border-gray-300 bg-gray-100 text-gray-500"
                    style={{ textAlign: "right" }}
                  />
                </div>

                {/* Author Field */}
                <div className="w-full">
                  <label htmlFor="author" className="block mb-2 font-medium">
                    نویسنده
                  </label>
                  <Field
                    type="text"
                    id="author"
                    name="author"
                    className={`block w-full px-3 py-2 border rounded ${
                      touched.author && errors.author
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    style={{ textAlign: "right" }}
                  />
                  {touched.author && errors.author && (
                    <p className="mt-1 text-sm text-red-500">{errors.author}</p>
                  )}
                </div>

                {/* Description Field */}
                <div className="w-full">
                  <label
                    htmlFor="description"
                    className="block mb-2 font-medium"
                  >
                    توضیحات
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows={4}
                    className={`block w-full px-3 py-2 border rounded ${
                      touched.description && errors.description
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    style={{ textAlign: "right" }}
                  />
                  {touched.description && errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Image URL Field */}
                <div className="w-full">
                  <label htmlFor="image" className="block mb-2 font-medium">
                    آدرس عکس
                  </label>
                  <Field
                    type="text"
                    id="image"
                    name="image"
                    className={`block w-full px-3 py-2 border rounded ${
                      touched.image && errors.image
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    style={{ textAlign: "right" }}
                  />
                  {touched.image && errors.image && (
                    <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end p-4 border-t">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300"
                  disabled={!dirty || !isValid}
                >
                  ثبت تغییرات
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditBlogForm;
