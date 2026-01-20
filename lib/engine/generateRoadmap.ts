import { UserInput, Match } from "./types";
import {
  rankRules,
  roleRules,
  agentRules,
  mapRules,
} from "./rules";

/* =======================
   TYPES DE SORTIE
======================= */

export type RoadmapRule = {
  category: string;
  text: string;
};

export type RoadmapStep = {
  title: string;
  description: string;
  frequency: string;
  premium?: boolean;
};

export type RoadmapResult = {
  priority: "Aim & basics" | "Consistency" | "Clutch & decision making" | "Mental reset";
  winrate: number;
  steps: RoadmapStep[];
  rules: RoadmapRule[];
};

/* =======================
   GENERATE ROADMAP (IA)
======================= */

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

  /* =======================
     PRIORITÉ GLOBALE
  ======================= */

  let priority: RoadmapResult["priority"] = "Aim & basics";

  if (winrate > 0.55) priority = "Clutch & decision making";
  else if (winrate > 0.45) priority = "Consistency";

  /* =======================
     RESET MENTAL (CAS FORT)
  ======================= */

  if (losingStreak) {
    return {
      priority: "Mental reset",
      winrate: Math.round(winrate * 100),
      steps: [
        {
          title: "Stop ranked",
          description: "Do not queue ranked for the rest of the day",
          frequency: "Today only",
        },
        {
          title: "Review losses",
          description: "Review the last 2 lost games and identify mistakes",
          frequency: "Once",
        },
        {
          title: "Deathmatch only",
          description: "Play deathmatch to reset mechanics and confidence",
          frequency: "30–45 min",
        },
      ],
      rules: [],
    };
  }

  /* =======================
     RÈGLES IA (CONSEILS)
  ======================= */

  const rules: RoadmapRule[] = [
    ...rankRules(input.rank).map((r) => ({
      category: "Rank",
      text: r,
    })),
    ...roleRules(input.role).map((r) => ({
      category: "Role",
      text: r,
    })),
    ...agentRules(input.agent).map((r) => ({
      category: "Agent",
      text: r,
    })),
    ...mapRules(input.map).map((r) => ({
      category: "Map",
      text: r,
    })),
  ];

  /* =======================
     PLAN D’ENTRAÎNEMENT
  ======================= */

  const steps: RoadmapStep[] = [];

  if (priority === "Aim & basics") {
    steps.push(
      {
        title: "Aim training",
        description: "Focused aim routine (tracking + flicks)",
        frequency: "20 minutes / day",
      },
      {
        title: "Deathmatch",
        description: "Focus on crosshair placement and clean peeks",
        frequency: "1 game / day",
      },
      {
        title: "Ranked discipline",
        description: "Limit ranked to 2 games to avoid fatigue",
        frequency: "Every session",
      }
    );
  }

  if (priority === "Consistency") {
    steps.push(
      {
        title: "Structured warmup",
        description: "Aim routine + movement warmup",
        frequency: "15 minutes",
      },
      {
        title: "Smart peeks",
        description: "Avoid ego peeks and play trade setups",
        frequency: "Every game",
      },
      {
        title: "Ranked sessions",
        description: "Play 2–3 focused ranked games only",
        frequency: "Per session",
      }
    );
  }

  if (priority === "Clutch & decision making") {
    steps.push(
      {
        title: "Clutch review",
        description: "Review one clutch situation from your last games",
        frequency: "After session",
      },
      {
        title: "Utility mastery",
        description: "Practice ability usage and timing",
        frequency: "15 minutes",
      },
      {
        title: "Ranked push",
        description: "Play up to 3 ranked games max",
        frequency: "Per session",
      },
      {
        title: "Advanced analysis",
        description: "AI breakdown of deaths, timings and positioning",
        frequency: "Weekly",
        premium: true,
      }
    );
  }

  return {
    priority,
    winrate: Math.round(winrate * 100),
    steps,
    rules,
  };
}
