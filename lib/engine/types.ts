/* =======================
   RANKS VALORANT
======================= */
export type Rank =
  | "Iron"
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Diamond"
  | "Ascendant"
  | "Immortal"
  | "Radiant";

/* =======================
   ROLES VALORANT
======================= */
export type Role =
  | "Duelist"
  | "Initiator"
  | "Controller"
  | "Sentinel";

/* =======================
   AGENTS (EXTENSIBLE)
======================= */
export type Agent =
  | "Jett"
  | "Reyna"
  | "Phoenix"
  | "Raze"
  | "Sova"
  | "Skye"
  | "Brimstone"
  | "Omen"
  | "Viper"
  | "Cypher"
  | "Killjoy"
  | "Sage";

/* =======================
   MAPS
======================= */
export type Map =
  | "Ascent"
  | "Bind"
  | "Haven"
  | "Split"
  | "Lotus"
  | "Breeze"
  | "Icebox"
  | "Sunset";

/* =======================
   OBJECTIFS & TEMPS
======================= */
export type Objective = "Climb" | "Improve";
export type TimePerDay = "30m" | "1h" | "2h+";

/* =======================
   INPUT UTILISATEUR (IA)
======================= */
export type UserInput = {
  rank: Rank;
  role: Role;
  agent: Agent;
  map: Map;
  objective: Objective;
  timePerDay: TimePerDay;
};

/* =======================
   MATCH (MOCK / RIOT)
======================= */
export type Match = {
  result: "win" | "lose";

  // Champs optionnels (mock-friendly & Riot-ready)
  kills?: number;
  deaths?: number;
  agent?: Agent;
  map?: Map;
};

/* =======================
   ANALYSE IA (SORTIE)
======================= */
export type Analysis = {
  winrate: number;           // %
  mainAgent: Agent | null;
  worstMap: Map | null;
  avgKDA: number;
};

/* =======================
   RÈGLES IA (COACHING)
======================= */
export type Rule = {
  source: "rank" | "role" | "agent" | "map";
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  premium?: boolean;
};

/* =======================
   ROADMAP IA (UI)
======================= */
export type RoadmapStep = {
  title: string;
  description: string;
  frequency: string;
  premium?: boolean;
};

export type RoadmapResult = {
  priority:
    | "Aim & basics"
    | "Consistency"
    | "Clutch & decision making"
    | "Mental reset";

  winrate: number;
  level: "low" | "mid" | "high";
  focus: string;

  steps: RoadmapStep[];
  rules: Rule[];
};
