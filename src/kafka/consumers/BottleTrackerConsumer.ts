import type { Consumer as KafkajsConsumer, ConsumerRunConfig } from "kafkajs";
import { KafkaClient } from "../client";
import { config } from "../../shared/config";

const TRACKER_TOPICS = [
  config.topics.bottleDetected,
  config.topics.bottleAnalysisResult,
  config.topics.bottleRejected,
] as const;

/** Consumes from all bottle topics (detected, analysis.result, rejected) for the tracker. */
export class BottleTrackerConsumer {
  private readonly consumer: KafkajsConsumer;

  private constructor(consumer: KafkajsConsumer) {
    this.consumer = consumer;
  }

  static async create(groupId: string): Promise<BottleTrackerConsumer> {
    const consumer = KafkaClient.create().createConsumer(groupId);
    await consumer.connect();
    return new BottleTrackerConsumer(consumer);
  }

  async disconnect(): Promise<void> {
    await this.consumer.disconnect();
  }

  subscribe(fromBeginning = true): ReturnType<KafkajsConsumer["subscribe"]> {
    return this.consumer.subscribe({ topics: [...TRACKER_TOPICS], fromBeginning });
  }

  run(config: ConsumerRunConfig): ReturnType<KafkajsConsumer["run"]> {
    return this.consumer.run(config);
  }
}
