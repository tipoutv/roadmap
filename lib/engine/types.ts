// Ranks Valorant
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

// Roles Valorant
export type Role =
  | "Duelist"
  | "Initiator"
  | "Controller"
  | "Sentinel";

// Agents (liste extensible)
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

// Maps
export type Map =
  | "Ascent"
  | "Bind"
  | "Haven"
  | "Split"
  | "Lotus"
  | "Breeze"
  | "Icebox"
  | "Sunset";

// Autres
export type Objective = "Climb" | "Improve";
export type TimePerDay = "30m" | "1h" | "2h+";

export type UserInput = {
  rank: Rank;
  role: Role;
  agent: Agent;
  map: Map;
  objective: Objective;
  timePerDay: TimePerDay;
};

export type Match = {
  result: "win" | "lose";
};
