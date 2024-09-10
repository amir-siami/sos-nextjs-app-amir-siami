"use server";

import UserModel from "@/models/User";
import connectDB from "@/config/connectToDb";
import { IUser } from "@/app/types/user";

// Define the return type for the getPosts function
interface IGetUsersResponse {
  data?: IUser[]; // Include posts in the response
  errMsg?: string;
}

export async function getUsers(): Promise<IGetUsersResponse> {
  try {
    await connectDB();
    const data: IUser[] = JSON.parse(JSON.stringify(await UserModel.find()));
    return { data }; // Return the users in the response
  } catch (error) {
    return { errMsg: (error as Error).message }; // Type assertion for error
  }
}
