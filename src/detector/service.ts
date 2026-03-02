import type { BottleDetectedProducer } from "../kafka/producers/BottleDetectedProducer";
import type { BottleDetected } from "../shared/types";

export async function publishDetection(
  producer: BottleDetectedProducer,
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
  await producer.send([{ key: payload.bottleId, value: JSON.stringify(payload) }]);
  return payload;
}
