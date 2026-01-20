import { NextResponse } from "next/server";
import { generateRoadmap } from "@/lib/engine/generateRoadmap";
import { UserInput } from "@/lib/engine/types";

export async function POST(req: Request) {
  try {
    const body: UserInput = await req.json();
    const roadmap = generateRoadmap(body);
    return NextResponse.json(roadmap);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to generate roadmap" },
      { status: 400 }
    );
  }
}
