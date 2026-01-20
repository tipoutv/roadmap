import { supabase } from "./supabaseClient";

export async function getProfiles() {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function addProfile(riotId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("profiles")
    .insert({
      riot_id: riotId,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
