"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function CreateBlog() {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("投稿中...");
    try {
      // 第1引数にエンドポイント、第2引数に投稿データ
      await axios.post("http://localhost:3001/api/blogs", {
        title: title,
        author: author,
        content: content
      });
      // idにloadingToastを指定することで、既存のtoast.loading()を更新する
      toast.success("投稿に成功しました！", { id: loadingToast });
      setTimeout(() => {
        toast.dismiss(loadingToast);
        router.push("/");
      }, 1000);
    } catch (error) {
      toast.error(`投稿に失敗しました。　エラー：${error}`,  { id: loadingToast })
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">ブログ投稿フォーム</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-600">タイトル</label>
                <input 
                  id="title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="タイトルを入力してください"
                />
              </div>
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-600">名前</label>
                <input 
                  id="author"
                  type="text"
                  onChange={(e) => setAuthor(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="名前を入力してください"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-600">内容</label>
                <textarea
                  id="content"
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 p-2 w-full h-32 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ブログ内容を入力してください"
                />
              </div>
              <div className="mt-6 text-center">
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  投稿する
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}