import type { EachMessagePayload } from "kafkajs";
import { BottleAnalysisResultConsumer } from "../kafka/consumers/BottleAnalysisResultConsumer";
import { BottleRejectedProducer } from "../kafka/producers/BottleRejectedProducer";
import { config } from "../shared/config";
import type { BottleAnalysisResult, BottleRejected } from "../shared/types";

const TOPIC_IN = config.topics.bottleAnalysisResult;
const TOPIC_OUT = config.topics.bottleRejected;

const pending = new Map<string, { results: BottleAnalysisResult[] }>();

function shouldReject(results: BottleAnalysisResult[]): boolean {
  return results.some((r) => !r.passed);
}

function allAnalyzersReported(results: BottleAnalysisResult[]): boolean {
  const analyzers = new Set(results.map((r) => r.analyzer));
  return analyzers.has("cap") && analyzers.has("label") && analyzers.has("shape");
}

export interface AutomationKafkaHandle {
  disconnect(): Promise<void>;
}

export async function startAutomation(): Promise<AutomationKafkaHandle> {
  const groupId = config.kafka.consumerGroups.automation;
  const consumer = await BottleAnalysisResultConsumer.create(groupId);
  const producer = await BottleRejectedProducer.create();
  await consumer.subscribe(true);
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
        await producer.send([{ key: bottleId, value: JSON.stringify(payload) }]);
        console.log(`Rejected: ${bottleId} (${payload.reason})`);
      }
    },
  });

  console.log(`Automation consuming ${TOPIC_IN}, producing to ${TOPIC_OUT} when any analysis fails.`);

  return {
    async disconnect() {
      await consumer.disconnect();
      await producer.disconnect();
    },
  };
}
