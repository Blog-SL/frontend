"use client";
import BlogCard from "@/components/BlogCard";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useAppData } from "@/context/AppContext";
import { BookOpen, Filter, Sparkles } from "lucide-react";
import React from "react";

const Blogs = () => {
  const { toggleSidebar } = useSidebar();
  const { loading, blogLoading, blogs } = useAppData();
  console.log(blogs);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {loading ? (
        <div >
          <Loading />
        </div>
      ) : (
        <div className="container mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Latest Blogs
                </h1>
                <p className="text-green text-sm mt-1 flex items-center gap-2">
                  <Sparkles className="h-3 w-3" />
                  Discover amazing stories and insights
                </p>
              </div>
            </div>
            
            <Button
              onClick={toggleSidebar}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-indigo-600 hover:to-orange-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
            >
              <Filter size={18} />
              <span className="font-semibold">Filter Blogs</span>
            </Button>
          </div>

          {/* Content Section */}
          {blogLoading ? (
            <div>
              <Loading />
            </div>
          ) : (
            <div className="relative">
              {/* Decorative background elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-indigo-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 right-20 w-48 h-48 bg-orange-200/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-yellow-200/30 rounded-full blur-2xl"></div>
              </div>

              {blogs?.length === 0 ? (
                <div className="text-center py-20">
                  <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-200/50 inline-block">
                    <BookOpen className="h-16 w-16 text-indigo-400 mx-auto mb-4" />
                    <p className="text-xl text-indigo-700 font-medium">No Blogs Yet</p>
                    <p className="text-indigo-600/70 mt-2">Check back soon for amazing content!</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
                  {blogs &&
                    blogs.map((e, i) => {
                      return (
                        <div
                          key={i}
                          className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                        >
                          <BlogCard
                            image={e.image}
                            title={e.title}
                            desc={e.description}
                            id={e.id}
                            time={e.created_at}
                          />
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blogs;
