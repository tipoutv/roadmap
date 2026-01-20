import { supabase } from "./supabaseClient";

export async function getOrCreatePlayer(riotId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  // check exist
  const { data: existing } = await supabase
    .from("players")
    .select("*")
    .eq("riot_id", riotId)
    .single();

  if (existing) return existing;

  // create
  const { data } = await supabase
    .from("players")
    .insert({
      riot_id: riotId,
      user_id: user.id,
    })
    .select()
    .single();

  return data;
}

export async function addMatch(playerId: string, result: "win" | "lose") {
  await supabase.from("matches").insert({
    player_id: playerId,
    result,
  });
}

export async function getMatches(playerId: string) {
  const { data } = await supabase
    .from("matches")
    .select("*")
    .eq("player_id", playerId)
    .order("created_at", { ascending: false });

  return data ?? [];
}
