import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db/client";
import { mockProfile } from "../../../lib/data/mockData";

export async function GET() {
  try {
    const u = await prisma.user.findFirst();
    if (!u) {
      return NextResponse.json(mockProfile);
    }
    return NextResponse.json({
      id: u.id,
      nickname: u.nickname,
      ageGroup: u.ageGroup,
      mainEvents: u.mainEvents.split(",").map((s) => s.trim()),
      trainingStyle: u.trainingStyle,
      hasCoach: u.hasCoach,
      weeklyTargetMinutes: u.weeklyTargetMinutes ?? undefined
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(mockProfile, { status: 200 });
  }
}
