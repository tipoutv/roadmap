"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { isPremiumUser } from "../lib/premium";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [premium, setPremium] = useState(false);
  const [ready, setReady] = useState(false); // 🔥 clé du fix
  const router = useRouter();

  useEffect(() => {
    // session initiale
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);

      if (data.session?.user) {
        isPremiumUser().then(setPremium);
      }

      setReady(true); // ✅ auth chargée
    });

    // écoute changements
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);

        if (session?.user) {
          isPremiumUser().then(setPremium);
        } else {
          setPremium(false);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  // ⛔ IMPORTANT : on ne render RIEN tant que Supabase n’a pas répondu
  if (!ready) return null;

  return (
    <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="text-xl font-extrabold tracking-wide">
          <span className="text-red-500">Road</span>map
        </Link>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className="text-neutral-300 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                href="/login"
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold"
              >
                Create account
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="text-neutral-300 hover:text-white transition"
              >
                Dashboard
              </Link>

              {premium && (
                <span className="px-2 py-0.5 text-xs font-semibold rounded border border-yellow-500/30 bg-yellow-500/10 text-yellow-400">
                  PREMIUM
                </span>
              )}

              <button
                onClick={logout}
                className="px-4 py-1.5 rounded-lg border border-neutral-700 hover:bg-neutral-800 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
