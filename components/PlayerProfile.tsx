"use client";

import { generateRoadmap } from "../lib/engine/generateRoadmap";
import { Match, UserInput } from "../lib/engine/types";

type Props = {
  riotId: string;
  matches: Match[];
};

export default function PlayerProfile({
  riotId,
  matches,
}: Props) {
  // 🔹 TEMPORAIRE (sera remplacé par déduction Riot plus tard)
  const input: UserInput = {
    rank: "Silver",
    role: "Duelist",
    agent: "Jett",
    map: "Ascent",
    objective: "Climb",
    timePerDay: "1h",
  };

  const roadmap = generateRoadmap(input, matches);

  const wins = matches.filter((m) => m.result === "win").length;
  const winrate = matches.length
    ? Math.round((wins / matches.length) * 100)
    : 0;

  return (
    <section className="space-y-8">
      {/* HEADER */}
      <div className="border border-neutral-800 rounded-2xl p-6 bg-neutral-900/40">
        <h1 className="text-3xl font-extrabold">
          {riotId}
        </h1>
        <p className="text-neutral-400 mt-1">
          {input.rank} • {input.role} • {input.agent} • {input.map}
        </p>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-3 gap-6">
        <Stat label="Matches played" value={matches.length} />
        <Stat label="Winrate" value={`${winrate}%`} />
        <Stat label="Main focus" value={roadmap.priority} />
      </div>

      {/* ROADMAP */}
      <div className="border border-neutral-800 rounded-2xl p-6 bg-neutral-900/40">
        <h2 className="text-xl font-semibold mb-4">
          Your Roadmap
        </h2>

        <ul className="space-y-2">
          {roadmap.plan.map((step, i) => (
            <li
              key={i}
              className="p-3 rounded-lg bg-neutral-800/60"
            >
              {step}
            </li>
          ))}
        </ul>
      </div>

      {/* AI RULES */}
      <div className="border border-neutral-800 rounded-2xl p-6 bg-neutral-900/40">
        <h2 className="text-xl font-semibold mb-4">
          AI Coaching Rules
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {roadmap.rules.map((rule, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-neutral-800 bg-neutral-800/40"
            >
              <p className="font-semibold text-red-400">
                {rule.title}
              </p>
              <p className="text-sm text-neutral-400 mt-1">
                {rule.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="p-6 border border-neutral-800 rounded-2xl bg-neutral-900/40 text-center">
      <p className="text-2xl font-extrabold text-red-500">
        {value}
      </p>
      <p className="text-sm text-neutral-400 mt-1">
        {label}
      </p>
    </div>
  );
}
