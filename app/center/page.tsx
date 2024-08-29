import { getPosts } from "@/_actions/postAction";
import React from "react";
import { IPost } from "../types/blog";
import Image from "next/image";

// Define the metadata for the page
export const metadata = {
  title: "خدمات درمانی",
};

// Define the Center component
const Center: React.FC = async () => {
  const { data, errMsg }: { data?: IPost[]; errMsg?: string } =
    await getPosts();
  // console.log(posts);
  if (errMsg) return <h1>{errMsg}</h1>;

  return (
    <div>
      {data?.map((item) => (
        <>
          <h1 key={item._id}>{item.msg}</h1>
          {item.image && ( // Check if item.image exists
            <Image
              src={item.image}
              alt={item.title || "Post Image"} // Provide a meaningful alt text
              width={500} // Set a width for the image
              height={300} // Set a height for the image
              layout="responsive" // Optional: Use responsive layout
            />
          )}
        </>
      ))}
    </div>
  );
};

export default Center;
