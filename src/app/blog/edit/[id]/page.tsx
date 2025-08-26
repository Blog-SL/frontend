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
import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import axios from "axios";
import {
  author_service,
  blog_service,
  blogCategories,
  useAppData,
} from "@/context/AppContext";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, FileText, Sparkles, Tag, Upload } from "lucide-react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const EditBlogPage = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const router = useRouter();

  const { fetchBlogs } = useAppData();

  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    image: File | null;
    blogcontent: string;
  }>({
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

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: "Start typings...",
    }),
    []
  );

  const [existingImage, setExistingImage] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${blog_service}/api/v1/blog/${id}`);
        const blog = data.blog;

        setFormData({
          title: blog.title,
          description: blog.description,
          category: blog.category,
          image: null,
          blogcontent: blog.blogcontent,
        });

        setContent(blog.blogcontent);
        setExistingImage(blog.image);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBlog();
  }, [id]);

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
        `${author_service}/api/v1/blog/${id}`,
        fromDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      fetchBlogs();
    } catch (error) {
      toast.error("Error while adding blog");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-orange-50 to-yellow-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-yellow-200/30 rounded-full blur-2xl"></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-pink-200/20 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-8 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-orange-500 rounded-xl">
              <Edit className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-orange-600 bg-clip-text text-transparent">
              Edit Your Blog
            </h1>
          </div>
          <p className="text-xl text-indigo-600 max-w-2xl mx-auto">
            Polish your masterpiece with our intuitive editor
          </p>
        </div>

        {/* Back Button */}
        <div className="flex justify-start mb-6">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="text-indigo-600 hover:bg-indigo-100 hover:text-indigo-800 rounded-xl px-6 py-3 font-medium transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </div>

        {/* Main Form Card */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-orange-500/10 border-b border-indigo-100/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Sparkles className="h-5 w-5 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-indigo-900">Blog Editor</h2>
            </div>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <Label className="text-lg font-semibold text-indigo-900">Blog Title</Label>
                </div>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter an engaging title for your blog"
                  required
                  className="text-lg p-4 border-2 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200 rounded-xl text-indigo-900 placeholder-indigo-400"
                />
              </div>

              {/* Description Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <Label className="text-lg font-semibold text-indigo-900">Description</Label>
                </div>
                <Input
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Write a compelling description that captures your reader's attention"
                  required
                  className="text-lg p-4 border-2 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200 rounded-xl text-indigo-900 placeholder-indigo-400"
                />
              </div>

              {/* Category Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-indigo-600" />
                  <Label className="text-lg font-semibold text-indigo-900">Category</Label>
                </div>
                <Select
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger className="text-lg p-4 border-2 border-indigo-200 focus:border-indigo-400 rounded-xl">
                    <SelectValue
                      placeholder={formData.category || "Choose a category that fits your content"}
                    />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 border-indigo-200">
                    {blogCategories?.map((e, i) => (
                      <SelectItem 
                        key={i} 
                        value={e}
                        className="text-indigo-800 hover:bg-indigo-50 rounded-lg"
                      >
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <Label className="text-lg font-semibold text-indigo-900">Featured Image</Label>
                </div>
                
                {existingImage && !formData.image && (
                  <div className="relative inline-block">
                    <img
                      src={existingImage}
                      className="w-48 h-32 object-cover rounded-xl border-4 border-indigo-200 shadow-lg"
                      alt="Current blog image"
                    />
                    <div className="absolute top-2 right-2 bg-indigo-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                      Current
                    </div>
                  </div>
                )}
                
                <div className="relative">
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label 
                    htmlFor="image-upload"
                    className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-indigo-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer transition-all duration-200"
                  >
                    <Upload className="h-6 w-6 text-indigo-500" />
                    <span className="text-indigo-700 font-medium">
                      {formData.image ? formData.image.name : "Click to upload a new image"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Content Editor Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Edit className="h-5 w-5 text-indigo-600" />
                  <Label className="text-lg font-semibold text-indigo-900">Blog Content</Label>
                </div>
                <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-200">
                  <p className="text-sm text-indigo-600 mb-4 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Craft your story with rich text formatting. Add images after perfecting your content.
                  </p>
                  <div className="bg-white rounded-lg overflow-hidden border-2 border-indigo-200">
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
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-gradient-to-r from-indigo-500 to-orange-500 hover:from-indigo-600 hover:to-orange-600 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Updating Blog...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5" />
                      Update Blog
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-500/10 to-orange-500/10 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-indigo-100 rounded-lg flex-shrink-0">
                <Sparkles className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-indigo-900 mb-2">Pro Tips for Better Blogs</h3>
                <ul className="text-indigo-700 space-y-1 text-sm">
                  <li>• Use compelling headlines that grab attention</li>
                  <li>• Break up long paragraphs for better readability</li>
                  <li>• Add relevant images to support your content</li>
                  <li>• Choose categories that help readers find your content</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditBlogPage;
