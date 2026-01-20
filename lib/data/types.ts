export type MatchResult = "win" | "loss";

export type Match = {
  id: string;
  map: string;
  agent: string;
  result: MatchResult;
  kills: number;
  deaths: number;
};

export type PlayerData = {
  riotId: string;
  rank: string;
  matches: Match[];
};
