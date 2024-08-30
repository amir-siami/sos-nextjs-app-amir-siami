import React from "react";
import { getUsers } from "@/_actions/userAction";
import { IUser } from "../types/user";

// Define the metadata for the page
export const metadata = {
  title: "خدمات درمانی",
};

// Define the Center component
const Center: React.FC = async () => {
  const { data, errMsg }: { data?: IUser[]; errMsg?: string } =
    await getUsers();
  // console.log(posts);
  if (errMsg) return <h1>{errMsg}</h1>;

  return (
    <div>
      {data?.map((item) => (
        <h1 key={item._id}>hello {item.username}</h1>
      ))}
    </div>
  );
};

export default Center;
