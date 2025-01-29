import BlogList from "@/components/BlogList";
import { Blog } from "@/types/types";
import Link from "next/link";

export default async function Home() {
  const getAllBlogs = async () => {
    const res = await fetch("http://localhost:3001/api/blogs", {
      // SSRでデータを取得
      cache: "no-store"
    });
    // JSON形式に変換
    return res.json();
  };
  const blogs: Blog[] = await getAllBlogs();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <span className="text-3xl font-bold">Blog</span>
          <div>
            <Link
              href={"manage/create"}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
            >
              新規投稿
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-8">
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
}