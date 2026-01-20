import { Analysis } from "./types";
import { Rank } from "./types";

const rankBaseScore: Record<Rank, number> = {
  Iron: 20,
  Bronze: 30,
  Silver: 40,
  Gold: 50,
  Platinum: 60,
  Diamond: 70,
  Ascendant: 80,
  Immortal: 90,
  Radiant: 95,
};

export function computeIAScore(
  analysis: Analysis,
  rank: Rank
): number {
  let score = 0;

  // Base rank
  score += rankBaseScore[rank] * 0.3;

  // Winrate (0–100)
  score += analysis.winrate * 0.4;

  // KDA (cap à 2.0)
  const kdaScore = Math.min(analysis.avgKDA / 2, 1) * 100;
  score += kdaScore * 0.3;

  return Math.round(Math.min(score, 100));
}
