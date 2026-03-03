import type { EachMessagePayload } from "kafkajs";
import { BottleAnalysisResultConsumer } from "../kafka/consumers/BottleAnalysisResultConsumer";
import { BottleRejectedProducer } from "../kafka/producers/BottleRejectedProducer";
import { config } from "../shared/config";
import type { BottleAnalysisResult, BottleRejected } from "../shared/types";
import { Processor } from "../shared/Processor";

const TOPIC_IN = config.topics.bottleAnalysisResult;
const TOPIC_OUT = config.topics.bottleRejected;

export class AutomationProcessor extends Processor {
  protected consumer!: BottleAnalysisResultConsumer;
  protected producer!: BottleRejectedProducer;

  async process(..._args: unknown[]): Promise<void> {
    const groupId = config.kafka.consumerGroups.automation;
    this.consumer = await BottleAnalysisResultConsumer.create(groupId);
    this.producer = await BottleRejectedProducer.create();
    await this.consumer.subscribe(true);
    await this.consumer.run({
      eachMessage: async ({ message }: EachMessagePayload) => {
        const raw = message.value?.toString();
        if (!raw) return;
        let result: BottleAnalysisResult;
        try {
          result = JSON.parse(raw) as BottleAnalysisResult;
        } catch {
          return;
        }
        if (!result.passed) {
          const payload: BottleRejected = {
            bottleId: result.bottleId,
            reason: result.details ?? `${result.analyzer} check failed`,
            timestamp: new Date().toISOString(),
          };
          await this.producer.send([{ key: result.bottleId, value: JSON.stringify(payload) }]);
          console.log(`Rejected: ${result.bottleId} (${payload.reason})`);
        }
      },
    });

    console.log(`Automation consuming ${TOPIC_IN}, producing to ${TOPIC_OUT} when any analysis fails.`);
  }

  async cleanUp(): Promise<void> {
    await this.consumer.disconnect();
    await this.producer.disconnect();
  }
}
