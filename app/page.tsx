'use client';

import { useEffect, useState } from "react";
import FilterBar from "@/components/FilterBar";
import BlogCard from "@/components/BlogCard";
import { fetchBlogs } from "@/services/api";
import Link from "next/link";

export default function Home() {
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
    <div className="space-y-12">
  <section className="pt-32 py-16 text-center max-w-7xl mx-auto px-6">
    <h1 className="text-5xl font-semibold text-white mb-4">
      Hang onto your memories
    </h1>
    <p className="text-2xl text-white mb-6">
      Save the moments that matter. BlogVerse lets you safely store thousands memories with Google.
    </p>
    <Link
          href="/create"
          className="inline-block px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-lg transition"
        >
          Create Blog
        </Link>
  </section>
</div>

  );
}
