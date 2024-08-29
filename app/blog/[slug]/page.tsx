import React from "react";
import { blogs } from "@/app/data/blog";
import Image from "next/image";
import { Box, Container, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

interface PageProps {
  params: {
    slug: string;
  };
}

const BlogDetailPage: React.FC<PageProps> = ({ params }) => {
  const { slug } = params;

  const getBlogData = (slug: string) => {
    return blogs.find((blog) => blog.slug === slug) || null;
  };

  const blog = getBlogData(slug);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <Container>
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
      </Box>
      <Typography variant="h2" component="h1" gutterBottom>
        {blog.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {blog.duration}
      </Typography>
      <Typography variant="body1">{blog.description}</Typography>
    </Container>
  );
};

export default BlogDetailPage;
