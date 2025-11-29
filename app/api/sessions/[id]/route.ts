import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db/client";
import { mockSessions } from "../../../../lib/data/mockData";

const FALLBACK_USER_ID = "user-1";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(mockSessions[0] ?? { id: params.id });
    }
    const id = params.id;
    const body = (await req.json()) as Partial<{
      date: string;
      objective?: string;
      perceivedEffort?: string;
      moodBefore?: string;
      moodAfter?: string;
      painFlag?: boolean;
      userNote?: string;
      sets?: Array<{
        kind: string;
        reps?: number;
        distanceM?: number;
        restDistanceM?: number;
        durationSec?: number;
        targetPaceSec?: number;
        description?: string;
      }>;
    }>;

    const saved = await prisma.session.upsert({
      where: { id },
      update: {
        userId: FALLBACK_USER_ID,
        date: body.date ? new Date(body.date) : undefined,
        objective: body.objective ?? undefined,
        perceivedEffort: body.perceivedEffort ?? undefined,
        moodBefore: body.moodBefore ?? undefined,
        moodAfter: body.moodAfter ?? undefined,
        painFlag: body.painFlag ?? undefined,
        userNote: body.userNote ?? undefined
      },
      create: {
        id,
        userId: FALLBACK_USER_ID,
        date: new Date(body.date ?? new Date()),
        objective: body.objective ?? null,
        perceivedEffort: body.perceivedEffort ?? null,
        moodBefore: body.moodBefore ?? null,
        moodAfter: body.moodAfter ?? null,
        painFlag: body.painFlag ?? false,
        userNote: body.userNote ?? null
      }
    });

    if (body.sets) {
      await prisma.trainingSet.deleteMany({ where: { sessionId: saved.id } });
      for (const set of body.sets) {
        await prisma.trainingSet.create({
          data: {
            sessionId: saved.id,
            kind: set.kind,
            reps: set.reps ?? null,
            distanceM: set.distanceM ?? null,
            restDistanceM: set.restDistanceM ?? null,
            durationSec: set.durationSec ?? null,
            targetPaceSecPerKm: set.targetPaceSec ?? null,
            glowScenarioJson: set.description ?? null
          }
        });
      }
    }

    const sessionWithSets = await prisma.session.findUnique({
      where: { id: saved.id },
      include: { sets: true }
    });

    if (!sessionWithSets) {
      return NextResponse.json({ error: "not found after upsert" }, { status: 500 });
    }

    return NextResponse.json({
      id: sessionWithSets.id,
      date: sessionWithSets.date.toISOString().slice(0, 10),
      objective: sessionWithSets.objective ?? undefined,
      perceivedEffort: sessionWithSets.perceivedEffort ?? undefined,
      moodBefore: sessionWithSets.moodBefore ?? undefined,
      moodAfter: sessionWithSets.moodAfter ?? undefined,
      painFlag: sessionWithSets.painFlag ?? false,
      userNote: sessionWithSets.userNote ?? undefined,
      sets: sessionWithSets.sets.map((set) => ({
        kind: set.kind,
        reps: set.reps ?? undefined,
        distanceM: set.distanceM ?? undefined,
        restDistanceM: set.restDistanceM ?? undefined,
        durationSec: set.durationSec ?? undefined,
        targetPaceSec: set.targetPaceSecPerKm ?? undefined,
        description: set.glowScenarioJson ?? undefined
      }))
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "failed to save session" }, { status: 500 });
  }
}
