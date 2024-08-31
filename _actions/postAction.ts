"use server";

import PostModel from "@/models/Post";
import connectDB from "@/config/connectToDb";
import { IPost } from "@/app/types/blog";

// Define the return type for the getPosts function
interface IGetPostsResponse {
  data?: IPost[]; // Include posts in the response
  errMsg?: string;
}

interface IGetPostResponse {
  data?: IPost; // Return a single post
  errMsg?: string;
}

export async function getPosts(): Promise<IGetPostsResponse> {
  try {
    await connectDB();
    const data: IPost[] = JSON.parse(JSON.stringify(await PostModel.find()));
    console.log("data from getPosts:", data); // Debugging statement

    return { data }; // Return the posts in the response
  } catch (error) {
    console.error("Error in getPosts:", error); // Additional logging for debugging
    return { errMsg: (error as Error).message }; // Type assertion for error
  }
}

export async function getPost(id: string): Promise<IGetPostResponse> {
  try {
    await connectDB();

    const data: IPost | null = JSON.parse(
      JSON.stringify(
        await PostModel.findOne({ id }) // Find a single post by slug
      )
    );

    if (!data) {
      return { errMsg: "Post not found" }; // Handle case where no post is found
    }

    return { data }; // Return the post
  } catch (error) {
    return { errMsg: (error as Error).message }; // Return the error message
  }
}
