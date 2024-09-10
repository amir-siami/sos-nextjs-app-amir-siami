"use client";

import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { IPost } from "@/app/types/blog";

interface PostDetailProps {
  blog: IPost;
}

interface LoaderProps {
  src: string;
  width: number;
  quality?: number;
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
        overflow: "hidden",
      }}
    >
      <div style={{ width: "100%", position: "relative", marginBottom: "8px" }}>
        <Image
          loader={myLoader}
          src={blog.image}
          alt={blog.title}
          width={800}
          height={533}
          layout="responsive" // This maintains the aspect ratio
          style={{
            borderRadius: "8px",
            objectFit: "cover",
            width: "100%",
            maxHeight: "533",
          }}
        />
      </div>

      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          fontSize: "2.5rem", // Increase font size
          fontWeight: "bold", // Make it bold
          color: "#d1801d", // Change color to a darker shade
          textTransform: "uppercase", // Make the text uppercase
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)", // Add subtle text shadow
        }}
      >
        {blog.title}
      </Typography>

      <Typography sx={{ display: "flex", alignItems: "center", fontSize: 16 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        {blog.duration} {blog.duration && "دقیقه"}
      </Typography>
      <Typography variant="body1">{blog.description}</Typography>
    </Box>
  );
};

export default PostDetail;
