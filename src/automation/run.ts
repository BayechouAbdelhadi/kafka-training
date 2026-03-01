import express, { type Request, type Response } from "express";
import type { EachMessagePayload } from "kafkajs";
import { getKafka } from "../kafka/client.js";
import { config } from "../shared/config.js";
import type { BottleAnalysisResult, BottleRejected } from "../shared/types.js";

const TOPIC_IN = config.topics.bottleAnalysisResult;
const TOPIC_OUT = config.topics.bottleRejected;
const CONSUMER_GROUP = "automation";
const port = config.ports.automation;

const pending = new Map<string, { results: BottleAnalysisResult[] }>();

function shouldReject(results: BottleAnalysisResult[]): boolean {
  return results.some((r) => !r.passed);
}

function allAnalyzersReported(results: BottleAnalysisResult[]): boolean {
  const analyzers = new Set(results.map((r) => r.analyzer));
  return analyzers.has("cap") && analyzers.has("label") && analyzers.has("shape");
}

const app = express();
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true, service: "automation" });
});

async function main() {
  const kafka = getKafka();
  const consumer = kafka.consumer({ groupId: CONSUMER_GROUP });
  const producer = kafka.producer();
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: TOPIC_IN, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }: EachMessagePayload) => {
      const raw = message.value?.toString();
      if (!raw) return;
      let result: BottleAnalysisResult;
      try {
        result = JSON.parse(raw) as BottleAnalysisResult;
      } catch {
        return;
      }
      const { bottleId } = result;
      const state = pending.get(bottleId) ?? { results: [] };
      state.results.push(result);
      pending.set(bottleId, state);

      if (!allAnalyzersReported(state.results)) return;

      pending.delete(bottleId);
      if (shouldReject(state.results)) {
        const failed = state.results.filter((r) => !r.passed).map((r) => r.analyzer);
        const payload: BottleRejected = {
          bottleId,
          reason: `Failed: ${failed.join(", ")}`,
          timestamp: new Date().toISOString(),
        };
        await producer.send({
          topic: TOPIC_OUT,
          messages: [{ key: bottleId, value: JSON.stringify(payload) }],
        });
        console.log(`Rejected: ${bottleId} (${payload.reason})`);
      }
    },
  });

  console.log(`Automation consuming ${TOPIC_IN}, producing to ${TOPIC_OUT} when any analysis fails.`);

  app.listen(port, () => {
    console.log(`Automation HTTP server on http://localhost:${port}`);
  });
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
