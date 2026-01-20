import { UserInput, Match, Rule, RoadmapResult } from "./types";
import {
  rankRules,
  roleRules,
  agentRules,
  mapRules,
} from "./rules";

export function generateRoadmap(
  input: UserInput,
  matches: Match[] = []
): RoadmapResult {
  const total = matches.length;
  const wins = matches.filter((m) => m.result === "win").length;
  const winrate = total ? wins / total : 0;

  const lastFive = matches.slice(0, 5);
  const losingStreak =
    lastFive.filter((m) => m.result === "lose").length >= 3;

  let priority: RoadmapResult["priority"] = "Aim & basics";

  if (winrate > 0.55) priority = "Clutch & decision making";
  else if (winrate > 0.45) priority = "Consistency";

  /* ===== RESET MENTAL ===== */
  if (losingStreak) {
    return {
      priority: "Mental reset",
      winrate: Math.round(winrate * 100),
      level: "low",
      focus: "Mental",
      steps: [
        {
          title: "Mental reset",
          description: "Stop ranked and focus on review only",
          frequency: "Today",
        },
      ],
      rules: [],
    };
  }

  /* ===== RULES IA ===== */
  const rules: Rule[] = [
    ...rankRules(input.rank),
    ...roleRules(input.role),
    ...agentRules(input.agent),
    ...mapRules(input.map),
  ];

  /* ===== ROADMAP ===== */
  const steps = [];

  if (priority === "Aim & basics") {
    steps.push({
      title: "Aim routine",
      description: "Train crosshair placement and mechanics",
      frequency: "20 min / day",
    });
  }

  if (priority === "Consistency") {
    steps.push({
      title: "Consistency focus",
      description: "Reduce mistakes and bad peeks",
      frequency: "Each session",
    });
  }

  if (priority === "Clutch & decision making") {
    steps.push({
      title: "Decision making",
      description: "Review clutches and utility usage",
      frequency: "3x / week",
      premium: true,
    });
  }

  return {
    priority,
    winrate: Math.round(winrate * 100),
    level: winrate > 55 ? "high" : winrate > 45 ? "mid" : "low",
    focus: priority,
    steps,
    rules,
  };
}
