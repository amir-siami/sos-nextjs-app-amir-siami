import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Import the clock icon

interface BlogPageProps {
  image: string;
  title: string;
  description: string;
  duration: string; // You can use a number here if you'd prefer to handle durations as a number of minutes, for example
}

const BlogPage: React.FC<BlogPageProps> = ({
  image,
  title,
  description,
  duration,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
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
  );
};

export default BlogPage;
