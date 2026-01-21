import { supabase } from "../supabaseClient";

export async function getLfgCount(): Promise<number> {
  const { count, error } = await supabase
    .from("lfg_posts")
    .select("*", { count: "exact", head: true })
    .eq("active", true);

  if (error) {
    console.error("LFG count error:", error);
    return 0;
  }

  return count ?? 0;
}
