import { RiotAccount, RiotMatch } from "./types";

const API_KEY = process.env.RIOT_API_KEY;

if (!API_KEY) {
  console.error("❌ RIOT_API_KEY is missing in .env.local");
}

const headers = {
  "X-Riot-Token": API_KEY || "",
};

// ✅ ROUTING REGION VALORANT (AMERICAS)
const RIOT_ROUTING = "https://americas.api.riotgames.com";

/* =========================
   ACCOUNT (GLOBAL)
========================= */
export async function fetchRiotAccount(
  riotId: string
): Promise<RiotAccount> {
  if (!API_KEY) {
    throw new Error("Riot API key missing");
  }

  const [gameName, tagLine] = riotId.split("#");

  const url = `${RIOT_ROUTING}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
    gameName
  )}/${encodeURIComponent(tagLine)}`;

  const res = await fetch(url, { headers });

  if (!res.ok) {
    const text = await res.text();
    console.error("RIOT ACCOUNT ERROR:", res.status, text);
    throw new Error(`Riot Account API error ${res.status}`);
  }

  return res.json();
}

/* =========================
   MATCH LIST (VALORANT)
========================= */
export async function fetchMatchIds(
  puuid: string,
  count = 5
): Promise<string[]> {
  const url = `${RIOT_ROUTING}/val/match/v1/matchlists/by-puuid/${puuid}?count=${count}`;

  const res = await fetch(url, { headers });

  if (!res.ok) {
    const text = await res.text();
    console.error("RIOT MATCH LIST ERROR:", res.status, text);
    throw new Error(`Riot MatchList API error ${res.status}`);
  }

  return res.json();
}

/* =========================
   MATCH DETAILS
========================= */
export async function fetchMatch(
  matchId: string
): Promise<RiotMatch> {
  const url = `${RIOT_ROUTING}/val/match/v1/matches/${matchId}`;

  const res = await fetch(url, { headers });

  if (!res.ok) {
    const text = await res.text();
    console.error("RIOT MATCH ERROR:", res.status, text);
    throw new Error(`Riot Match API error ${res.status}`);
  }

  return res.json();
}
