import type { EachMessagePayload } from "kafkajs";
import { BottleAnalysisResultProducer } from "../kafka/producers/BottleAnalysisResultProducer";
import { BottleDetectedConsumer } from "../kafka/consumers/BottleDetectedConsumer";
import { config } from "./config";
import type { BottleDetected, BottleAnalysisResult } from "./types";
import { Processor } from "./Processor";

export type AnalyzerName = "cap" | "label" | "shape";

export abstract class BaseAnalyzer extends Processor {
  protected consumer!: BottleDetectedConsumer;
  protected producer!: BottleAnalysisResultProducer;
  protected consumerGroupId!: string;

  abstract get name(): AnalyzerName;

  /** Analyze a detected bottle; subclasses implement actual logic. */
  abstract analyze(payload: BottleDetected): boolean;

  async process(..._args: unknown[]): Promise<void> {
    this.consumerGroupId = `analyzer-${this.name}`;
    const topicIn = config.topics.bottleDetected;
    const topicOut = config.topics.bottleAnalysisResult;

    this.consumer = await BottleDetectedConsumer.create(this.consumerGroupId);
    this.producer = await BottleAnalysisResultProducer.create();
    await this.consumer.subscribe(true);
    await this.consumer.run({
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
        await this.producer.send([{ key: payload.bottleId, value: JSON.stringify(result) }]);
        console.log(`${this.name}: ${payload.bottleId} -> ${passed ? "pass" : "fail"}`);
      },
    });

    console.log(`Analyzer "${this.name}" consuming ${topicIn} (group ${this.consumerGroupId}), producing to ${topicOut}.`);
  }

  async cleanUp(): Promise<void> {
    await this.consumer.disconnect();
    await this.producer.disconnect();
  }
}
