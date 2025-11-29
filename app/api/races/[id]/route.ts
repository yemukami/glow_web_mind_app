import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db/client";
import { mockRaces } from "../../../../lib/data/mockData";

const FALLBACK_USER_ID = "user-1";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(mockRaces[0], { status: 200 });
    }
    const id = params.id;
    const body = (await req.json()) as Partial<{
      date: string;
      name: string;
      type: string;
      importance: string;
      event?: string;
      memo?: string;
    }>;

    const saved = await prisma.race.upsert({
      where: { id },
      update: {
        userId: FALLBACK_USER_ID,
        date: body.date ? new Date(body.date) : undefined,
        name: body.name ?? undefined,
        type: body.type ?? undefined,
        importance: body.importance ?? undefined,
        event: body.event ?? null,
        memo: body.memo ?? null
      },
      create: {
        id,
        userId: FALLBACK_USER_ID,
        date: new Date(body.date ?? new Date()),
        name: body.name ?? "Untitled",
        type: body.type ?? "race",
        importance: body.importance ?? "C",
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
    return NextResponse.json({ error: "failed to save race" }, { status: 500 });
  }
}
