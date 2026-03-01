import { Kafka } from "kafkajs";
import { config } from "../shared/config.js";

let kafka: Kafka | null = null;

export function getKafka(): Kafka {
  if (!kafka) {
    kafka = new Kafka({
      clientId: "bottle-supervision",
      brokers: config.kafka.bootstrapServers.split(",").map((s) => s.trim()),
    });
  }
  return kafka;
}
