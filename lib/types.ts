export type AgeGroup = "junior_high" | "high" | "univ" | "adult";
export type TrainingStyle = "club" | "solo" | "other";
export type RaceImportance = "A" | "B" | "C";

export interface UserProfile {
  id: string;
  nickname: string;
  ageGroup: AgeGroup;
  mainEvents: string[];
  trainingStyle: TrainingStyle;
  hasCoach: boolean;
  weeklyTargetMinutes?: number;
}

export interface Race {
  id: string;
  date: string;
  name: string;
  type: "race" | "record_trial" | "test_run" | "other";
  importance: RaceImportance;
  event?: string;
  memo?: string;
}

export interface TrainingSet {
  kind: "interval" | "tempo" | "jog";
  reps?: number;
  distanceM?: number;
  restDistanceM?: number;
  targetPaceSec?: number;
  description?: string;
}

export interface Session {
  id: string;
  date: string;
  objective?: "speed" | "endurance" | "recovery";
  perceivedEffort?: "easy" | "moderate" | "too_hard";
  moodBefore?: "good" | "normal" | "bad";
  moodAfter?: "good" | "normal" | "bad";
  painFlag?: boolean;
  userNote?: string;
  sets: TrainingSet[];
}

export interface AiMenuSuggestion {
  messageToUser: string;
  logicalMenu: {
    objective?: string;
    sets: TrainingSet[];
    note?: string;
  };
}

export interface AiReflectMessage {
  mode: "light" | "deep";
  messageToUser: string[];
}
