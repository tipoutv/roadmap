"use client";

import { useState } from "react";

export default function RoadmapForm() {
  const [data, setData] = useState<any>(null);

  async function generate() {
    const res = await fetch("/api/roadmap", {
      method: "POST",
      body: JSON.stringify({
        rank: "Silver",
        role: "Duelist",
        objective: "Climb",
        timePerDay: "1h",
      }),
    });

    setData(await res.json());
  }

  return (
    <div>
      <button onClick={generate}>Generate Roadmap</button>
      {data && (
        <ul>
          {data.plan.map((p: string, i: number) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
