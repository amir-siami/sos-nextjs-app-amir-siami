import { NextResponse } from "next/server";
import connectToDb from "@/config/connectToDb";
import PostModel from "@/models/Post";
import { IPost } from "@/app/types/blog";

interface IGetPostsResponse {
  data?: IPost[]; // Include posts in the response
  errMsg?: string;
}

// Function to handle GET requests
export async function GET() {
  try {
    await connectToDb();
    const data: IPost[] = JSON.parse(JSON.stringify(await PostModel.find()));
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { errMsg: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// Handle POST request
export async function POST(request: Request) {
  try {
    await connectToDb();
    const { title, description, image, author } = await request.json();

    const newPost = new PostModel({ title, description, image, author });
    newPost.slug = newPost._id.toString();

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
