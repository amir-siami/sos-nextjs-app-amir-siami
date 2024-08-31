import * as React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";

interface BlogCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  duration: string;
  slug: string;
  onDelete: (id: string) => Promise<void>; // Add onDelete prop
}

const baseUrl = (
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
).replace(/\/?$/, "/");

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  image,
  title,
  description,
  duration,
  slug,
  onDelete, // Destructure onDelete prop
}) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null); // Reset error state before attempting to delete
    try {
      await onDelete(id); // Call the onDelete function passed as a prop
      console.log("Blog deleted successfully");
    } catch (error) {
      setError("Error deleting blog: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        padding: "1rem",
        boxShadow: "none",
      }}
      className="rounded-lg border border-blue-500"
    >
      <CardMedia
        sx={{
          borderRadius: "8px",
          marginBottom: ".5rem",
          minHeight: "200px",
          maxHeight: "200px",
          objectFit: "cover",
        }}
        component="img"
        image={image}
        alt={title}
      />
      <CardContent sx={{ padding: "0" }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography
          sx={{ display: "flex", alignItems: "center", fontSize: 16 }}
        >
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
          {duration}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        {error && <Typography color="error">{error}</Typography>}{" "}
        {/* Display error message */}
      </CardContent>
      <Typography className="text-left mt-3 flex gap-1 justify-end">
        <Link
          href={`${baseUrl}blog/${id}`}
          passHref
          className="inline-block px-8 py-1 border border-blue-300 bg-transparent text-black rounded hover:bg-blue-600 hover:text-white"
        >
          ادامه
        </Link>
        <Link href={`${baseUrl}blog/editBlog/${id}`}>
          <button className="inline-block px-4 py-1 border border-amber-300 bg-amber-500 text-white rounded hover:bg-amber-200 hover:text-black">
            ویرایش
          </button>
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="inline-block px-4 py-1 border border-amber-300 bg-amber-500 text-white rounded hover:bg-amber-200 hover:text-black"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Deleting..." : "حذف"} {/* Show loading text */}
        </button>
      </Typography>
    </Card>
  );
};

export default BlogCard;
