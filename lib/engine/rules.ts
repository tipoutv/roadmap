import { Rank, Role, Agent, Map } from "./types";

export type Rule = {
  source: "rank" | "role" | "agent" | "map";
  title: string;
  description: string;
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
          description: "Create space first, but avoid ego peeks.",
        },
      ];

    case "Initiator":
      return [
        {
          source: "role",
          title: "Utility before fights",
          description: "Use flashes or info before committing.",
        },
      ];

    case "Controller":
      return [
        {
          source: "role",
          title: "Smoke timing",
          description: "Smokes should land before contact.",
        },
      ];

    case "Sentinel":
      return [
        {
          source: "role",
          title: "Hold space",
          description: "Play time and deny map control.",
        },
      ];
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
        description: "Crosshair placement and positioning matter more than aim.",
      },
    ];
  }

  if (rank === "Silver" || rank === "Gold") {
    return [
      {
        source: "rank",
        title: "Reduce mistakes",
        description: "Stop dry peeking and overextending.",
      },
    ];
  }

  return [
    {
      source: "rank",
      title: "Decision making",
      description: "Play the round, not the duel.",
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
          title: "Entry with dash",
          description: "Dash after contact, not before.",
        },
      ];

    case "Omen":
      return [
        {
          source: "agent",
          title: "Creative smokes",
          description: "Use one-ways and off-angle smokes.",
        },
      ];

    case "Sova":
      return [
        {
          source: "agent",
          title: "Info timing",
          description: "Drone and dart before pushing.",
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
          description: "Control mid before committing to a site.",
        },
      ];

    case "Bind":
      return [
        {
          source: "map",
          title: "Teleport awareness",
          description: "Track rotations using teleport sounds.",
        },
      ];

    case "Haven":
      return [
        {
          source: "map",
          title: "Rotate discipline",
          description: "Avoid over-rotating early.",
        },
      ];

    default:
      return [];
  }
}
