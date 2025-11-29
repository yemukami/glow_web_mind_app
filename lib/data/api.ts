import {
  type AiMenuSuggestion,
  type AiReflectMessage,
  type Race,
  type Session,
  type UserProfile
} from "../types";
import {
  mockAiMenuSuggestion,
  mockAiReflectMessage,
  mockProfile,
  mockRaces,
  mockSessions
} from "./mockData";
import { prisma } from "../db/client";
import { type Session } from "../types";

/**
 * Stub data-access layer.
 * Replace with real DB/API calls (e.g., fetch to Next.js API routes or external backend).
 */

export async function getUserProfile(): Promise<UserProfile> {
  if (process.env.USE_DB === "true") {
    const u = await prisma.user.findFirst();
    if (!u) return mockProfile;
    return {
      id: u.id,
      nickname: u.nickname,
      ageGroup: u.ageGroup,
      mainEvents: u.mainEvents.split(",").map((s) => s.trim()),
      trainingStyle: u.trainingStyle,
      hasCoach: u.hasCoach,
      weeklyTargetMinutes: u.weeklyTargetMinutes ?? undefined
    };
  }
  return mockProfile;
}

export async function getRaces(): Promise<Race[]> {
  if (process.env.USE_DB === "true") {
    const races = await prisma.race.findMany({ orderBy: { date: "asc" } });
    if (!races.length) return mockRaces;
    return races.map((r) => ({
      id: r.id,
      date: r.date.toISOString().slice(0, 10),
      name: r.name,
      type: r.type,
      importance: r.importance as Race["importance"],
      event: r.event ?? undefined,
      memo: r.memo ?? undefined
    }));
  }
  return mockRaces;
}

export async function getSessions(): Promise<Session[]> {
  if (process.env.USE_DB === "true") {
    const sessions = await prisma.session.findMany({
      orderBy: { date: "desc" },
      include: { sets: true }
    });
    if (!sessions.length) return mockSessions;
    return sessions.map((s) => ({
      id: s.id,
      date: s.date.toISOString().slice(0, 10),
      objective: s.objective ?? undefined,
      perceivedEffort: s.perceivedEffort ?? undefined,
      moodBefore: s.moodBefore ?? undefined,
      moodAfter: s.moodAfter ?? undefined,
      painFlag: s.painFlag ?? false,
      userNote: s.userNote ?? undefined,
      sets: s.sets.map((set) => ({
        kind: set.kind as Session["sets"][number]["kind"],
        reps: set.reps ?? undefined,
        distanceM: set.distanceM ?? undefined,
        restDistanceM: set.restDistanceM ?? undefined,
        durationSec: set.durationSec ?? undefined,
        targetPaceSec: set.targetPaceSecPerKm ?? undefined,
        description: set.glowScenarioJson ?? undefined
      }))
    }));
  }
  return mockSessions;
}

export async function getAiMenuSuggestion(): Promise<AiMenuSuggestion> {
  return mockAiMenuSuggestion;
}

export async function getAiReflectMessage(): Promise<AiReflectMessage> {
  return mockAiReflectMessage;
}
