"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Input } from "./ui/input";
import { BookOpen, BoxSelect, Search } from "lucide-react";
import { blogCategories, useAppData } from "@/context/AppContext";

const SideBar = () => {
  const { searchQuery, setSearchQuery, setCategory } = useAppData();
  return (
    <Sidebar className="border-r border-indigo-200 shadow-lg">
      <SidebarHeader className="bg-gradient-to-b from-indigo-600 to-white text-2xl font-bold mt-5 pb-6 px-6 border-b border-indigo-100">
        <div className="flex items-center gap-3 text-indigo-800">
          <BookOpen className="h-8 w-8 text-indigo-600" />
          <span className="bg-gradient-to-r from-indigo-800 to-indigo-600 bg-clip-text text-transparent">
            
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-gradient-to-b from-white to-indigo-50/30 px-4 py-6">
        <SidebarGroup className="space-y-6">
          {/* Search Section */}
          <div className="space-y-3">
            <SidebarGroupLabel className="text-indigo-800 font-semibold text-sm uppercase tracking-wide flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search
            </SidebarGroupLabel>
            <div className="relative">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your desired blog..."
                className="pl-10 pr-4 py-3 bg-white border-2 border-indigo-200 rounded-xl focus:border-indigo-400 focus:ring-indigo-200 placeholder-indigo-400 text-indigo-900 shadow-sm transition-all duration-200 hover:shadow-md"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-indigo-400" />
            </div>
          </div>

          {/* Categories Section */}
          <div className="space-y-4">
            <SidebarGroupLabel className="text-indigo-800 font-semibold text-sm uppercase tracking-wide flex items-center gap-2">
              <BoxSelect className="h-4 w-4" />
              Categories
            </SidebarGroupLabel>
            
            <SidebarMenu className="space-y-2">
              <SidebarMenuItem>
                {/* All Categories Button */}
                <SidebarMenuButton 
                  onClick={() => setCategory("")}
                  className="w-full justify-start px-4 py-3 rounded-lg bg-white hover:bg-indigo-50 border-2 border-indigo-200 hover:border-indigo-300 transition-all duration-200 text-indigo-800 hover:text-indigo-900 shadow-sm hover:shadow-md group"
                >
                  <BoxSelect className="h-5 w-5 text-indigo-500 group-hover:text-indigo-600 transition-colors" /> 
                  <span className="font-medium ml-3">All Categories</span>
                </SidebarMenuButton>
                
                {/* Individual Category Buttons */}
                <div className="space-y-2 mt-3">
                  {blogCategories?.map((e, i) => {
                    return (
                      <SidebarMenuButton 
                        key={i} 
                        onClick={() => setCategory(e)}
                        className="w-full justify-start px-4 py-3 rounded-lg bg-white hover:bg-indigo-50 border-2 border-indigo-200 hover:border-indigo-300 transition-all duration-200 text-indigo-800 hover:text-indigo-900 shadow-sm hover:shadow-md group"
                >
                        <BoxSelect className="h-5 w-5 text-indigo-500 group-hover:text-indigo-600 transition-colors" /> 
                        <span className="font-medium ml-3 capitalize">{e}</span>
                      </SidebarMenuButton>
                    );
                  })}
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;
