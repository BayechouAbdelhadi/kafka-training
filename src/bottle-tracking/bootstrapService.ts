import { BootstrapService } from "../shared/BootstrapService.js";
import * as trackerRepository from "./repository.js";
import * as trackerService from "./service.js";

export class TrackerBootstrapService extends BootstrapService {
  private disconnect: (() => Promise<void>) | null = null;

  async process(): Promise<{ locals?: Record<string, unknown> }> {
    const handle = await trackerService.startTracker(trackerRepository);
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
