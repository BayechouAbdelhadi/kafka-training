import { BottleDetectedProducer } from "../kafka/producers/BottleDetectedProducer.js";
import { BootstrapService } from "../shared/BootstrapService.js";

export class DetectorBootstrapService extends BootstrapService {
  private producer: BottleDetectedProducer | null = null;

  async process(): Promise<{ locals?: Record<string, unknown> }> {
    this.producer = await BottleDetectedProducer.create();
    return { locals: { kafkaProducer: this.producer } };
  }

  async cleanUp(): Promise<void> {
    if (this.producer) {
      await this.producer.disconnect();
      this.producer = null;
    }
  }
}
