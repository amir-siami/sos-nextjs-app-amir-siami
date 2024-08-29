import * as React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Import the clock icon

interface BlogCardProps {
  image: string;
  title: string;
  description: string;
  duration: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  title,
  description,
  duration,
  slug,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        cursor: "pointer",
        padding: "1rem",
        boxShadow: "none",
      }}
      className="border-2 rounded-lg border-blue-500"
    >
      <CardMedia
        sx={{ borderRadius: "8px", marginBottom: ".5rem" }}
        component="img"
        height="140"
        image={image}
        alt={title}
      />
      <CardContent sx={{ padding: "0" }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          display="flex"
          alignItems="center"
          mt={1}
        >
          <AccessTimeIcon sx={{ fontSize: 16, ml: 0.5 }} />
          {duration}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Typography className="text-left mt-3">
        <Link
          href={`/blog/${slug}`}
          passHref
          className="inline-block px-8 py-1 bg-transparent border border-blue-500 text-black rounded hover:bg-blue-600 hover:text-white"
        >
          ادامه
        </Link>
      </Typography>
    </Card>
  );
};

export default BlogCard;
