'use client';

import { useEffect, useState } from "react";
import FilterBar from "@/components/FilterBar";
import BlogCard from "@/components/BlogCard";
import { fetchBlogs } from "@/services/api";

export default function AllBlogsPage() {
  const [filters, setFilters] = useState<any>({});
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const params: any = {};
    if (filters.category) params.category = filters.category;
    if (filters.author) params.author = filters.author;
    if (filters.sort) params.sort = filters.sort;
    fetchBlogs(params)
      .then((data) => setBlogs(Array.isArray(data) ? data : (data?.items ?? [])))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-white">Latest Blogs</h1>
      <FilterBar onChange={setFilters} />

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card h-40 animate-pulse bg-neutral-800" />
          ))}
        </div>
      )}

      {!loading && blogs.length === 0 && (
        <p className="text-neutral">No blogs found...</p>
      )}

      {!loading && blogs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((b, idx) => <BlogCard key={b.id ?? idx} blog={b} />)}
        </div>
      )}
    </div>
  );
}
