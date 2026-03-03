import { BootstrapService } from "../shared/BootstrapService";
import { AutomationProcessor } from "./automationProcessor";

export class AutomationBootstrapService extends BootstrapService {
  private processor: AutomationProcessor | null = null;

  async onApplicationBootstrap(): Promise<{
    locals?: Record<string, unknown>;
  }> {
    const processor = new AutomationProcessor();
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
