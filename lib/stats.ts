import { supabase } from "./supabaseClient";

export async function getStats() {
  const { data } = await supabase.from("stats").select("*");
  return data ?? [];
}

export async function incrementStat(
  id: "players" | "matches" | "roadmaps",
  amount = 1
) {
  await supabase.rpc("increment_stat", {
    stat_id: id,
    inc: amount,
  });
}
