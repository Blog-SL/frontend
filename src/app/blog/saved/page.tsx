// "use client";
// import BlogCard from "@/components/BlogCard";
// import Loading from "@/components/loading";
// import { useAppData } from "@/context/AppContext";
// import React from "react";

// const SavedBlogs = () => {
//   const { blogs, savedBlogs } = useAppData();  

//   if (!blogs || !savedBlogs) {
//     return <Loading />;
//   }

//   const filteredBlogs = blogs.filter((blog) =>
//     savedBlogs.some((saved) => saved.blogid === blog.id.toString())
//   );

//   return (
//     <div className="container mx-auto px-4">
//       <h1 className="text-3xl font-bold mt-2">Saved Blogs</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//         {filteredBlogs.length > 0 ? (
//           filteredBlogs.map((e, i) => {
//             return (
//               <BlogCard
//                 key={i}
//                 image={e.image}
//                 title={e.title}
//                 desc={e.description}
//                 id={e.id}
//                 time={e.created_at}
//               />
//             );
//           })
//         ) : (
//           <p>No saved blogs yet!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SavedBlogs;

"use client";
import BlogCard from "@/components/BlogCard";
import Loading from "@/components/loading";
import { useAppData } from "@/context/AppContext";
import { ArrowRight, Bookmark, BookmarkCheck, Heart, Sparkles, Star } from "lucide-react";
import React from "react";

const SavedBlogs = () => {
  const { blogs, savedBlogs } = useAppData();  


  if (!blogs) {
    return <Loading />; 
  }

  const filteredBlogs = savedBlogs
    ? blogs.filter((blog) =>
        savedBlogs.some((saved) => saved.blogid === blog.id.toString())
      )
    : []; 

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-orange-50 to-yellow-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-32 h-32 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-32 w-48 h-48 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 left-1/4 w-20 h-20 bg-yellow-200/30 rounded-full blur-2xl"></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-pink-200/20 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-6 pt-24 pb-12 relative z-10">
        {/* Header Section with proper spacing from navbar */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-indigo-500 to-orange-500 rounded-2xl shadow-lg">
              <BookmarkCheck className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-orange-600 bg-clip-text text-transparent">
              Your Saved Collection
            </h1>
            <p className="text-lg text-indigo-600 max-w-xl mx-auto">
              Curated stories and insights you've bookmarked for later reading
            </p>
            
            {/* Stats Badge */}
            {filteredBlogs.length > 0 && (
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full border border-indigo-200 shadow-sm">
                <Star className="h-4 w-4 text-indigo-500" />
                <span className="text-indigo-700 font-medium">
                  {filteredBlogs.length} saved {filteredBlogs.length === 1 ? 'article' : 'articles'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBlogs.map((blog, index) => (
              <div 
                key={index}
                className="group transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <BlogCard
                    image={blog.image}
                    title={blog.title}
                    desc={blog.description}
                    id={blog.id}
                    time={blog.created_at}
                  />
                  {/* Saved Badge */}
                  <div className="absolute top-4 right-4 p-2 bg-indigo-500 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <BookmarkCheck className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Beautiful Empty State */
          <div className="text-center py-16">
            <div className="max-w-lg mx-auto space-y-8">
              {/* Empty State Icon */}
              <div className="relative inline-block">
                <div className="p-8 bg-gradient-to-br from-indigo-100 to-orange-100 rounded-full">
                  <Bookmark className="h-16 w-16 text-indigo-400" />
                </div>
                <div className="absolute -top-2 -right-2 p-2 bg-white rounded-full shadow-lg">
                  <Heart className="h-6 w-6 text-red-400" />
                </div>
              </div>

              {/* Empty State Content */}
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-indigo-700">
                  No Saved Blogs Yet
                </h3>
                <p className="text-indigo-500 text-lg leading-relaxed">
                  Start building your personal collection by bookmarking articles that inspire you
                </p>
              </div>

              {/* Instructions Card */}
              <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-indigo-100 shadow-lg max-w-md mx-auto">
                <h4 className="font-semibold text-indigo-800 mb-6 text-lg">How to save blogs:</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-left">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold text-sm">1</span>
                    </div>
                    <span className="text-indigo-600">Browse through our blog collection</span>
                  </div>
                  <div className="flex items-center gap-4 text-left">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-semibold text-sm">2</span>
                    </div>
                    <span className="text-indigo-600">Click the bookmark icon on any blog</span>
                  </div>
                  <div className="flex items-center gap-4 text-left">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 font-semibold text-sm">3</span>
                    </div>
                    <span className="text-indigo-600">Find them here in your collection</span>
                  </div>
                </div>
              </div>

              {/* Explore Button */}
              <button 
                onClick={() => window.location.href = '/blogs'}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-orange-500 hover:from-indigo-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Sparkles className="h-5 w-5" />
                Explore Blogs
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedBlogs;
