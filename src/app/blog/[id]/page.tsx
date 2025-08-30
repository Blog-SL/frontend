"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  author_service,
  Blog,
  blog_service,
  useAppData,
  User,
} from "@/context/AppContext";
import axios from "axios";
import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  Edit,
  MessageCircle,
  Trash2,
  Trash2Icon,
  User2,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import moment from "moment";
import { time } from "console";

interface Comment {
  id: string;
  userid: string;
  comment: string;
  create_at: string;
  username: string;
}

const BlogPage = () => {
  const { isAuth, user, fetchBlogs, savedBlogs, getSavedBlogs } = useAppData();
  const router = useRouter();
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);

  async function fetchComment() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${blog_service}/api/v1/comment/${id}`);
      setComments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComment();
  }, [id]);

  const [comment, setComment] = useState("");

  async function addComment() {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      const { data } = await axios.post(
        `${blog_service}/api/v1/comment/${id}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      setComment("");
      fetchComment();
    } catch (error) {
      toast.error("Problem while adding comment");
    } finally {
      setLoading(false);
    }
  }

  async function fetchSingleBlog() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${blog_service}/api/v1/blog/${id}`);
      setBlog(data.blog);
      setAuthor(data.author);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const deleteComment = async (id: string) => {
    if (confirm("Are you sure you want to delete this comment")) {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const { data } = await axios.delete(
          `${blog_service}/api/v1/comment/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(data.message);
        fetchComment();
      } catch (error) {
        toast.error("Problem while deleting comment");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  async function deletBlog() {
    if (confirm("Are you sure you want to delete this blog")) {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const { data } = await axios.delete(
          `${author_service}/api/v1/blog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(data.message);
        router.push("/blogs");
        setTimeout(() => {
          fetchBlogs();
        }, 4000);
      } catch (error) {
        toast.error("Problem while deleting comment");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (savedBlogs && savedBlogs.some((b) => b.blogid === id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [savedBlogs, id]);

  async function saveBlog() {
    const token = Cookies.get("token");
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${blog_service}/api/v1/save/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      setSaved(!saved);
      getSavedBlogs();
    } catch (error) {
      toast.error("Problem while saving blog");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSingleBlog();
  }, [id]);

  if (!blog) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-orange-50 to-yellow-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-20 w-40 h-40 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-60 right-32 w-56 h-56 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 left-1/4 w-24 h-24 bg-yellow-200/30 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-8 relative z-10">
        {/* Main Blog Card */}
        <Card className="overflow-hidden border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <div className="relative">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Title overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {blog.title}
              </h1>
            </div>
          </div>

          <CardContent className="p-8">
            {/* Author and Actions Section */}
            <div className="flex flex-wrap items-center justify-between mb-8 pb-6 border-b border-indigo-100">
              <Link
                className="flex items-center gap-4 hover:bg-indigo-50 p-3 rounded-xl transition-all duration-200"
                href={`/profile/${author?._id}`}
              >
                <img
                  src={author?.image}
                  className="w-12 h-12 rounded-full border-3 border-indigo-200 shadow-lg"
                  alt=""
                />
                <div>
                  <p className="font-semibold text-indigo-900 text-lg">{author?.name}</p>
                  <p className="text-indigo-600 text-sm flex items-center gap-1">
                    
                    <Calendar size={14} className="group-hover:text-indigo-600 transition-colors duration-300" />
                                
                     <span className="font-medium">{moment(blog.created_at).format("DD-MM-YYYY")}</span>
                            
                   
                  </p>
                </div>
              </Link>

              <div className="flex items-center gap-3">
                {isAuth && (
                  <Button
                    variant="ghost"
                    size="lg"
                    disabled={loading}
                    onClick={saveBlog}
                    className="hover:bg-indigo-100 text-indigo-700 hover:text-indigo-800 p-3 rounded-xl transition-all duration-200"
                  >
                    {saved ? (
                      <BookmarkCheck className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </Button>
                )}
                
                {blog.author === user?._id && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => router.push(`/blog/edit/${id}`)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl px-4 py-2 transition-all duration-200"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={deletBlog}
                      disabled={loading}
                      className="rounded-xl px-4 py-2 transition-all duration-200"
                    >
                      <Trash2Icon className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Blog Description */}
            <p className="text-xl text-indigo-800 mb-8 leading-relaxed font-medium">
              {blog.description}
            </p>

            {/* Blog Content */}
            <div
              className="prose prose-lg max-w-none prose-indigo prose-headings:text-indigo-900 prose-p:text-indigo-800 prose-a:text-indigo-600 prose-strong:text-indigo-900"
              dangerouslySetInnerHTML={{ __html: blog.blogcontent }}
            />
          </CardContent>
        </Card>

        {/* Comment Form */}
        {isAuth && (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <h3 className="text-2xl font-semibold text-indigo-900 flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-indigo-600" />
                Share your thoughts
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="comment" className="text-indigo-800 font-medium">
                  Your Comment
                </Label>
                <Input
                  id="comment"
                  placeholder="What did you think about this blog post?"
                  className="mt-2 border-2 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200 rounded-xl p-4 text-indigo-900 placeholder-indigo-400"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <Button 
                onClick={addComment} 
                disabled={loading || !comment.trim()}
                className="bg-gradient-to-r from-indigo-500 to-orange-500 hover:from-indigo-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50"
              >
                {loading ? "Posting..." : "Post Comment"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Comments Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <h3 className="text-2xl font-semibold text-indigo-900 flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-indigo-600" />
              Comments ({comments.length})
            </h3>
          </CardHeader>
          <CardContent>
            {comments && comments.length > 0 ? (
              <div className="space-y-6">
                {comments.map((e, i) => (
                  <div key={i} className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-indigo-200 rounded-full">
                            <User2 className="h-4 w-4 text-indigo-700" />
                          </div>
                          <div>
                            <p className="font-semibold text-indigo-900">{e.username}</p>
                            <p className="text-sm text-indigo-600 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(e.create_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-indigo-800 leading-relaxed ml-11">{e.comment}</p>
                      </div>
                      
                      {e.userid === user?._id && (
                        <Button
                          onClick={() => deleteComment(e.id)}
                          variant="ghost"
                          size="sm"
                          disabled={loading}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="h-16 w-16 text-indigo-300 mx-auto mb-4" />
                <p className="text-xl text-indigo-600 font-medium">No comments yet</p>
                <p className="text-indigo-500 mt-2">Be the first to share your thoughts!</p>
              </div>
            )}
          </CardContent>
        </Card>
        {/* Back to Home Button */}
        <div className="text-center py-8">
          <Button
            onClick={() => router.push('/blogs')}
            className="bg-gradient-to-r from-indigo-500 to-orange-500 hover:from-indigo-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            ← Back to All Blogs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
