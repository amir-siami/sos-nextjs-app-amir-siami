"use client"; // Correct usage of use client directive

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "@/app/types/user";

export const metadata = {
  title: "شعب",
};

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]); // State to hold users
  const [error, setError] = useState<string | null>(null); // State to hold error message

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users"); // Fetching from the API
        setUsers(response.data); // Set the state with the fetched users
      } catch (err) {
        setError("Failed to fetch users"); // Set error state if the fetch fails
      }
    };

    fetchUsers(); // Call the function to fetch users
  }, []); // Empty dependency array to fetch once on mount

  return (
    <div>
      <h1>User List</h1>
      {error && <p>{error}</p>} {/* Display error if there's any */}
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
