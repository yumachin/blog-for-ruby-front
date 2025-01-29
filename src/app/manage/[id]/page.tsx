"use client";

import { Blog } from "@/types/types";
import { use, useEffect, useState } from "react";

export default function SpecificBlog({ params }: { params: Promise<{ id: number }> }) {
  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState<boolean>(true);
  const wrapParams = use(params);
  const getSpecificBlog = async ( id: number ) => {
    const res = await fetch(`http://localhost:3001/api/blogs/${id}`,{
      // ISR で取得
      next: {revalidate: 30}
    });
    return res.json();
  };

  // 初期値の入れ込み
  useEffect(() => {
    const fetchSpecificBlog = async () => {
      const blog = await getSpecificBlog(wrapParams.id);
      setBlog(blog);
      setLoading(false);
    }
    fetchSpecificBlog();
  }, [wrapParams.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">ブログ記事は存在しません。</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg my-8 border border-gray-200">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        {blog.title}
      </h1>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-8">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{blog.author}</span>
          <span className="text-gray-400">|</span>
          {/* 日付フォーマットで表示するため */}
          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
        </div>
      </div>
      <p className="text-gray-700 text-lg leading-relaxed">
        {blog.content}
      </p>
    </div>
  );
}