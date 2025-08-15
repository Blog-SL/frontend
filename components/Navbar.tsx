'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import clsx from "clsx";

const tabs = [
  {href: "/", label: "Home"},
  { href: "/allBlogs", label: "All Blogs" },
  { href: "/create", label: "Create" },
  { href: "/saved", label: "Saved" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

const isActive = (href: string) => {
  if (!pathname) return false; 
  return href === "/"
    ? pathname === "/"
    : pathname.startsWith(href);
};


  return (
    <header className="border-b border-neutral-800 sticky top-0 z-50 bg-neutral-900/60 backdrop-blur">
      <nav className="container flex items-center justify-between py-3">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-neutral-300">Blog</span>
          <span className="text-brand">Verse</span>
        </Link>

        <div className="flex items-center gap-2">
          {tabs.map(t => (
            <Link
              key={t.href}
              href={t.href}
              className={clsx(
                "btn btn-outline",
                isActive(t.href) && "border-brand text-brand shadow-[0_0_0_2px_rgba(59,130,246,0.2)]"
              )}
            >
              {t.label}
            </Link>
          ))}

          {!session && (
            <>
              <Link href="/login" className={clsx("btn btn-outline", isActive("/login") && "border-brand text-brand")}>Login</Link>
              <Link href="/register" className={clsx("btn btn-primary", isActive("/register") && "ring-2 ring-brand/40")}>Register</Link>
            </>
          )}

          {session && (
            <>
              <Link href="/profile" className={clsx("btn btn-outline", isActive("/profile") && "border-brand text-brand")}>Profile</Link>
              <button
                className="btn btn-primary"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
