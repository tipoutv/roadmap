import { NextResponse } from "next/server";
import { fetchRiotAccount } from "../../../../lib/riot/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const riotId = searchParams.get("riotId");

  if (!riotId) {
    return NextResponse.json(
      { error: "Missing riotId" },
      { status: 400 }
    );
  }

  try {
    const account = await fetchRiotAccount(riotId);
    return NextResponse.json({ account });
  } catch (err: any) {
    console.error("RIOT ACCOUNT TEST ERROR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
