"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const defaultImage =
  "https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=600?w=1920&q=75"; // Ensure the default image path is correct

// Initial values for the form
const initialValues = {
  title: "",
  description: "",
  image: "",
  author: "",
  slug: "",
  duration: "",
};

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("این فیلد نمی‌تواند خالی باشد."),
  description: Yup.string()
    .required("این فیلد نمی‌تواند خالی باشد.")
    .max(255, "توضیحات نمی‌تواند بیش از ۲۵۵ کاراکتر باشد."),
  author: Yup.string().required("این فیلد نمی‌تواند خالی باشد."),
  duration: Yup.string().required("این فیلد نمی‌تواند خالی باشد."),
  image: Yup.string().url("Invalid URL format."),
});

const BlogPostForm: React.FC = () => {
  const router = useRouter();
  const [slug, setSlug] = useState("");

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const baseUrl = (
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      ).replace(/\/?$/, "/");

      const response = await fetch(`${baseUrl}api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          slug: slug || values.title.toLowerCase().replace(/ /g, "-"), // Auto-generate slug if not provided
          image: values.image || defaultImage,
        }),
      });

      if (response.ok) {
        router.push("/blog");
        console.log("Post created:", await response.json());
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Set the slug whenever the title changes
    setSlug(initialValues.title.toLowerCase().replace(/ /g, "-"));
  }, []);

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-md bg-white rounded shadow-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-center">ایجاد بلاگ جدید</h2>
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
                      setSlug(e.target.value.toLowerCase().replace(/ /g, "-"));
                    }}
                  />
                  {touched.title && errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                {/* Slug Field (hidden or readonly) */}
                <div className="w-full hidden">
                  <label htmlFor="slug" className="block mb-2 font-medium">
                    Slug
                  </label>
                  <Field
                    type="text"
                    id="slug"
                    name="slug"
                    value={slug}
                    readOnly // Prevent direct editing
                    className={`block w-full px-3 py-2 border rounded border-gray-300 bg-gray-100 text-gray-500`}
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

                {/* Author Field */}
                <div className="w-full">
                  <label htmlFor="duration" className="block mb-2 font-medium">
                    مدت زمان مطالعه
                  </label>
                  <Field
                    type="text"
                    id="duration"
                    name="duration"
                    className={`block w-full px-3 py-2 border rounded ${
                      touched.duration && errors.duration
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    style={{ textAlign: "right" }}
                  />
                  {touched.duration && errors.duration && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.duration}
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
                  ثبت
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BlogPostForm;
