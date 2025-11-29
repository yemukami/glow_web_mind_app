import { type AiMenuSuggestion, type AiReflectMessage, type Race, type Session, type UserProfile } from "../types";

export const mockProfile: UserProfile = {
  id: "user-1",
  nickname: "ゆめかみ",
  ageGroup: "high",
  mainEvents: ["1500m", "5000m"],
  trainingStyle: "club",
  hasCoach: true,
  weeklyTargetMinutes: 240
};

export const mockRaces: Race[] = [
  { id: "race-1", date: "2025-04-20", name: "県総体1500m", type: "race", importance: "A", event: "1500m" },
  { id: "race-2", date: "2025-03-28", name: "記録会5000m", type: "record_trial", importance: "B", event: "5000m" }
];

export const mockSessions: Session[] = [
  {
    id: "session-1",
    date: "2025-03-10",
    objective: "speed",
    perceivedEffort: "moderate",
    moodBefore: "normal",
    moodAfter: "normal",
    painFlag: false,
    userNote: "最後2本きつい",
    sets: [
      { kind: "interval", reps: 8, distanceM: 400, restDistanceM: 200, targetPaceSec: 90, description: "400m×8（90秒）" }
    ]
  },
  {
    id: "session-2",
    date: "2025-03-17",
    objective: "endurance",
    perceivedEffort: "easy",
    moodBefore: "good",
    moodAfter: "good",
    painFlag: false,
    userNote: "余裕を残して終了",
    sets: [{ kind: "tempo", description: "20分テンポ走（4:05/km）" }]
  }
];

export const mockAiMenuSuggestion: AiMenuSuggestion = {
  messageToUser: "大会まで10日。今日は抑えめに400m×6本（94秒）、余裕があれば最後1〜2本だけ上げよう。",
  logicalMenu: {
    objective: "speed",
    sets: [{ kind: "interval", reps: 6, distanceM: 400, restDistanceM: 200, targetPaceSec: 94 }],
    note: "抑えめ、後半のみ上げる"
  }
};

export const mockAiReflectMessage: AiReflectMessage = {
  mode: "light",
  messageToUser: [
    "寝不足のなかで6本やり切ったのは大きいよ。",
    "本数を落とさず走り切れたことが今日の成果。",
    "次はテスト前後で体力を温存できる日を選ぶと楽になるはず。"
  ]
};
