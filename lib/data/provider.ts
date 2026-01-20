import { mockPlayer } from "./mock";
import { PlayerData } from "./types";

const USE_MOCK = true; // ← plus tard: process.env.USE_MOCK === "true"

export async function getPlayerData(
  riotId: string
): Promise<PlayerData> {
  if (USE_MOCK) {
    return mockPlayer;
  }

  // plus tard:
  // return getPlayerFromRiot(riotId);

  throw new Error("Riot provider not enabled");
}
