import express, { type Request, type Response } from "express";
import { getKafka } from "../kafka/client.js";
import { config } from "../shared/config.js";
import * as db from "../shared/db.js";
import type { BottleDetected, BottleAnalysisResult, BottleRejected, BottleStatus } from "../shared/types.js";

const TOPICS = [config.topics.bottleDetected, config.topics.bottleAnalysisResult, config.topics.bottleRejected] as const;
const CONSUMER_GROUP = "bottle-tracker";
const port = config.ports.tracker;

const pendingResults = new Map<string, BottleAnalysisResult[]>();

function getStatus(results: BottleAnalysisResult[]): BottleStatus {
  if (results.length < 3) return "detected";
  const failed = results.some((r) => !r.passed);
  return failed ? "to_reject" : "valid";
}

const app = express();
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true, service: "bottle-tracker" });
});

async function main() {
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
          db.setBottle(payload.bottleId, {
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
          const state = db.getBottle(payload.bottleId);
          if (state) {
            db.updateBottle(payload.bottleId, { analyses: [...arr], status: getStatus(arr) });
          }
          return;
        }
        if (topic === config.topics.bottleRejected) {
          const payload = JSON.parse(raw) as BottleRejected;
          db.updateBottle(payload.bottleId, {
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

  app.listen(port, () => {
    console.log(`Bottle Tracker HTTP server on http://localhost:${port}`);
  });
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
