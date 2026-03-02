import { BootstrapService } from "../shared/BootstrapService";
import { DetectorProcessor } from "./processor";

export class DetectorBootstrapService extends BootstrapService {
  private processor: DetectorProcessor | null = null;

  async onApplicationBootstrap(): Promise<{
    locals?: Record<string, unknown>;
  }> {
    this.processor = await DetectorProcessor.create();
    return { locals: { detectorProcessor: this.processor } };
  }

  async onApplicationShutDown(): Promise<void> {
    if (this.processor) {
      await this.processor.cleanUp();
      this.processor = null;
    }
  }
}
