import { NextResponse } from "next/server";
import connectToDb from "@/config/connectToDb";
import PostModel from "@/models/Post";
import { IPost } from "@/app/types/blog";
import { getPost } from "@/_actions/postAction";

interface IGetPostsResponse {
  data?: IPost[]; // Include posts in the response
  errMsg?: string;
}

// Handle POST request
export async function POST(request: Request) {
  try {
    await connectToDb();
    const { title, description, image, author, slug } = await request.json();

    const newPost = new PostModel({ title, description, image, author, slug });
    await newPost.save();

    return NextResponse.json(
      { message: "Post created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function deletePost(slug: string): Promise<IGetPostsResponse> {
  try {
    await connectToDb();
    await PostModel.findOneAndDelete({ slug });

    return {}; // Success
  } catch (error) {
    return { errMsg: (error as Error).message };
  }
}
