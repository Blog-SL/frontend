"use client"; 
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Bookmark, BookOpen, CircleUserRoundIcon, Home, LogIn, Menu, User, UserPlus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppData } from "@/context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { loading, isAuth } = useAppData();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100  z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/blogs" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                The BlogSL
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Your literary sanctuary</p>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-6">
              <li>
                <Link 
                  href="/blogs" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 group"
                >
                  <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>Home</span>
                </Link>
              </li>
              
              {isAuth && (
                <li>
                  <Link 
                    href="/blog/saved" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 group"
                  >
                    <Bookmark className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>Saved Blogs</span>
                  </Link>
                </li>
              )}
            </ul>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {loading ? (
                <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              ) : isAuth ? (
                <Link href="/profile" className="group">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link 
                    href="/login" 
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-all duration-200 rounded-xl hover:bg-gray-50"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                  <Link 
                    href="/register" 
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          )}
        >
          <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl p-6 shadow-inner">
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/blogs" 
                  className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 font-medium transition-all duration-200 p-3 rounded-xl hover:bg-white hover:shadow-md"
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </Link>
              </li>
              
              {isAuth && (
                <li>
                  <Link 
                    href="/blog/saved" 
                    className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 font-medium transition-all duration-200 p-3 rounded-xl hover:bg-white hover:shadow-md"
                  >
                    <Bookmark className="w-5 h-5" />
                    <span>Saved Blogs</span>
                  </Link>
                </li>
              )}

              {loading ? (
                <li className="flex justify-center p-3">
                  <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                </li>
              ) : isAuth ? (
                <li>
                  <Link 
                    href="/profile" 
                    className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 font-medium transition-all duration-200 p-3 rounded-xl hover:bg-white hover:shadow-md"
                  >
                    <div className="relative">
                      <User className="w-5 h-5" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span>Profile</span>
                  </Link>
                </li>
              ) : (
                <li className="space-y-3 pt-2 border-t border-gray-200">
                  <Link 
                    href="/login" 
                    className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 font-medium transition-all duration-200 p-3 rounded-xl hover:bg-white hover:shadow-md"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </Link>
                  <Link 
                    href="/register" 
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Create Account</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
