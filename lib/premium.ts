import { supabase } from "./supabaseClient";

export async function isPremiumUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data } = await supabase
    .from("premium_users")
    .select("user_id")
    .eq("user_id", user.id)
    .single();

  return !!data;
}
