import type { Consumer as KafkajsConsumer, ConsumerRunConfig } from "kafkajs";
import { getKafka } from "../client.js";
import { config } from "../../shared/config.js";

/** Consumes from topic bottle.detected (e.g. analyzers). */
export class BottleDetectedConsumer {
  private readonly consumer: KafkajsConsumer;

  private constructor(consumer: KafkajsConsumer) {
    this.consumer = consumer;
  }

  static async create(groupId: string): Promise<BottleDetectedConsumer> {
    const consumer = getKafka().consumer({ groupId });
    await consumer.connect();
    return new BottleDetectedConsumer(consumer);
  }

  async disconnect(): Promise<void> {
    await this.consumer.disconnect();
  }

  subscribe(fromBeginning = true): ReturnType<KafkajsConsumer["subscribe"]> {
    return this.consumer.subscribe({ topic: config.topics.bottleDetected, fromBeginning });
  }

  run(config: ConsumerRunConfig): ReturnType<KafkajsConsumer["run"]> {
    return this.consumer.run(config);
  }
}
