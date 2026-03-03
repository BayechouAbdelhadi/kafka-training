import { BottleTrackerConsumer } from "../kafka/consumers/BottleTrackerConsumer";
import { config } from "../shared/config";
import type {
  BottleDetected,
  BottleAnalysisResult,
  BottleRejected,
  BottleStatus,
} from "../shared/types";
import { Processor } from "../shared/Processor";
import * as repository from "./repository";
import {
  BottleDetectedAvro,
  BottleAnalysisResultAvro,
  BottleRejectedAvro,
} from "../shared/schemaRegistry";

export class TrackerProcessor extends Processor {
  protected consumer!: BottleTrackerConsumer;
  private readonly detectedAvro = BottleDetectedAvro.create();
  private readonly analysisAvro = BottleAnalysisResultAvro.create();
  private readonly rejectedAvro = BottleRejectedAvro.create();

  async process(..._args: unknown[]): Promise<void> {
    const groupId = config.kafka.consumerGroups.tracker;
    this.consumer = await BottleTrackerConsumer.create(groupId);
    await this.consumer.subscribe(true);
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const valueBuffer = message.value as Buffer | null | undefined;
        if (!valueBuffer) return;
        try {
          switch (topic) {
            case config.topics.bottleDetected:
              this.handleBottleDetected(
                await this.detectedAvro.deserialize(valueBuffer as Buffer),
              );
              break;
            case config.topics.bottleAnalysisResult:
              this.handleBottleAnalysisResult(
                await this.analysisAvro.deserialize(valueBuffer as Buffer),
              );
              break;
            case config.topics.bottleRejected:
              this.handleBottleRejected(
                await this.rejectedAvro.deserialize(valueBuffer as Buffer),
              );
              break;
          }
        } catch (err: unknown) {
          console.error("Tracker parse error:", err);
        }
      },
    });

    const topics = [
      config.topics.bottleDetected,
      config.topics.bottleAnalysisResult,
      config.topics.bottleRejected,
    ];
    console.log(
      `Bottle tracker consuming [${topics.join(", ")}], updating in-memory DB.`,
    );
  }

  private handleBottleDetected(payload: BottleDetected): void {
    repository.setBottle(payload.bottleId, {
      bottleId: payload.bottleId,
      status: "detected",
      detectedAt: payload.timestamp,
      imageUrl: payload.imageUrl,
      analyses: [],
    });
  }

  private handleBottleAnalysisResult(payload: BottleAnalysisResult): void {
    const state = repository.getBottle(payload.bottleId);
    if (state) {
      const analyses = [...state.analyses, payload];
      repository.updateBottle(payload.bottleId, {
        analyses,
        status: this.getStatus(analyses),
      });
    }
  }

  private handleBottleRejected(payload: BottleRejected): void {
    repository.updateBottle(payload.bottleId, {
      status: "rejected",
      rejectedAt: payload.timestamp,
      rejectReason: payload.reason,
    });
  }

  private getStatus(results: BottleAnalysisResult[]): BottleStatus {
    if (results.length < 3) return "detected";
    const failed = results.some((r) => !r.passed);
    return failed ? "to_reject" : "valid";
  }

  async cleanUp(): Promise<void> {
    await this.consumer.disconnect();
  }
}
