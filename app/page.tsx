"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PlayerSearchForm from "../components/PlayerSearchForm";
import { useStats } from "../components/useStats";
import AnimatedNumber from "../components/AnimatedNumber";
import { supabase } from "../lib/supabaseClient";

export default function HomePage() {
  const stats = useStats();
  const [user, setUser] = useState<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setReady(true);
    });
  }, []);

  if (!ready) return null;

  return (
    <main className="relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-black to-black" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_#ff2a2a,_transparent_60%)]" />
      <div className="absolute inset-0 bg-black/40" />

      {/* HERO */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Your Valorant{" "}
          <span className="text-red-500">Roadmap</span>{" "}
          to rank up
        </h1>

        <p className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto">
          Roadmap analyzes your performance, tracks your matches
          and builds a clear plan so you know exactly
          what to work on after every session.
        </p>

        {/* SEARCH */}
        <div className="mt-14 flex justify-center">
          <div className="w-full max-w-2xl">
            <PlayerSearchForm />
          </div>
        </div>

        {/* CTA — AUTH AWARE */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          {!user ? (
            <>
              <Link
                href="/login"
                className="px-6 py-3 border border-neutral-700 rounded-xl hover:bg-neutral-800 transition"
              >
                Login
              </Link>

              <Link
                href="/login"
                className="px-6 py-3 bg-red-600 rounded-xl hover:bg-red-700 transition font-semibold"
              >
                Create free account
              </Link>
            </>
          ) : (
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-red-600 rounded-xl hover:bg-red-700 transition font-semibold"
            >
              Go to dashboard
            </Link>
          )}
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 bg-black border-t border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <Stat label="Players tracked" value={stats.players} />
          <Stat label="Matches analyzed" value={stats.matches} />
          <Stat label="Roadmaps generated" value={stats.roadmaps} />
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="relative z-10 border-t border-neutral-800 bg-black">
        <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-8 text-center">
          <Feature
            title="Clear progression"
            desc="Know exactly what to improve after each session."
          />
          <Feature
            title="Adaptive coaching"
            desc="Your roadmap evolves based on your real results."
          />
          <Feature
            title="No guesswork"
            desc="Stop grinding blindly. Play with a plan."
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-800 bg-black py-8 text-center text-sm text-neutral-500">
        © Roadmap — Not affiliated with Riot Games
      </footer>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-6 border border-neutral-800 rounded-2xl bg-neutral-900/50 backdrop-blur">
      <p className="text-3xl font-extrabold text-red-500">
        <AnimatedNumber value={value} />
      </p>
      <p className="text-sm text-neutral-400 mt-1">
        {label}
      </p>
    </div>
  );
}

function Feature({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="p-6 border border-neutral-800 rounded-2xl bg-neutral-900/40 backdrop-blur">
      <h3 className="text-lg font-semibold mb-2">
        {title}
      </h3>
      <p className="text-neutral-400 text-sm">
        {desc}
      </p>
    </div>
  );
}
