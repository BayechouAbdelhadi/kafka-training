import { BottleTrackerConsumer } from "../kafka/consumers/BottleTrackerConsumer";
import { config } from "../shared/config";
import type { BottleDetected, BottleAnalysisResult, BottleRejected, BottleStatus } from "../shared/types";
import { Processor } from "../shared/Processor";
import * as repository from "./repository";

function getStatus(results: BottleAnalysisResult[]): BottleStatus {
  if (results.length < 3) return "detected";
  const failed = results.some((r) => !r.passed);
  return failed ? "to_reject" : "valid";
}

export class TrackerProcessor extends Processor {
  protected consumer!: BottleTrackerConsumer;
  private readonly pendingResults = new Map<string, BottleAnalysisResult[]>();

  async process(..._args: unknown[]): Promise<void> {
    const groupId = config.kafka.consumerGroups.tracker;
    this.consumer = await BottleTrackerConsumer.create(groupId);
    await this.consumer.subscribe(true);
    await this.consumer.run({
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
            this.pendingResults.set(payload.bottleId, []);
            return;
          }
          if (topic === config.topics.bottleAnalysisResult) {
            const payload = JSON.parse(raw) as BottleAnalysisResult;
            const arr = this.pendingResults.get(payload.bottleId) ?? [];
            arr.push(payload);
            this.pendingResults.set(payload.bottleId, arr);
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
            this.pendingResults.delete(payload.bottleId);
          }
        } catch (err: unknown) {
          console.error("Tracker parse error:", err);
        }
      },
    });

    console.log(`Bottle tracker consuming [${[config.topics.bottleDetected, config.topics.bottleAnalysisResult, config.topics.bottleRejected].join(", ")}], updating in-memory DB.`);
  }

  async cleanUp(): Promise<void> {
    await this.consumer.disconnect();
  }
}
