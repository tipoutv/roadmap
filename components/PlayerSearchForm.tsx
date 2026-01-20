"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PlayerSearchForm() {
  const router = useRouter();
  const [riotId, setRiotId] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!riotId.includes("#")) return;
    router.push(`/player/${encodeURIComponent(riotId)}`);
  }

  return (
    <form
      onSubmit={submit}
      className="flex items-center bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-xl"
    >
      <input
        value={riotId}
        onChange={(e) => setRiotId(e.target.value)}
        placeholder="RiotID#TAG (ex: TenZ#NA1)"
        className="flex-1 px-5 py-4 bg-transparent outline-none text-white placeholder-neutral-500"
      />

      <button className="px-6 py-4 bg-red-600 hover:bg-red-700 transition font-semibold">
        Search
      </button>
    </form>
  );
}
