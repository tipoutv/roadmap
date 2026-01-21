"use client";

import { useEffect, useState } from "react";

export type LfgPost = {
  id: string;
  riot_id: string;
  rank: string;
  role: string;
  message: string;
  created_at: string;
};

export function useLfg() {
  const [posts, setPosts] = useState<LfgPost[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPosts() {
    const res = await fetch("/api/lfg");
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  }

  async function createPost(post: Partial<LfgPost>) {
    await fetch("/api/lfg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    fetchPosts();
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, createPost };
}
