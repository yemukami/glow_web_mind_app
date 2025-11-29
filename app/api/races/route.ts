import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db/client";
import { mockRaces } from "../../../lib/data/mockData";

const FALLBACK_USER_ID = "user-1";

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(mockRaces);
    }
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

export async function POST(req: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(mockRaces[0], { status: 200 });
    }
    const body = (await req.json()) as {
      id: string;
      date: string;
      name: string;
      type: string;
      importance: string;
      event?: string;
      memo?: string;
    };
    const saved = await prisma.race.create({
      data: {
        id: body.id,
        userId: FALLBACK_USER_ID,
        date: new Date(body.date),
        name: body.name,
        type: body.type,
        importance: body.importance,
        event: body.event ?? null,
        memo: body.memo ?? null
      }
    });
    return NextResponse.json({
      id: saved.id,
      date: saved.date.toISOString().slice(0, 10),
      name: saved.name,
      type: saved.type,
      importance: saved.importance,
      event: saved.event ?? undefined,
      memo: saved.memo ?? undefined
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "failed to create race" }, { status: 500 });
  }
}
