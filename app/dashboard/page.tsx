"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProfiles } from "../../lib/profiles";
import { useAuth } from "../../components/useAuth";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    getProfiles().then(setProfiles);
  }, [user]);

  if (loading) return null;

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold">
          Your players
        </h1>

        <Link
          href="/player/add"
          className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
        >
          + Add player
        </Link>
      </div>

      {profiles.length === 0 ? (
        <p className="text-neutral-400">
          No player linked yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {profiles.map((p) => (
            <Link
              key={p.id}
              href={`/player/${encodeURIComponent(p.riot_id)}`}
              className="p-6 border border-neutral-800 rounded-2xl bg-neutral-900/40 hover:border-red-500 transition"
            >
              <h3 className="text-xl font-bold">
                {p.riot_id}
              </h3>
              <p className="text-sm text-neutral-400">
                Linked account
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
