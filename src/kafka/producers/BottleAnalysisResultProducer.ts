import type { Message } from "kafkajs";
import type { Producer as KafkajsProducer } from "kafkajs";
import { KafkaClient } from "../client";
import { config } from "../../shared/config";

/** Produces to topic bottle.analysis.result (analyzer results). */
export class BottleAnalysisResultProducer {
  private readonly producer: KafkajsProducer;

  private constructor(producer: KafkajsProducer) {
    this.producer = producer;
  }

  static async create(): Promise<BottleAnalysisResultProducer> {
    const producer = KafkaClient.create().createProducer();
    await producer.connect();
    return new BottleAnalysisResultProducer(producer);
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
  }

  async send(messages: Message[]): ReturnType<KafkajsProducer["send"]> {
    const opts = KafkaClient.getProducerSendOptions();
    return this.producer.send({
      topic: config.topics.bottleAnalysisResult,
      messages,
      acks: opts.acks,
      compression: opts.compression,
    });
  }
}
