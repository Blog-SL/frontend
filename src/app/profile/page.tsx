"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppData, user_service } from "@/context/AppContext";
import React, { useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/components/loading";
import { Camera, Edit3, Facebook, Instagram, Linkedin, LogOut, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { redirect, useRouter } from "next/navigation";

const ProfilePage = () => {
  const { user, setUser, logoutUser } = useAppData();

  if (!user) return redirect("/login");

  const logoutHandler = () => {
    logoutUser();
  };
  const InputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    instagram: user?.instagram || "",
    facebook: user?.facebook || "",
    linkedin: user?.linkedin || "",
    bio: user?.bio || "",
  });

  const clickHandler = () => {
    InputRef.current?.click();
  };

  const changeHandler = async (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append("file", file);
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const { data } = await axios.post(
          `${user_service}/api/v1/user/update/pic`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(data.message);
        setLoading(false);
        Cookies.set("token", data.token, {
          expires: 5,
          secure: true,
          path: "/",
        });
        setUser(data.user);
      } catch (error) {
        toast.error("Image Update Failed");
        setLoading(false);
      }
    }
  };

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      const { data } = await axios.post(
        `${user_service}/api/v1/user/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      setLoading(false);
      Cookies.set("token", data.token, {
        expires: 5,
        secure: true,
        path: "/",
      });
      setUser(data.user);
      setOpen(false);
    } catch (error) {
      toast.error("Update Failed");
      setLoading(false);
    }
  };

   return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-8 px-4">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loading />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-900 mb-2">My Profile</h1>
            <p className="text-indigo-600">Manage your account and preferences</p>
          </div>

          {/* Main Profile Card */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-3xl overflow-hidden">
            {/* Card Header with Gradient */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-8 py-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="relative inline-block group">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-2xl cursor-pointer transition-all duration-300 group-hover:scale-105">
                      <AvatarImage src={user?.image} alt="profile pic" className="object-cover" />
                    </Avatar>
                    <div 
                      className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                      onClick={clickHandler}
                    >
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      ref={InputRef}
                      onChange={changeHandler}
                    />
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-2">{user?.name}</h2>
                {user?.bio && (
                  <p className="text-indigo-100 text-lg max-w-md mx-auto leading-relaxed">
                    {user.bio}
                  </p>
                )}
              </div>
            </div>

            <CardContent className="p-8">
              {/* Social Links */}
              {(user?.instagram || user?.facebook || user?.linkedin) && (
                <div className="text-center mb-8">
                  <h3 className="text-lg font-semibold text-indigo-900 mb-4">Connect With Me</h3>
                  <div className="flex justify-center gap-4">
                    {user?.instagram && (
                      <a
                        href={user.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                      >
                        <Instagram className="w-6 h-6 text-white" />
                      </a>
                    )}

                    {user?.facebook && (
                      <a
                        href={user.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-gradient-to-r from-blue-500 to-blue-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                      >
                        <Facebook className="w-6 h-6 text-white" />
                      </a>
                    )}

                    {user?.linkedin && (
                      <a
                        href={user.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                      >
                        <Linkedin className="w-6 h-6 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => router.push("/blog/new")}
                  className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Create New Blog
                </Button>

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <Edit3 className="w-5 h-5 mr-2" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] bg-white rounded-2xl border-0 shadow-2xl">
                    <DialogHeader className="pb-4">
                      <DialogTitle className="text-2xl font-bold text-indigo-900 text-center">
                        Edit Your Profile
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-indigo-700 font-medium">Name</Label>
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                          placeholder="Enter your name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-indigo-700 font-medium">Bio</Label>
                        <Textarea
                          value={formData.bio}
                          onChange={(e) =>
                            setFormData({ ...formData, bio: e.target.value })
                          }
                          className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl min-h-[100px]"
                          placeholder="Tell us about yourself..."
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label className="text-indigo-700 font-medium">Instagram</Label>
                          <Input
                            value={formData.instagram}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                instagram: e.target.value,
                              })
                            }
                            className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                            placeholder="https://instagram.com/username"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-indigo-700 font-medium">Facebook</Label>
                          <Input
                            value={formData.facebook}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                facebook: e.target.value,
                              })
                            }
                            className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                            placeholder="https://facebook.com/username"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-indigo-700 font-medium">LinkedIn</Label>
                          <Input
                            value={formData.linkedin}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                linkedin: e.target.value,
                              })
                            }
                            className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                      </div>

                      <Button
                        onClick={handleFormSubmit}
                        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mt-6"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button 
                  onClick={logoutHandler}
                  variant="outline"
                  className="border-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-400 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
