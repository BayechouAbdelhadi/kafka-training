import { BootstrapService } from "../shared/BootstrapService";
import { TrackerProcessor } from "./trackerProcessor";

export class TrackerBootstrapService extends BootstrapService {
  private processor: TrackerProcessor | null = null;

  async onApplicationBootstrap(): Promise<{
    locals?: Record<string, unknown>;
  }> {
    const processor = new TrackerProcessor();
    this.processor = processor;
    await processor.process();
    return {};
  }

  async onApplicationShutDown(): Promise<void> {
    if (this.processor) {
      await this.processor.cleanUp();
      this.processor = null;
    }
  }
}
