"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useLfgCount } from "@/hooks/useLfgCount";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const lfgCount = useLfgCount();
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!search.includes("#")) return;
    router.push(`/player/${encodeURIComponent(search)}`);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const navItem = (
    href: string,
    label: string,
    options?: { badge?: "NEW"; count?: number }
  ) => (
    <Link
      href={href}
      className={`relative px-3 py-2 text-sm rounded-md transition-colors ${
        pathname === href
          ? "text-white"
          : "text-neutral-400 hover:text-white"
      }`}
    >
      {label}

      {options?.badge === "NEW" && (
        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-red-500 text-white">
          NEW
        </span>
      )}

      {typeof options?.count === "number" && (
        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-neutral-700 text-white">
          {options.count}
        </span>
      )}
    </Link>
  );

  return (
    <header className="w-full border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-bold text-red-500">
            Roadmap
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-neutral-900 border border-neutral-800 rounded-md px-2"
          >
            <input
              type="text"
              placeholder="RiotID#TAG"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm text-white placeholder-neutral-500 px-2 py-1 w-44"
            />
          </form>
        </div>

        {/* CENTER */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItem("/", "Home")}
          {navItem("/roadmap", "Roadmap", { badge: "NEW" })}
          {navItem("/analyze", "Analyze")}
          {navItem("/progress", "Progress")}
          {navItem("/lfg", "LFG", { count: lfgCount })}
          {navItem("/insights", "Insights")}
        </nav>

        {/* RIGHT */}
        <div className="relative">
          {!user ? (
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-md bg-neutral-800 text-white text-sm"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-neutral-800"
            >
              <img
                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.id}`}
                className="w-7 h-7 rounded-full"
                alt="avatar"
              />
            </button>
          )}

          {/* DROPDOWN */}
          {open && user && (
            <div className="absolute right-0 mt-2 w-40 rounded-md border border-neutral-800 bg-neutral-900 shadow-lg">
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-sm hover:bg-neutral-800"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-neutral-800"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
