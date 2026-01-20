import { PlayerData } from "../data/types";
import { Analysis, Agent, Map } from "./types";

export function analyzePlayer(data: PlayerData): Analysis {
  const matches = data.matches;

  const wins = matches.filter((m) => m.result === "win").length;
  const winrate = Math.round((wins / matches.length) * 100);

  const agentCount: Partial<Record<Agent, number>> = {};
  const mapLosses: Partial<Record<Map, number>> = {};

  let totalKills = 0;
  let totalDeaths = 0;

  for (const m of matches) {
    if (m.agent) {
      agentCount[m.agent] = (agentCount[m.agent] || 0) + 1;
    }

    if (m.map && m.result === "lose") {
      mapLosses[m.map] = (mapLosses[m.map] || 0) + 1;
    }

    totalKills += m.kills || 0;
    totalDeaths += m.deaths || 0;
  }

  const mainAgent =
    (Object.entries(agentCount).sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))[0]?.[0] as Agent) ??
    null;

  const worstMap =
    (Object.entries(mapLosses).sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))[0]?.[0] as Map) ??
    null;

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
