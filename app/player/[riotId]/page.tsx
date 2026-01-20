"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type RiotAccount = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

type RiotResponse = {
  account: RiotAccount;
  matches?: any[];
};

export default function PlayerPage() {
  const { riotId } = useParams<{ riotId: string }>();
  const decodedRiotId = decodeURIComponent(riotId);

  const [data, setData] = useState<RiotResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `/api/riot/player?riotId=${encodeURIComponent(decodedRiotId)}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch Riot data");
        }

        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [decodedRiotId]);

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-neutral-400">Loading Riot data…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-red-500">
          Riot API error: {error}
        </p>
      </main>
    );
  }

  if (!data || !data.account) return null;

  const matchCount = data.matches?.length ?? 0;

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-8">
      {/* HEADER */}
      <section className="border border-neutral-800 rounded-2xl p-6 bg-neutral-900/40">
        <h1 className="text-3xl font-extrabold">
          {data.account.gameName}#{data.account.tagLine}
        </h1>

        <p className="text-neutral-400 mt-1">
          PUUID: {data.account.puuid}
        </p>
      </section>

      {/* RIOT STATUS */}
      <section className="border border-neutral-800 rounded-2xl p-6 bg-neutral-900/40">
        <h2 className="text-xl font-semibold mb-2">
          Riot API status
        </h2>

        <p className="text-neutral-300">
          ✅ Riot account fetched successfully
        </p>

        {data.matches ? (
          <p className="text-neutral-300 mt-2">
            ✅ {matchCount} recent matches fetched from Riot API
          </p>
        ) : (
          <p className="text-neutral-400 mt-2">
            ℹ️ Match data not fetched yet
          </p>
        )}
      </section>

      {/* INFO */}
      <section className="border border-neutral-800 rounded-2xl p-6 bg-neutral-900/40">
        <p className="text-sm text-neutral-400">
          Riot data is currently fetched safely.
          Match analysis and AI coaching will be enabled
          once Valorant match access is confirmed.
        </p>
      </section>
    </main>
  );
}
