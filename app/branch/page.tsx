import React from "react";
import UserList from "../_components/blog/UserList";

export const metadata = {
  title: "شعب",
};
const Branch: React.FC = () => {
  return (
    <>
      <h1>Our branches</h1>
      <UserList />
    </>
  );
};

export default Branch;
