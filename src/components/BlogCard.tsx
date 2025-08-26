import Link from "next/link";
import React from "react";
import { Card } from "./ui/card";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import moment from "moment";

interface BlogCardProps {
  image: string;
  title: string;
  desc: string;
  id: string;
  time: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  title,
  desc,
  id,
  time,
}) => {
  return (
    <Link href={`/blog/${id}`}>
      <Card className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl border-0 bg-white transition-all duration-500 hover:scale-[1.02] cursor-pointer relative">
        {/* Gradient overlay for hover effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-2xl"></div>
        
        {/* Image container with overlay effects */}
        <div className="relative w-full h-[220px] overflow-hidden">
          <img 
            src={image || "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          
          {/* Reading time badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-xs font-medium text-gray-700 shadow-lg">
            <Clock size={12} />
            <span>3 min read</span>
          </div>
          
          {/* Category badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full px-3 py-1 text-xs font-medium shadow-lg">
            Article
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 space-y-4">
          {/* Date section */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="p-1.5 bg-gray-100 rounded-full group-hover:bg-indigo-100 transition-colors duration-300">
              <Calendar size={14} className="group-hover:text-indigo-600 transition-colors duration-300" />
            </div>
            <span className="font-medium">{moment(time).format("DD-MM-YYYY")}</span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold leading-tight text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
            {title || "Exploring the Art of Mindful Reading"}
          </h2>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed line-clamp-2 text-sm">
            {(desc || "Discover how mindful reading can transform your relationship with books and enhance your understanding of complex narratives.").slice(0, 80)}...
          </p>

          {/* Read more section */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">R</span>
              </div>
              <span className="text-sm text-gray-500 font-medium">Reading Retreat</span>
            </div>
            
            <div className="flex items-center gap-1 text-indigo-600 font-medium text-sm group-hover:gap-2 transition-all duration-300">
              <span>Read More</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Bottom gradient accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </Card>
    </Link>
  );
};

export default BlogCard;
