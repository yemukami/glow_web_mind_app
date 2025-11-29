import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db/client";
import { mockSessions } from "../../../lib/data/mockData";

export async function GET() {
  try {
    const sessions = await prisma.session.findMany({
      orderBy: { date: "desc" },
      include: { sets: true }
    });
    if (!sessions.length) return NextResponse.json(mockSessions);
    return NextResponse.json(
      sessions.map((s: typeof sessions[number]) => ({
        id: s.id,
        date: s.date.toISOString().slice(0, 10),
        objective: s.objective ?? undefined,
        perceivedEffort: s.perceivedEffort ?? undefined,
        moodBefore: s.moodBefore ?? undefined,
        moodAfter: s.moodAfter ?? undefined,
        painFlag: s.painFlag ?? false,
        userNote: s.userNote ?? undefined,
        sets: s.sets.map((set: typeof s.sets[number]) => ({
          kind: set.kind,
          reps: set.reps ?? undefined,
          distanceM: set.distanceM ?? undefined,
          restDistanceM: set.restDistanceM ?? undefined,
          durationSec: set.durationSec ?? undefined,
          targetPaceSec: set.targetPaceSecPerKm ?? undefined,
          description: set.glowScenarioJson ?? undefined
        }))
      }))
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(mockSessions, { status: 200 });
  }
}
