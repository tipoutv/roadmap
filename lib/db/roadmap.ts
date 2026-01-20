import { supabase } from "../supabaseClient";
import { RoadmapResult } from "../engine/types";

export async function saveRoadmap({
  playerId,
  roadmap,
  iaScore,
}: {
  playerId: string;
  roadmap: RoadmapResult;
  iaScore: number;
}) {
  const { error } = await supabase.from("roadmaps").insert({
    player_id: playerId,
    priority: roadmap.priority,
    level: roadmap.level,
    ia_score: iaScore,
    data: roadmap,
  });

  if (error) {
    console.error("Supabase saveRoadmap error:", error);
    throw error;
  }
}
