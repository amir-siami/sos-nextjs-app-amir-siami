import React from "react";
// import { blogs } from "@/app/data/blog";
import Image from "next/image";
import { Box, Container, Typography } from "@mui/material";
import { getPosts } from "@/_actions/postAction";
import { IPost } from "@/app/types/blog";

interface PageProps {
  params: {
    slug: string;
  };
}

const BlogDetailPage: React.FC<PageProps> = async ({ params }) => {
  const { slug } = params;

  const { data, errMsg }: { data?: IPost[]; errMsg?: string } =
    await getPosts();

  if (!data) return <h1>No data available</h1>; // Add this line
  if (errMsg) return <h1>{errMsg}</h1>;

  const getBlogData = (slug: string) => {
    return data.find((blog) => blog.slug === slug) || null;
  };

  const blog = getBlogData(slug);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <Box
      sx={{
        width: 400,
        height: 225,
        borderRadius: 1,
      }}
    >
      <Image
        src={blog.image}
        alt={blog.title}
        width={400}
        height={225}
        layout="responsive"
      />
      <Typography variant="h2" component="h1" gutterBottom>
        {blog.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {blog.duration}
      </Typography>
      <Typography variant="body1">{blog.description}</Typography>
    </Box>
  );
};

export default BlogDetailPage;
