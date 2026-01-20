import { NextResponse } from "next/server";
import { getStats } from "../../../lib/stats";

export async function GET() {
  const stats = await getStats();

  const result = {
    players: 0,
    matches: 0,
    roadmaps: 0,
  };

  stats.forEach((s) => {
    result[s.id as keyof typeof result] = Number(s.value);
  });

  return NextResponse.json(result);
}
