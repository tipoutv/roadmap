"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signUp() {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  }

  async function signIn() {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-md border border-neutral-800 rounded-2xl p-8 bg-neutral-900/60 backdrop-blur">
        <h1 className="text-3xl font-extrabold text-center mb-2">
          Create your <span className="text-red-500">Roadmap</span>
        </h1>

        <p className="text-sm text-neutral-400 text-center mb-8">
          Track your progress. Get a plan. Climb smarter.
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            onClick={signUp}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
          >
            Create account
          </button>

          <button
            onClick={signIn}
            disabled={loading}
            className="w-full py-3 rounded-xl border border-neutral-700 hover:bg-neutral-800 transition"
          >
            Login
          </button>
        </div>

        <p className="text-sm text-neutral-400 text-center mt-6">
          By creating an account, you agree to our terms.
        </p>

        <div className="text-center mt-4">
          <Link
            href="/"
            className="text-sm text-neutral-500 hover:text-white"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
