"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useAppData, user_service } from "@/context/AppContext";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import Loading from "@/components/loading";
import { BookOpen, Mail, Shield, User, UserPlus } from "lucide-react";

const RegisterPage = () => {
  const { isAuth, setIsAuth, loading, setLoading, setUser } = useAppData();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  if (isAuth) return redirect("/blogs");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(`${user_service}/api/v1/register`, {
        name,
        email,
        password,
      });
      toast.success(result.data.message);
      // Optionally log in after registration
      const loginRes = await axios.post(`${user_service}/api/v1/login`, {
        email,
        password,
      });
      Cookies.set("token", loginRes.data.token, {
        expires: 5,
        secure: true,
        path: "/",
      });
      setIsAuth(true);
      setLoading(false);
      setUser(loginRes.data.user);
    } catch (error) {
      toast.error("Registration failed");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-300/10 to-green-300/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative w-full max-w-md">
            {/* Logo/Brand section */}
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Join Our Community
              </h1>
              <p className="text-gray-600 mt-2">Start your reading journey today</p>
            </div>

            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-green-500/10 animate-slide-up">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
                  <UserPlus className="w-6 h-6 text-green-600" />
                  Create Your Account
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Join The BlogSL community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div onSubmit={handleRegister} className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative group">
                      
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                      </div>
                      <input
                        type="name"
                        placeholder="Enter the name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70 focus:bg-white"
                        required
                      />
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                      </div>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70 focus:bg-white"
                        required
                      />
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Shield className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                      </div>
                      <input
                        type="password"
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                 

                  <Button 
                    onClick={handleRegister}
                    className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Create Account
                  </Button>

                  {/* Terms and Privacy */}
                  <div className="text-center text-xs text-gray-500">
                    By creating an account, you agree to our{" "}
                    <a href="#" className="text-green-600 hover:text-green-700 underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-green-600 hover:text-green-700 underline">
                      Privacy Policy
                    </a>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white/80 text-gray-500">Already have an account?</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <a 
                      href="/login" 
                      className="inline-flex items-center justify-center w-full py-3 px-4 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium hover:border-gray-300 hover:shadow-md"
                    >
                      Sign In Instead
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features Section */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center animate-slide-up" style={{animationDelay: '0.4s'}}>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <BookOpen className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600 font-medium">Unlimited Reading</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <User className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600 font-medium">Personal Library</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <Shield className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600 font-medium">Secure & Private</p>
              </div>
            </div>

            <div className="text-center mt-6 text-sm text-gray-500">
              Join thousands of readers worldwide
            </div>
          </div>

          <style jsx>{`
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slide-up {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
              animation: fade-in 0.6s ease-out;
            }
            .animate-slide-up {
              animation: slide-up 0.6s ease-out 0.2s both;
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
