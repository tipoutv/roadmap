"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addProfile } from "../../../lib/profiles";

export default function AddPlayerPage() {
  const [riotId, setRiotId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!riotId.includes("#")) {
      setError("Invalid Riot ID format");
      return;
    }

    try {
      await addProfile(riotId);
      router.push(`/player/${encodeURIComponent(riotId)}`);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-neutral-800 rounded-2xl p-8 bg-neutral-900/60">
        <h1 className="text-2xl font-extrabold mb-2">
          Add a player
        </h1>

        <p className="text-sm text-neutral-400 mb-6">
          Link your Valorant account to your Roadmap profile.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <input
            value={riotId}
            onChange={(e) => setRiotId(e.target.value)}
            placeholder="RiotID#TAG"
            className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 outline-none"
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button className="w-full py-3 bg-red-600 rounded-xl hover:bg-red-700 font-semibold">
            Add player
          </button>
        </form>
      </div>
    </main>
  );
}
