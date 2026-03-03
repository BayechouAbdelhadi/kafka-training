import { CompressionTypes, Kafka } from "kafkajs";
import { config } from "../shared/config";

/**
 * Kafka client wrapper (steps 1–4: bootstrap, producer durability/idempotence/retries, consumer timeouts).
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

  /** Create a kafkajs producer (Step 3: idempotent, retries, maxInFlight). acks/compression applied per send. */
  createProducer() {
    const p = config.kafka.producer;
    return this.kafka.producer({
      idempotent: true, // no duplicates on retry; preserves order per partition with maxInFlight > 1
      retry: {
        retries: p.retries,
        initialRetryTime: p.initialRetryTime,
        maxRetryTime: p.maxRetryTime,
      },
      maxInFlightRequests: p.maxInFlightRequests,
    });
  }

  /** Create a kafkajs consumer (Step 4: sessionTimeout, rebalanceTimeout, heartbeatInterval). */
  createConsumer(groupId: string) {
    const c = config.kafka.consumer;
    return this.kafka.consumer({
      groupId,
      sessionTimeout: c.sessionTimeout,
      rebalanceTimeout: c.rebalanceTimeout,
      heartbeatInterval: c.heartbeatInterval,
    });
  }

  /** Producer send options from config (Step 3: acks=all, compression). */
  static getProducerSendOptions(): { acks: number; compression: CompressionTypes } {
    const p = config.kafka.producer;
    const compression = p.compression === "zstd" ? CompressionTypes.ZSTD : CompressionTypes.LZ4;
    return { acks: p.acks, compression };
  }
}

