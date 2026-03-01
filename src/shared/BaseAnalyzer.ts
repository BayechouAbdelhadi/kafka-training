import type { EachMessagePayload } from "kafkajs";
import { getKafka } from "../kafka/client.js";
import { config } from "./config.js";
import type { BottleDetected, BottleAnalysisResult } from "./types.js";

export type AnalyzerName = "cap" | "label" | "shape";

export abstract class BaseAnalyzer {
  abstract get name(): AnalyzerName;

  /** Analyze a detected bottle; subclasses implement actual logic. */
  abstract analyze(payload: BottleDetected): boolean;

  async run(): Promise<void> {
    const consumerGroup = `analyzer-${this.name}`;
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
        const passed = this.analyze(payload);
        const result: BottleAnalysisResult = {
          bottleId: payload.bottleId,
          analyzer: this.name,
          passed,
          timestamp: new Date().toISOString(),
          details: passed ? undefined : `${this.name} check failed`,
        };
        await producer.send({
          topic: topicOut,
          messages: [{ key: payload.bottleId, value: JSON.stringify(result) }],
        });
        console.log(`${this.name}: ${payload.bottleId} -> ${passed ? "pass" : "fail"}`);
      },
    });

    console.log(`Analyzer "${this.name}" consuming ${topicIn} (group ${consumerGroup}), producing to ${topicOut}.`);
  }
}
