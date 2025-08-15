'use client';

import { useEffect, useState } from "react";
import clsx from "clsx";

type FilterState = {
  category?: string;
  sort?: "newest" | "oldest";
  author?: string;
};

const categories = ["All", "Technology", "Lifestyle", "Travel", "Business", "Other"];

export default function FilterBar({ onChange }: { onChange: (f: FilterState)=>void }) {
  const [selected, setSelected] = useState<FilterState>({ sort: "newest" });

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {categories.map(cat => {
          const active = (selected.category ?? "All") === cat;
          return (
            <button
                key={cat}
                className={clsx(
                 "px-4 py-2 rounded-full font-bold transition", 
                   active
                  ? "bg-orange-300 border-orange-300 text-white" 
                      : "bg-orange-50 border-orange-300 text-teal-950 hover:bg-orange-100" 
                  )}
                onClick={() =>
                setSelected((s) => ({ ...s, category: cat === "All" ? undefined : cat }))
              }
          >
                {cat}
              </button>

          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral">Sort:</span>
        {(["newest", "oldest"] as const).map(key => (
<button
  key={key}
  className={clsx(
    "px-4 py-2 rounded-full font-bold transition", 
    selected.sort === key
      ? "bg-orange-300 border-orange-300 text-white" 
                      : "bg-orange-50 border-orange-300 text-teal-950 hover:bg-orange-100" 
  )}
  onClick={() => setSelected(s => ({ ...s, sort: key }))}
>
  {key[0].toUpperCase() + key.slice(1)}
</button>

))}

        <input
          type="text"
          placeholder="Filter by author..."
          className="ml-2 rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
          onChange={(e) => setSelected(s => ({ ...s, author: e.target.value }))}
        />
      </div>
    </div>
  );
}
