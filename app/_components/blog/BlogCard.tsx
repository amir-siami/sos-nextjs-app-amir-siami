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
    <Link href={`/blog/${slug}`} passHref>
      <Card sx={{ maxWidth: 345, cursor: "pointer" }}>
        <CardMedia component="img" height="140" image={image} alt={title} />
        <CardContent>
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
      </Card>
    </Link>
  );
};

export default BlogCard;
