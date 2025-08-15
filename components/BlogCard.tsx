import Image from "next/image";

export default function BlogCard({ blog }: { blog: any }) {
  return (
    <article className="card overflow-hidden">
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-xl font-semibold line-clamp-2">{blog.title}</h3>
        <p className="text-neutral-400 line-clamp-3">{blog.excerpt || blog.content?.slice(0, 140) || ""}</p>
        <div className="text-sm text-neutral-500 flex items-center justify-between">
          <span>{blog.author || "Unknown"}</span>
          <span>{new Date(blog.createdAt || blog.date || Date.now()).toLocaleDateString()}</span>
        </div>
      </div>
    </article>
  );
}
