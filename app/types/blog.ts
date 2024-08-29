// src/types/blog.ts

// export interface Blog {
//   slug: string; // Unique identifier for the blog, used in the URL
//   image: string; // URL or path to the blog's image
//   title: string; // Title of the blog post
//   description: string; // Short description or excerpt of the blog post
//   duration: string; // Estimated read time or other relevant duration
//   // Add more fields as needed, such as author, date, etc.
// }

export interface IPost {
  _id: string;
  msg: string;
  title: string; // Add other fields as necessary
  slug: string;
  image: string;
  description: string;
  duration: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
}
