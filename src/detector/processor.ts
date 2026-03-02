import type { Request, Response } from "express";
import { Processor } from "../shared/Processor";
import { BottleDetectedProducer } from "../kafka/producers/BottleDetectedProducer";
import type { BottleDetected } from "../shared/types";

export class DetectorProcessor extends Processor {
  private readonly producer: BottleDetectedProducer;

  private constructor(producer: BottleDetectedProducer) {
    super();
    this.producer = producer;
  }

  static async create(): Promise<DetectorProcessor> {
    const producer = await BottleDetectedProducer.create();
    return new DetectorProcessor(producer);
  }

  /**
   * Process a detection. Called from the API with (bottleId, imageUrl?); no args at bootstrap (no-op).
   * Sends to Kafka and can be extended with other steps (DB, notifications, etc.).
   */
  async process(
    bottleId: string,
    imageUrl?: string,
  ): Promise<BottleDetected | void> {
    if (typeof bottleId !== "string" || !bottleId.trim()) return;
    const now = new Date().toISOString();
    const payload: BottleDetected = {
      bottleId: bottleId.trim(),
      timestamp: now,
      imageUrl:
        typeof imageUrl === "string" && imageUrl.trim()
          ? imageUrl.trim()
          : `https://example.com/capture/${bottleId.trim()}.jpg`,
    };
    await this.producer.send([
      { key: payload.bottleId, value: JSON.stringify(payload) },
    ]);
    return payload;
  }

  async cleanUp(): Promise<void> {
    await this.producer.disconnect();
  }
}
