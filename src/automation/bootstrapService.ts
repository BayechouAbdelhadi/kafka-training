import { BootstrapService } from "../shared/BootstrapService.js";
import * as automationService from "./service.js";

export class AutomationBootstrapService extends BootstrapService {
  private disconnect: (() => Promise<void>) | null = null;

  async process(): Promise<{ locals?: Record<string, unknown> }> {
    const handle = await automationService.startAutomation();
    this.disconnect = () => handle.disconnect();
    return {};
  }

  async cleanUp(): Promise<void> {
    if (this.disconnect) {
      await this.disconnect();
      this.disconnect = null;
    }
  }
}
