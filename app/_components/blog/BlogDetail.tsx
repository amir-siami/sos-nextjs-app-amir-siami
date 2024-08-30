"use client";

import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { IPost } from "@/app/types/blog";
import Link from "next/link";

interface PostDetailProps {
  blog: IPost;
}

interface LoaderProps {
  src: string; // The source URL of the image
  width: number; // The desired width of the image
  quality?: number; // Optional quality of the image (usually between 0-100)
}

const PostDetail: React.FC<PostDetailProps> = ({ blog }) => {
  const myLoader = ({ src, width, quality }: LoaderProps) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        margin: "0 auto",
        padding: 2,
        borderRadius: 1,
        boxShadow: 2,
      }}
    >
      <Image
        loader={myLoader}
        src={blog.image}
        alt={blog.title}
        width={800}
        height={450}
        layout="responsive"
        style={{ borderRadius: "8px" }}
      />
      <Typography variant="h2" component="h1" gutterBottom sx={{ mt: 2 }}>
        {blog.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {blog.duration}
      </Typography>
      <Typography variant="body1" paragraph>
        {blog.description}
      </Typography>
    </Box>
  );
};

export default PostDetail;
