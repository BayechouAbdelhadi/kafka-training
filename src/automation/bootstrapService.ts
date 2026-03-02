import { BootstrapService } from "../shared/BootstrapService";
import * as automationService from "./service";

export class AutomationBootstrapService extends BootstrapService {
  private disconnect: (() => Promise<void>) | null = null;

  async onApplicationBootstrap(): Promise<{
    locals?: Record<string, unknown>;
  }> {
    const handle = await automationService.startAutomation();
    this.disconnect = () => handle.disconnect();
    return {};
  }

  async onApplicationShutDown(): Promise<void> {
    if (this.disconnect) {
      await this.disconnect();
      this.disconnect = null;
    }
  }
}
