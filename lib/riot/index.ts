import {
  fetchRiotAccount,
  fetchMatchIds,
  fetchMatch,
} from "./client";

export async function getRiotPlayerData(riotId: string) {
  const account = await fetchRiotAccount(riotId);

  const matchIds = await fetchMatchIds(account.puuid, 5);

  const matches = await Promise.all(
    matchIds.map((id) => fetchMatch(id))
  );

  return {
    account,
    matches,
  };
}
