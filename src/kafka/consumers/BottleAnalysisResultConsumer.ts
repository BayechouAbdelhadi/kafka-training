import type { Consumer as KafkajsConsumer, ConsumerRunConfig } from "kafkajs";
import { config } from "../../shared/config";
import { KafkaClient } from "../client";

/** Consumes from topic bottle.analysis.result (e.g. automation). */
export class BottleAnalysisResultConsumer {
  private readonly consumer: KafkajsConsumer;

  private constructor(consumer: KafkajsConsumer) {
    this.consumer = consumer;
  }

  static async create(groupId: string): Promise<BottleAnalysisResultConsumer> {
    const consumer = KafkaClient.create().createConsumer(groupId);
    await consumer.connect();
    return new BottleAnalysisResultConsumer(consumer);
  }

  async disconnect(): Promise<void> {
    await this.consumer.disconnect();
  }

  subscribe(fromBeginning = true): ReturnType<KafkajsConsumer["subscribe"]> {
    return this.consumer.subscribe({ topic: config.topics.bottleAnalysisResult, fromBeginning });
  }

  run(config: ConsumerRunConfig): ReturnType<KafkajsConsumer["run"]> {
    return this.consumer.run(config);
  }
}
