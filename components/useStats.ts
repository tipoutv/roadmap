"use client";

import { useEffect, useState } from "react";

export function useStats() {
  const [stats, setStats] = useState({
    players: 400,
    matches: 892,
    roadmaps: 310,
  });

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  return stats;
}
