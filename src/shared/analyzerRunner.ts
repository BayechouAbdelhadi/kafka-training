import type { EachMessagePayload } from "kafkajs";
import { getKafka } from "../kafka/client.js";
import { config } from "./config.js";
import type { BottleDetected, BottleAnalysisResult } from "./types.js";

export type AnalyzerName = "cap" | "label" | "shape";

function mockAnalyze(_payload: BottleDetected): boolean {
  return Math.random() > 0.25;
}

export async function runAnalyzer(analyzer: AnalyzerName): Promise<void> {
  const consumerGroup = `analyzer-${analyzer}`;
  const topicIn = config.topics.bottleDetected;
  const topicOut = config.topics.bottleAnalysisResult;

  const kafka = getKafka();
  const consumer = kafka.consumer({ groupId: consumerGroup });
  const producer = kafka.producer();
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: topicIn, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }: EachMessagePayload) => {
      const key = message.key?.toString();
      const raw = message.value?.toString();
      if (!key || !raw) return;
      let payload: BottleDetected;
      try {
        payload = JSON.parse(raw) as BottleDetected;
      } catch {
        return;
      }
      const passed = mockAnalyze(payload);
      const result: BottleAnalysisResult = {
        bottleId: payload.bottleId,
        analyzer,
        passed,
        timestamp: new Date().toISOString(),
        details: passed ? undefined : `${analyzer} check failed`,
      };
      await producer.send({
        topic: topicOut,
        messages: [{ key: payload.bottleId, value: JSON.stringify(result) }],
      });
      console.log(`${analyzer}: ${payload.bottleId} -> ${passed ? "pass" : "fail"}`);
    },
  });

  console.log(`Analyzer "${analyzer}" consuming ${topicIn} (group ${consumerGroup}), producing to ${topicOut}.`);
}
