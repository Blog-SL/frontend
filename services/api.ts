import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  withCredentials: true,
});

// Blog APIs, preserving microservice relationships by using existing paths
export async function fetchBlogs(params: Record<string, any> = {}) {
  const res = await api.get("/blogs", { params });
  return res.data;
}

export async function createBlog(payload: any, token?: string) {
  const res = await api.post("/blogs", payload, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res.data;
}

export async function fetchSaved(token?: string) {
  const res = await api.get("/saved", {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res.data;
}
