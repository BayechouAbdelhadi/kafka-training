import { BottleDetectedProducer } from "../kafka/producers/BottleDetectedProducer";
import { BootstrapService } from "../shared/BootstrapService";

export class DetectorBootstrapService extends BootstrapService {
  private producer: BottleDetectedProducer | null = null;

  async onApplicationBootstrap(): Promise<{
    locals?: Record<string, unknown>;
  }> {
    this.producer = await BottleDetectedProducer.create();
    return { locals: { kafkaProducer: this.producer } };
  }

  async onApplicationShutDown(): Promise<void> {
    if (this.producer) {
      await this.producer.disconnect();
      this.producer = null;
    }
  }
}
