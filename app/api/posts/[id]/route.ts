import { NextResponse } from "next/server";
import connectToDb from "@/config/connectToDb";
import PostModel from "@/models/Post";

interface Params {
  id: string;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Establish the database connection
  await connectToDb();

  try {
    // Find the post by ID
    const blog = await PostModel.findById(id); // Use findById for better readability and handling of ObjectId

    // Handle case where no blog is found
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Return the blog data
    return NextResponse.json(blog, { status: 200 }); // Flattening the response, directly returning the object
  } catch (error) {
    // Handle any possible errors
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const { id } = params;
  const body = await request.json(); // Get the JSON body of the request

  await connectToDb();

  try {
    const updatedBlog = await PostModel.findByIdAndUpdate(id, body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}
