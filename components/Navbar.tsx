"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!search.includes("#")) return;
    router.push(`/player/${encodeURIComponent(search)}`);
  }

  const navItem = (href: string, label: string) => (
    <Link
      href={href}
      className={`px-3 py-2 text-sm rounded-md transition-colors ${
        pathname === href
          ? "text-white"
          : "text-neutral-400 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="w-full border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-lg font-bold text-red-500 tracking-wide"
          >
            Roadmap
          </Link>

          {/* SEARCH */}
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
            <button
              type="submit"
              className="text-xs text-neutral-400 hover:text-white"
            >
              Search
            </button>
          </form>
        </div>

        {/* CENTER NAV */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItem("/", "Home")}
          {navItem("/roadmap", "Roadmap")}
          {navItem("/analyze", "Analyze")}
          {navItem("/progress", "Progress")}
          {navItem("/lfg", "LFG")}
          {navItem("/insights", "Insights")}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* PREMIUM */}
          <Link
            href="/premium"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-md bg-yellow-500/10 text-yellow-400 text-sm hover:bg-yellow-500/20 transition"
          >
            Premium
          </Link>

          {/* LOGIN / DASHBOARD */}
          <Link
            href="/dashboard"
            className="px-3 py-1.5 rounded-md bg-neutral-800 text-sm text-white hover:bg-neutral-700 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="md:hidden px-4 py-2 border-t border-neutral-800">
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-neutral-900 border border-neutral-800 rounded-md px-2"
        >
          <input
            type="text"
            placeholder="RiotID#TAG"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm text-white placeholder-neutral-500 px-2 py-2 w-full"
          />
          <button
            type="submit"
            className="text-xs text-neutral-400 hover:text-white"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
