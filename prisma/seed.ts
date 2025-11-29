import { PrismaClient } from "@prisma/client";
import {
  mockAiMenuSuggestion,
  mockAiReflectMessage,
  mockProfile,
  mockRaces,
  mockSessions
} from "../lib/data/mockData";

const prisma = new PrismaClient();

async function main() {
  // Upsert single user (mock)
  const user = await prisma.user.upsert({
    where: { id: mockProfile.id },
    update: {
      nickname: mockProfile.nickname,
      ageGroup: mockProfile.ageGroup,
      mainEvents: mockProfile.mainEvents.join(","),
      hasCoach: mockProfile.hasCoach,
      trainingStyle: mockProfile.trainingStyle,
      weeklyTargetMinutes: mockProfile.weeklyTargetMinutes ?? null
    },
    create: {
      id: mockProfile.id,
      nickname: mockProfile.nickname,
      ageGroup: mockProfile.ageGroup,
      mainEvents: mockProfile.mainEvents.join(","),
      hasCoach: mockProfile.hasCoach,
      trainingStyle: mockProfile.trainingStyle,
      weeklyTargetMinutes: mockProfile.weeklyTargetMinutes ?? null
    }
  });

  // Upsert races
  for (const race of mockRaces) {
    await prisma.race.upsert({
      where: { id: race.id },
      update: {
        userId: user.id,
        date: new Date(race.date),
        name: race.name,
        type: race.type,
        importance: race.importance,
        event: race.event ?? null,
        memo: race.memo ?? null
      },
      create: {
        id: race.id,
        userId: user.id,
        date: new Date(race.date),
        name: race.name,
        type: race.type,
        importance: race.importance,
        event: race.event ?? null,
        memo: race.memo ?? null
      }
    });
  }

  // Upsert sessions + training sets
  for (const session of mockSessions) {
    const created = await prisma.session.upsert({
      where: { id: session.id },
      update: {
        userId: user.id,
        date: new Date(session.date),
        objective: session.objective ?? null,
        perceivedEffort: session.perceivedEffort ?? null,
        moodBefore: session.moodBefore ?? null,
        moodAfter: session.moodAfter ?? null,
        painFlag: session.painFlag ?? false,
        userNote: session.userNote ?? null
      },
      create: {
        id: session.id,
        userId: user.id,
        date: new Date(session.date),
        objective: session.objective ?? null,
        perceivedEffort: session.perceivedEffort ?? null,
        moodBefore: session.moodBefore ?? null,
        moodAfter: session.moodAfter ?? null,
        painFlag: session.painFlag ?? false,
        userNote: session.userNote ?? null
      }
    });

    // Replace training sets
    await prisma.trainingSet.deleteMany({ where: { sessionId: created.id } });
    for (const set of session.sets) {
      await prisma.trainingSet.create({
        data: {
          sessionId: created.id,
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

  // Seed summaries lightly (using AI mock summaries as placeholder)
  await prisma.summary.upsert({
    where: { id: "summary-weekly" },
    update: {
      userId: user.id,
      type: "weekly",
      text: mockAiMenuSuggestion.messageToUser,
      topicsJson: JSON.stringify(mockAiReflectMessage.messageToUser)
    },
    create: {
      id: "summary-weekly",
      userId: user.id,
      type: "weekly",
      text: mockAiMenuSuggestion.messageToUser,
      topicsJson: JSON.stringify(mockAiReflectMessage.messageToUser)
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
