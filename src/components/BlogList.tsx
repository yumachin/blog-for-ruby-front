"use client";

import { Blog } from "@/types/types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// props オブジェクトから、blogs プロパティを分割代入で取得し、型注釈を適用
export default function BlogList({ blogs }: { blogs: Blog[] }) {
  const router = useRouter();
  const handleDelete = async ( id: number ) => {
    // 削除確認ダイアログの表示
    const deleteChecker = window.confirm("本当にこの投稿を削除しますか？");
    // 削除キャンセルが選択された場合、処理を中断
    if (!deleteChecker) {
      return;
    }
    try {
      await axios.delete(`http://localhost:3001/api/blogs/${id}`);
      // ページをリロード（削除ボタン押下後、ページをリロードしないと、投稿が削除されないから）
      router.refresh();
    } catch (error) {
      // id に一意の識別子を割り当てることで、トースト通知の重複を防ぐ
      toast.error(`削除に失敗しました。　エラー：${error}`, {id: "a"});
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {blogs.map((blog: Blog) => (
        <div 
          key={blog.id} 
          className="bg-white rounded-lg shadow-lg hover:shadow-xl p-6 transition-all transform hover:scale-105 flex flex-col"
        >
          <div className="mb-4">
            <Link href={`/manage/${blog.id}`}>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors hover:underline">
                {blog.title}
              </h2>
            </Link>
            <div className="text-sm text-gray-500">{blog.author}</div>
          </div>
          <div className="text-gray-700 text-base mb-4 line-clamp-3">
            {blog.content}
          </div>
          <div className="text-sm text-gray-400 text-right mb-4">
            {new Date(blog.created_at).toLocaleDateString()}
          </div>
          <div className="flex justify-between items-center">
            <Link 
              href={`manage/edit/${blog.id}`} 
              className="text-green-500 hover:text-green-600 hover:underline"
            >
              Edit
            </Link>
            <button 
              className="text-red-500 hover:text-red-600 hover:underline"
              onClick={() => handleDelete(blog.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}