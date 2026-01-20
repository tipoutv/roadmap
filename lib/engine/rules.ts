import { Rank, Role, Agent, Map } from "./types";

/* =======================
   TYPE DE RÈGLE IA
======================= */

export type Rule = {
  source: "rank" | "role" | "agent" | "map";
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  premium?: boolean;
};

/* =======================
   RÈGLES PAR ROLE
======================= */

export function roleRules(role: Role): Rule[] {
  switch (role) {
    case "Duelist":
      return [
        {
          source: "role",
          title: "Entry discipline",
          description: "Create space first, avoid ego peeks and dry entries.",
          severity: "high",
        },
      ];

    case "Initiator":
      return [
        {
          source: "role",
          title: "Utility before fights",
          description: "Use flashes or info-gathering utility before committing.",
          severity: "high",
        },
      ];

    case "Controller":
      return [
        {
          source: "role",
          title: "Smoke timing",
          description: "Smokes should land before contact and deny vision early.",
          severity: "medium",
        },
      ];

    case "Sentinel":
      return [
        {
          source: "role",
          title: "Hold space",
          description: "Play time, hold angles and deny map control.",
          severity: "medium",
        },
      ];

    default:
      return [];
  }
}

/* =======================
   RÈGLES PAR RANK
======================= */

export function rankRules(rank: Rank): Rule[] {
  if (rank === "Iron" || rank === "Bronze") {
    return [
      {
        source: "rank",
        title: "Fundamentals first",
        description: "Focus on crosshair placement and basic positioning.",
        severity: "high",
      },
    ];
  }

  if (rank === "Silver" || rank === "Gold") {
    return [
      {
        source: "rank",
        title: "Reduce mistakes",
        description: "Avoid dry peeks, overextending and unnecessary fights.",
        severity: "medium",
      },
    ];
  }

  return [
    {
      source: "rank",
      title: "Decision making",
      description: "Play the round objective instead of hunting kills.",
      severity: "low",
    },
  ];
}

/* =======================
   RÈGLES PAR AGENT
======================= */

export function agentRules(agent: Agent): Rule[] {
  switch (agent) {
    case "Jett":
      return [
        {
          source: "agent",
          title: "Dash discipline",
          description: "Dash after first contact, not blindly into site.",
          severity: "high",
        },
      ];

    case "Omen":
      return [
        {
          source: "agent",
          title: "Creative smokes",
          description: "Use one-ways and off-angle smokes to create advantage.",
          severity: "medium",
          premium: true,
        },
      ];

    case "Sova":
      return [
        {
          source: "agent",
          title: "Info timing",
          description: "Use drone and recon before pushing or retaking.",
          severity: "high",
        },
      ];

    default:
      return [];
  }
}

/* =======================
   RÈGLES PAR MAP
======================= */

export function mapRules(map: Map): Rule[] {
  switch (map) {
    case "Ascent":
      return [
        {
          source: "map",
          title: "Mid control",
          description: "Fight for mid control before committing to a site.",
          severity: "medium",
        },
      ];

    case "Bind":
      return [
        {
          source: "map",
          title: "Teleport awareness",
          description: "Track rotations using teleport sounds and timings.",
          severity: "medium",
        },
      ];

    case "Haven":
      return [
        {
          source: "map",
          title: "Rotate discipline",
          description: "Avoid over-rotating early and losing site control.",
          severity: "medium",
        },
      ];

    default:
      return [];
  }
}
