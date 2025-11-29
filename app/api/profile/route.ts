import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db/client";
import { mockProfile } from "../../../lib/data/mockData";

const FALLBACK_USER_ID = "user-1";

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(mockProfile);
    }
    const u = await prisma.user.findFirst();
    if (!u) {
      return NextResponse.json(mockProfile);
    }
    return NextResponse.json({
      id: u.id,
      nickname: u.nickname,
      ageGroup: u.ageGroup,
      mainEvents: u.mainEvents.split(",").map((s: string) => s.trim()),
      trainingStyle: u.trainingStyle,
      hasCoach: u.hasCoach,
      weeklyTargetMinutes: u.weeklyTargetMinutes ?? undefined
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(mockProfile, { status: 200 });
  }
}

export async function PATCH(req: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(mockProfile);
    }
    const body = (await req.json()) as Partial<{
      nickname: string;
      ageGroup: string;
      mainEvents: string[];
      trainingStyle: string;
      hasCoach: boolean;
      weeklyTargetMinutes: number | null;
    }>;

    const mainEvents = body.mainEvents?.join(",") ?? undefined;
    const data = {
      nickname: body.nickname,
      ageGroup: body.ageGroup,
      mainEvents,
      trainingStyle: body.trainingStyle,
      hasCoach: body.hasCoach,
      weeklyTargetMinutes: body.weeklyTargetMinutes
    };

    const saved = await prisma.user.upsert({
      where: { id: FALLBACK_USER_ID },
      update: data,
      create: {
        id: FALLBACK_USER_ID,
        nickname: body.nickname ?? mockProfile.nickname,
        ageGroup: body.ageGroup ?? mockProfile.ageGroup,
        mainEvents: mainEvents ?? mockProfile.mainEvents.join(","),
        trainingStyle: body.trainingStyle ?? mockProfile.trainingStyle,
        hasCoach: body.hasCoach ?? mockProfile.hasCoach,
        weeklyTargetMinutes: body.weeklyTargetMinutes ?? mockProfile.weeklyTargetMinutes ?? null
      }
    });

    return NextResponse.json({
      id: saved.id,
      nickname: saved.nickname,
      ageGroup: saved.ageGroup,
      mainEvents: saved.mainEvents.split(",").map((s: string) => s.trim()),
      trainingStyle: saved.trainingStyle,
      hasCoach: saved.hasCoach,
      weeklyTargetMinutes: saved.weeklyTargetMinutes ?? undefined
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "failed to save" }, { status: 500 });
  }
}
