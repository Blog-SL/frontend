'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchSaved } from "@/services/api";
import BlogCard from "@/components/BlogCard";

export default function SavedPage() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const token = (session as any)?.accessToken;
    fetchSaved(token).then((data) => setBlogs(Array.isArray(data) ? data : (data?.items ?? []))).catch(()=>setBlogs([]));
  }, [session]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl text-white font-semibold">Saved</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((b, idx) => <BlogCard key={b.id ?? idx} blog={b} />)}
      </div>
    </div>
  );
}
