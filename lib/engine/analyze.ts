import { PlayerData } from "../data/types";
import { Analysis, Agent, Map } from "./types";

/**
 * Normalise n'importe quel MatchResult en "win" | "lose"
 * -> safe pour mock, Riot, DB, futur changement
 */
function normalizeResult(result: unknown): "win" | "lose" | null {
  if (typeof result === "string") {
    const r = result.toLowerCase();

    if (r.includes("win") || r.includes("victory")) return "win";
    if (r.includes("lose") || r.includes("loss") || r.includes("defeat"))
      return "lose";
  }

  if (typeof result === "number") {
    // exemple : 1 = win, 0 = lose
    return result === 1 ? "win" : "lose";
  }

  return null;
}

export function analyzePlayer(data: PlayerData): Analysis {
  const matches = data.matches;

  const wins = matches.filter(
    (m) => normalizeResult(m.result) === "win"
  ).length;

  const winrate = matches.length
    ? Math.round((wins / matches.length) * 100)
    : 0;

  const agentCount: Partial<Record<Agent, number>> = {};
  const mapLosses: Partial<Record<Map, number>> = {};

  let totalKills = 0;
  let totalDeaths = 0;

  for (const m of matches) {
    const result = normalizeResult(m.result);

    if (m.agent) {
      const agent = m.agent as Agent;
      agentCount[agent] = (agentCount[agent] || 0) + 1;
    }

    if (m.map && result === "lose") {
      const map = m.map as Map;
      mapLosses[map] = (mapLosses[map] || 0) + 1;
    }

    totalKills += m.kills ?? 0;
    totalDeaths += m.deaths ?? 0;
  }

  const mainAgent =
    (Object.entries(agentCount)
      .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))[0]?.[0] as Agent) ?? null;

  const worstMap =
    (Object.entries(mapLosses)
      .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))[0]?.[0] as Map) ?? null;

  const avgKDA = totalDeaths
    ? Number((totalKills / totalDeaths).toFixed(2))
    : 0;

  return {
    winrate,
    mainAgent,
    worstMap,
    avgKDA,
  };
}
