import * as React from "react";
import BlogList from "@/app/_components/blog/BlogList";
import { IPost } from "../types/blog";
import { getPosts } from "@/_actions/postAction";

export const metadata = {
  title: "بلاگ",
};

const BlogPage: React.FC = async () => {
  const { data, errMsg }: { data?: IPost[]; errMsg?: string } =
    await getPosts();

  console.log("data", data);

  if (errMsg) {
    console.error("Error fetching posts:", errMsg);
    return <h1>{errMsg}</h1>;
  }

  if (!data || data.length === 0) {
    return (
      <div
        className="bg-orange-100 border border-orange-400 text-orange-400 px-4 py-3 rounded relative"
        role="alert"
      >
        <h2 className="font-semibold">اطلاعاتی برای مشاهده وجود ندارد</h2>
      </div>
    );
  }

  return (
    <div className="flex gap-4 justify-between">
      <BlogList blogs={data} />
    </div>
  );
};

export default BlogPage;
