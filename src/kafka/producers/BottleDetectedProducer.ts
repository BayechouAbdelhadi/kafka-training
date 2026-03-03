import type { Message } from "kafkajs";
import type { Producer as KafkajsProducer } from "kafkajs";
import { config } from "../../shared/config";
import { KafkaClient } from "../client";

/** Produces to topic bottle.detected (detection events). */
export class BottleDetectedProducer {
  private readonly producer: KafkajsProducer;

  private constructor(producer: KafkajsProducer) {
    this.producer = producer;
  }

  static async create(): Promise<BottleDetectedProducer> {
    const producer = KafkaClient.create().createProducer();
    await producer.connect();
    return new BottleDetectedProducer(producer);
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
  }

  async send(messages: Message[]): ReturnType<KafkajsProducer["send"]> {
    const opts = KafkaClient.getProducerSendOptions();
    return this.producer.send({
      topic: config.topics.bottleDetected,
      messages,
      acks: opts.acks,
      compression: opts.compression,
    });
  }
}
