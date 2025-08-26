"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw, Image, PenTool, Sparkles, FileText, Tag, Wand2, Upload } from "lucide-react";
import React, { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import axios from "axios";
import {
  author_service,
  blogCategories,
  useAppData,
} from "@/context/AppContext";
import toast from "react-hot-toast";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const AddBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { fetchBlogs } = useAppData();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
    blogcontent: "",
  });

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const fromDataToSend = new FormData();

    fromDataToSend.append("title", formData.title);
    fromDataToSend.append("description", formData.description);
    fromDataToSend.append("blogcontent", formData.blogcontent);
    fromDataToSend.append("category", formData.category);

    if (formData.image) {
      fromDataToSend.append("file", formData.image);
    }

    try {
      const token = Cookies.get("token");
      const { data } = await axios.post(
        `${author_service}/api/v1/blog/new`,
        fromDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      setFormData({
        title: "",
        description: "",
        category: "",
        image: null,
        blogcontent: "",
      });
      setContent("");
      setTimeout(() => {
        fetchBlogs();
      }, 4000);
    } catch (error) {
      toast.error("Error while adding blog");
    } finally {
      setLoading(false);
    }
  };

  const [aiTitle, setAiTitle] = useState(false);

  const aiTitleResponse = async () => {
    try {
      setAiTitle(true);
      const { data } = await axios.post(`${author_service}/api/v1/ai/title`, {
        text: formData.title,
      });
      setFormData({ ...formData, title: data });
    } catch (error) {
      toast.error("Problem while fetching from ai");
      console.log(error);
    } finally {
      setAiTitle(false);
    }
  };

  const [aiDescripiton, setAiDescription] = useState(false);

  const aiDescriptionResponse = async () => {
    try {
      setAiDescription(true);
      const { data } = await axios.post(
        `${author_service}/api/v1/ai/descripiton`,
        {
          title: formData.title,
          description: formData.description,
        }
      );
      setFormData({ ...formData, description: data });
    } catch (error) {
      toast.error("Problem while fetching from ai");
      console.log(error);
    } finally {
      setAiDescription(false);
    }
  };

  const [aiBlogLoading, setAiBlogLoading] = useState(false);

  const aiBlogResponse = async () => {
    try {
      setAiBlogLoading(true);
      const { data } = await axios.post(`${author_service}/api/v1/ai/blog`, {
        blog: formData.blogcontent,
      });
      setContent(data.html);
      setFormData({ ...formData, blogcontent: data.html });
    } catch (error: any) {
      toast.error("Problem while fetching from ai");
      console.log(error);
    } finally {
      setAiBlogLoading(false);
    }
  };

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: "Start typings...",
    }),
    []
  );
 return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-orange-50 to-yellow-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-32 h-32 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-32 w-48 h-48 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 left-1/4 w-20 h-20 bg-yellow-200/30 rounded-full blur-2xl"></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-pink-200/20 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-indigo-500 to-orange-500 rounded-2xl shadow-lg">
              <PenTool className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-orange-600 bg-clip-text text-transparent">
              Create Amazing Content
            </h1>
            <p className="text-lg text-indigo-600 max-w-xl mx-auto">
              Share your thoughts, insights, and stories with the world
            </p>
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-orange-600 text-white p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">New Blog Post</h2>
                <p className="text-indigo-100">Fill in the details below to publish your blog</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <Label className="text-lg font-semibold text-indigo-800">Blog Title</Label>
                </div>
                <div className="flex gap-3">
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter an engaging blog title..."
                    className={`flex-1 border-2 border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl py-3 px-4 text-lg transition-all duration-200 ${
                      aiTitle ? "animate-pulse placeholder:opacity-60 bg-indigo-50" : ""
                    }`}
                    required
                  />
                  {formData.title !== "" && (
                    <Button
                      type="button"
                      onClick={aiTitleResponse}
                      disabled={aiTitle}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <RefreshCw className={`h-4 w-4 ${aiTitle ? "animate-spin" : ""}`} />
                    </Button>
                  )}
                </div>
                <p className="text-sm text-indigo-500">Use AI to enhance your title for better engagement</p>
              </div>

              {/* Description Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <Label className="text-lg font-semibold text-indigo-800">Description</Label>
                </div>
                <div className="flex gap-3">
                  <Input
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Write a compelling description..."
                    className={`flex-1 border-2 border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl py-3 px-4 text-lg transition-all duration-200 ${
                      aiDescripiton ? "animate-pulse placeholder:opacity-60 bg-indigo-50" : ""
                    }`}
                    required
                  />
                  {formData.title !== "" && (
                    <Button
                      onClick={aiDescriptionResponse}
                      type="button"
                      disabled={aiDescripiton}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <RefreshCw className={`h-4 w-4 ${aiDescripiton ? "animate-spin" : ""}`} />
                    </Button>
                  )}
                </div>
                <p className="text-sm text-indigo-500">AI can help optimize your description for better reach</p>
              </div>

              {/* Category and Image Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Category Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Tag className="h-5 w-5 text-indigo-600" />
                    <Label className="text-lg font-semibold text-indigo-800">Category</Label>
                  </div>
                  <Select
                    onValueChange={(value: any) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger className="border-2 border-indigo-200 focus:border-indigo-500 rounded-xl py-3 px-4 text-lg">
                      <SelectValue
                        placeholder={formData.category || "Select a category"}
                      />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {blogCategories?.map((category, index) => (
                        <SelectItem key={index} value={category} className="py-2">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Image Upload Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Image className="h-5 w-5 text-indigo-600" />
                    <Label className="text-lg font-semibold text-indigo-800">Featured Image</Label>
                  </div>
                  <div className="relative">
                    <Input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className="border-2 border-indigo-200 focus:border-indigo-500 rounded-xl py-4 px-4 text-base h-auto min-h-[56px] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition-all duration-200"
                    />
                    <Upload className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400 pointer-events-none" />
                  </div>
                  <p className="text-sm text-indigo-500">Upload a high-quality image to make your blog more engaging</p>
                </div>
              </div>

              {/* Blog Content Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <PenTool className="h-5 w-5 text-indigo-600" />
                    <Label className="text-lg font-semibold text-indigo-800">Blog Content</Label>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onClick={aiBlogResponse}
                    disabled={aiBlogLoading}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Wand2 className={`h-4 w-4 mr-2 ${aiBlogLoading ? "animate-spin" : ""}`} />
                    <span>Fix Grammar</span>
                  </Button>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-200">
                  <p className="text-sm text-indigo-600 mb-2 font-medium">
                    ✨ Pro Tips for Great Content:
                  </p>
                  <p className="text-sm text-indigo-500">
                    Write your content first, then use our AI grammar fixer. Add images after polishing your text for the best results.
                  </p>
                </div>
                
                <div className="border-2 border-indigo-200 rounded-xl overflow-hidden shadow-lg">
                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => {
                      setContent(newContent);
                      setFormData({ ...formData, blogcontent: newContent });
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-indigo-600 to-orange-600 hover:from-indigo-700 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] text-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      Publishing Your Blog...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5" />
                      Publish Blog Post
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-indigo-100 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <FileText className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-indigo-800">Engaging Titles</h3>
            </div>
            <p className="text-indigo-600 text-sm">Use our AI to create compelling titles that grab attention and improve your blog's reach.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-indigo-100 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Wand2 className="h-5 w-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-indigo-800">Grammar Perfection</h3>
            </div>
            <p className="text-indigo-600 text-sm">Polish your content with AI-powered grammar checking and enhancement tools.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-indigo-100 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Image className="h-5 w-5 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-indigo-800">Visual Appeal</h3>
            </div>
            <p className="text-indigo-600 text-sm">Add high-quality featured images to make your blog posts more engaging and shareable.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
