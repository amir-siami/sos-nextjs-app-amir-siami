"use server";

import PostModel from "@/models/models";
import connectDB from "@/config/connectToDb";
import { IPost } from "@/app/types/blog";

// Define the return type for the getPosts function
interface IGetPostsResponse {
  data?: IPost[]; // Include posts in the response
  errMsg?: string;
}

export async function getPosts(): Promise<IGetPostsResponse> {
  try {
    await connectDB();
    const data: IPost[] = JSON.parse(JSON.stringify(await PostModel.find()));

    return { data }; // Return the posts in the response
  } catch (error) {
    return { errMsg: (error as Error).message }; // Type assertion for error
  }
}
