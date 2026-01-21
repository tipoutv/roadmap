"use client";

import { useState } from "react";
import { useLfg } from "@/hooks/useLfg";
import LfgCard from "@/components/LfgCard";

export default function LfgPage() {
  const { posts, loading, createPost } = useLfg();
  const [riotId, setRiotId] = useState("");
  const [rank, setRank] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  function submit() {
    if (!riotId || !rank || !role) return;

    createPost({
      riot_id: riotId,
      rank,
      role,
      message,
    });

    setMessage("");
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold">Looking For Group</h1>

      {/* CREATE POST */}
      <div className="border border-neutral-800 rounded-lg p-4 bg-neutral-900 space-y-3">
        <input
          placeholder="RiotID#TAG"
          value={riotId}
          onChange={(e) => setRiotId(e.target.value)}
          className="w-full bg-neutral-800 p-2 rounded text-white"
        />

        <div className="flex gap-2">
          <input
            placeholder="Rank"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            className="w-full bg-neutral-800 p-2 rounded text-white"
          />
          <input
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-neutral-800 p-2 rounded text-white"
          />
        </div>

        <textarea
          placeholder="Message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-neutral-800 p-2 rounded text-white"
        />

        <button
          onClick={submit}
          className="px-4 py-2 rounded bg-red-500 text-white"
        >
          Post LFG
        </button>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-4">
        {loading ? (
          <p className="text-neutral-400">Loading...</p>
        ) : (
          posts.map((post) => (
            <LfgCard key={post.id} post={post} />
          ))
        )}
      </div>
    </main>
  );
}
