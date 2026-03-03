import type { EachMessagePayload } from "kafkajs";
import { BottleAnalysisResultProducer } from "../kafka/producers/BottleAnalysisResultProducer";
import { BottleDetectedConsumer } from "../kafka/consumers/BottleDetectedConsumer";
import { config } from "./config";
import type { BottleDetected, BottleAnalysisResult } from "./types";
import { Processor } from "./Processor";
import {
  BottleDetectedAvro,
  BottleAnalysisResultAvro,
} from "./schemaRegistry";

export type AnalyzerName = "cap" | "label" | "shape";

export abstract class BaseAnalyzer extends Processor {
  protected consumer!: BottleDetectedConsumer;
  protected producer!: BottleAnalysisResultProducer;
  protected consumerGroupId!: string;
  private readonly detectedAvro = BottleDetectedAvro.create();
  private readonly resultAvro = BottleAnalysisResultAvro.create();

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
        const valueBuffer = message.value as Buffer | null | undefined;
        if (!key || !valueBuffer) return;
        let payload: BottleDetected;
        try {
          payload = await this.detectedAvro.deserialize(
            valueBuffer as Buffer,
          );
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
        const encoded = await this.resultAvro.serialize(result);
        await this.producer.send([{ key: payload.bottleId, value: encoded }]);
        console.log(
          `${this.name}: ${payload.bottleId} -> ${passed ? "pass" : "fail"}`,
        );
      },
    });

    console.log(
      `Analyzer "${this.name}" consuming ${topicIn} (group ${this.consumerGroupId}), producing to ${topicOut}.`,
    );
  }

  async cleanUp(): Promise<void> {
    await this.consumer.disconnect();
    await this.producer.disconnect();
  }
}
