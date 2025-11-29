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

/**
 * Stub data-access layer.
 * Replace with real DB/API calls (e.g., fetch to Next.js API routes or external backend).
 */

export async function getUserProfile(): Promise<UserProfile> {
  return mockProfile;
}

export async function getRaces(): Promise<Race[]> {
  return mockRaces;
}

export async function getSessions(): Promise<Session[]> {
  return mockSessions;
}

export async function getAiMenuSuggestion(): Promise<AiMenuSuggestion> {
  return mockAiMenuSuggestion;
}

export async function getAiReflectMessage(): Promise<AiReflectMessage> {
  return mockAiReflectMessage;
}
