'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { createBlog } from "@/services/api";

export default function CreatePage() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Tech");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      await createBlog({ title, content, category }, (session as any)?.accessToken);
      setMessage("Created!");
      setTitle(""); setContent("");
    } catch (e) {
      setMessage("Failed to create blog");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl text-white font-semibold">Create Blog</h1>
      <form onSubmit={onSubmit} className="card p-4 space-y-4">
        <input
          className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
          placeholder="Title"
          value={title}
          onChange={e=>setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full min-h-56 rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
          placeholder="Write your content..."
          value={content}
          onChange={e=>setContent(e.target.value)}
          required
        />
        <div className="flex items-center gap-3">
          <label className="text-sm text-neutral-400">Category</label>
          <select
            className="rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2"
            value={category}
            onChange={e=>setCategory(e.target.value)}
          >
            {["Tech","Lifestyle","Travel","Business","Other"].map(c=>(<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
        <button disabled={busy} className="btn btn-primary">
          {busy ? "Publishing..." : "Publish"}
        </button>
        {message && <p className="text-sm text-neutral-400">{message}</p>}
      </form>
    </div>
  );
}
