import type { Message } from "kafkajs";
import type { Producer as KafkajsProducer } from "kafkajs";
import { KafkaClient } from "../client";
import { config } from "../../shared/config";

/** Produces to topic bottle.rejected (rejection events). */
export class BottleRejectedProducer {
  private readonly producer: KafkajsProducer;

  private constructor(producer: KafkajsProducer) {
    this.producer = producer;
  }

  static async create(): Promise<BottleRejectedProducer> {
    const producer = KafkaClient.create().createProducer();
    await producer.connect();
    return new BottleRejectedProducer(producer);
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
  }

  async send(messages: Message[]): ReturnType<KafkajsProducer["send"]> {
    const opts = KafkaClient.getProducerSendOptions();
    return this.producer.send({
      topic: config.topics.bottleRejected,
      messages,
      acks: opts.acks,
      compression: opts.compression,
    });
  }
}
