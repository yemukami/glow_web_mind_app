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
import { type Session } from "../types";

/**
 * Stub data-access layer.
 * Replace with real DB/API calls (e.g., fetch to Next.js API routes or external backend).
 */

export async function getUserProfile(): Promise<UserProfile> {
  const res = await safeFetch("/api/profile");
  return res ?? mockProfile;
}

export async function getRaces(): Promise<Race[]> {
  const res = await safeFetch("/api/races");
  return res ?? mockRaces;
}

export async function getSessions(): Promise<Session[]> {
  const res = await safeFetch("/api/sessions");
  return res ?? mockSessions;
}

async function safeFetch<T>(path: string): Promise<T | null> {
  try {
    const base =
      typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
        : "";
    const resp = await fetch(`${base}${path}`, { cache: "no-store" });
    if (!resp.ok) return null;
    return (await resp.json()) as T;
  } catch (error) {
    console.warn("safeFetch fallback to mock:", error);
    return null;
  }
}

export async function getAiMenuSuggestion(): Promise<AiMenuSuggestion> {
  return mockAiMenuSuggestion;
}

export async function getAiReflectMessage(): Promise<AiReflectMessage> {
  return mockAiReflectMessage;
}
