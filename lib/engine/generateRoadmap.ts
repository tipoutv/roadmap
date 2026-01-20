import { UserInput, Match } from "./types";
import {
  rankRules,
  roleRules,
  agentRules,
  mapRules,
} from "./rules";

export function generateRoadmap(
  input: UserInput,
  matches: Match[] = []
) {
  const total = matches.length;
  const wins = matches.filter((m) => m.result === "win").length;
  const winrate = total ? wins / total : 0;

  const lastFive = matches.slice(0, 5);
  const losingStreak =
    lastFive.filter((m) => m.result === "lose").length >= 3;

  /* =======================
     PRIORITÉ GLOBALE
  ======================= */
  let priority = "Aim & basics";

  if (winrate > 0.55) priority = "Clutch & decision making";
  else if (winrate > 0.45) priority = "Consistency";

  /* =======================
     RESET MENTAL
  ======================= */
  if (losingStreak) {
    return {
      priority: "Mental reset",
      winrate: Math.round(winrate * 100),
      plan: [
        "Stop ranked for today",
        "Review last 2 lost games",
        "Play deathmatch only",
      ],
      rules: [],
    };
  }

  /* =======================
     RÈGLES IA
  ======================= */
  const rules = [
    ...rankRules(input.rank),
    ...roleRules(input.role),
    ...agentRules(input.agent),
    ...mapRules(input.map),
  ];

  /* =======================
     PLAN D’ENTRAÎNEMENT
  ======================= */
  const plan: string[] = [];

  if (priority === "Aim & basics") {
    plan.push("20 min aim training");
    plan.push("1 deathmatch focusing crosshair placement");
    plan.push("2 ranked games max");
  }

  if (priority === "Consistency") {
    plan.push("Warmup routine (15 min)");
    plan.push("Avoid ego peeks");
    plan.push("2–3 ranked games");
  }

  if (priority === "Clutch & decision making") {
    plan.push("VOD review 1 clutch situation");
    plan.push("Utility usage practice");
    plan.push("3 ranked games max");
  }

  return {
    priority,
    winrate: Math.round(winrate * 100),
    plan,
    rules,
  };
}
