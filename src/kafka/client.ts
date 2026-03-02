import { Kafka } from "kafkajs";
import { config } from "../shared/config";

/**
 * Kafka client wrapper.
 * Use KafkaClient.create() to get the singleton instance, then call instance methods.
 */
export class KafkaClient {
  private static instance: KafkaClient | null = null;
  private readonly kafka: Kafka;

  private constructor() {
    this.kafka = new Kafka({
      clientId: "bottle-supervision",
      brokers: config.kafka.bootstrapServers.split(",").map((s) => s.trim()),
    });
  }

  /** Returns the singleton KafkaClient instance. */
  static create(): KafkaClient {
    if (!KafkaClient.instance) {
      KafkaClient.instance = new KafkaClient();
    }
    return KafkaClient.instance;
  }

  /** Create a kafkajs producer bound to this client. */
  createProducer() {
    return this.kafka.producer();
  }

  /** Create a kafkajs consumer for the given groupId. */
  createConsumer(groupId: string) {
    return this.kafka.consumer({ groupId });
  }
}

