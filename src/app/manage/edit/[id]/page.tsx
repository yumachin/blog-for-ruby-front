"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, use, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditBlog({ params }: { params: Promise<{ id: number }> }) {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const wrapParams = use(params);
  const router = useRouter();

  const getSpecficBlog = async ( id: number ) => {
    const res = await fetch(`http://localhost:3001/api/blogs/${id}`);
    return res.json();
  };

  useEffect(() => {
    const fetchSpecificBlog = async () => {
      const blog = await getSpecficBlog(wrapParams.id);
      setTitle(blog.title);
      setAuthor(blog.author);
      setContent(blog.content);
    };
    fetchSpecificBlog();
  }, [wrapParams.id]);

  const handleSubmit = async ( e: FormEvent ) => {
    e.preventDefault();
    const loadingToast = toast.loading("投稿中...");
    try {
      await axios.put(`http://localhost:3001/api/blogs/${wrapParams.id}`, {
        title: title,
        author: author,
        content:content
      });
      toast.success("更新しました！", { id: loadingToast });
      setTimeout(() => {
        toast.dismiss(loadingToast);
        router.push("/");
      }, 1000);
    } catch (error) {
      toast.error(`更新に失敗しました。${error}`, { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">ブログ編集フォーム</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-600">タイトル</label>
              <input 
                id="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={title}
              />
            </div>
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-600">名前</label>
              <input 
                id="author"
                type="text"
                onChange={(e) => setAuthor(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={author}
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-600">内容</label>
              <textarea
                id="content"
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 p-2 w-full h-32 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={content}
              />
            </div>
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                更新する
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}