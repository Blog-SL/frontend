import { BookOpen, Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-300 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="text-center space-y-8 relative z-10">
        {/* Animated logo */}
        <div className="relative">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-2xl animate-bounce">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          
          {/* Floating particles */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-75" style={{animationDelay: '0.5s'}}></div>
        </div>

        {/* Loading text with gradient */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
            Loading
          </h2>
          <p className="text-gray-600 text-lg">
            Preparing your reading sanctuary...
          </p>
        </div>

        {/* Animated progress indicators */}
        <div className="space-y-6">
          {/* Spinning loader */}
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>

          {/* Progress bar */}
          <div className="w-80 max-w-full mx-auto">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Bouncing dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>

        {/* Subtle loading messages */}
        <div className="text-sm text-gray-500 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Curating your content</span>
          </div>
        </div>
      </div>

      {/* Floating books animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 opacity-10 animate-float">
          <BookOpen className="w-8 h-8 text-indigo-600" />
        </div>
        <div className="absolute top-40 right-16 opacity-10 animate-float" style={{animationDelay: '1s'}}>
          <BookOpen className="w-6 h-6 text-purple-600" />
        </div>
        <div className="absolute bottom-32 left-20 opacity-10 animate-float" style={{animationDelay: '2s'}}>
          <BookOpen className="w-7 h-7 text-pink-600" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10 animate-float" style={{animationDelay: '1.5s'}}>
          <BookOpen className="w-5 h-5 text-indigo-600" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;
