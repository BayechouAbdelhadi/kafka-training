import { getKafka } from "../kafka/client.js";
import { config } from "../shared/config.js";
import type { BottleDetected, BottleAnalysisResult, BottleRejected, BottleStatus } from "../shared/types.js";
import type * as repo from "./repository.js";

const TOPICS = [
  config.topics.bottleDetected,
  config.topics.bottleAnalysisResult,
  config.topics.bottleRejected,
] as const;
const CONSUMER_GROUP = "bottle-tracker";

const pendingResults = new Map<string, BottleAnalysisResult[]>();

function getStatus(results: BottleAnalysisResult[]): BottleStatus {
  if (results.length < 3) return "detected";
  const failed = results.some((r) => !r.passed);
  return failed ? "to_reject" : "valid";
}

export async function startTracker(repository: typeof repo): Promise<void> {
  const kafka = getKafka();
  const consumer = kafka.consumer({ groupId: CONSUMER_GROUP });
  await consumer.connect();
  await consumer.subscribe({ topics: [...TOPICS], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const key = message.key?.toString();
      const raw = message.value?.toString();
      if (!key || !raw) return;
      try {
        if (topic === config.topics.bottleDetected) {
          const payload = JSON.parse(raw) as BottleDetected;
          repository.setBottle(payload.bottleId, {
            bottleId: payload.bottleId,
            status: "detected",
            detectedAt: payload.timestamp,
            imageUrl: payload.imageUrl,
            analyses: [],
          });
          pendingResults.set(payload.bottleId, []);
          return;
        }
        if (topic === config.topics.bottleAnalysisResult) {
          const payload = JSON.parse(raw) as BottleAnalysisResult;
          const arr = pendingResults.get(payload.bottleId) ?? [];
          arr.push(payload);
          pendingResults.set(payload.bottleId, arr);
          const state = repository.getBottle(payload.bottleId);
          if (state) {
            repository.updateBottle(payload.bottleId, { analyses: [...arr], status: getStatus(arr) });
          }
          return;
        }
        if (topic === config.topics.bottleRejected) {
          const payload = JSON.parse(raw) as BottleRejected;
          repository.updateBottle(payload.bottleId, {
            status: "rejected",
            rejectedAt: payload.timestamp,
            rejectReason: payload.reason,
          });
          pendingResults.delete(payload.bottleId);
        }
      } catch (err: unknown) {
        console.error("Tracker parse error:", err);
      }
    },
  });

  console.log(`Bottle tracker consuming [${TOPICS.join(", ")}], updating in-memory DB.`);
}
