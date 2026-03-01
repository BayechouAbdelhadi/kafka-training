import type { BottleDetected } from "../shared/types.js";
import type { Producer } from "kafkajs";
import { config } from "../shared/config.js";

const TOPIC = config.topics.bottleDetected;

export async function publishDetection(
  producer: Producer,
  bottleId: string,
  imageUrl?: string
): Promise<BottleDetected> {
  const now = new Date().toISOString();
  const payload: BottleDetected = {
    bottleId: bottleId.trim(),
    timestamp: now,
    imageUrl:
      typeof imageUrl === "string" && imageUrl.trim()
        ? imageUrl.trim()
        : `https://example.com/capture/${bottleId.trim()}.jpg`,
  };
  await producer.send({
    topic: TOPIC,
    messages: [{ key: payload.bottleId, value: JSON.stringify(payload) }],
  });
  return payload;
}
