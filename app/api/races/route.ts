import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db/client";
import { mockRaces } from "../../../lib/data/mockData";

export async function GET() {
  try {
    const races = await prisma.race.findMany({ orderBy: { date: "asc" } });
    if (!races.length) return NextResponse.json(mockRaces);
    return NextResponse.json(
      races.map((r: typeof races[number]) => ({
        id: r.id,
        date: r.date.toISOString().slice(0, 10),
        name: r.name,
        type: r.type,
        importance: r.importance,
        event: r.event ?? undefined,
        memo: r.memo ?? undefined
      }))
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(mockRaces, { status: 200 });
  }
}
