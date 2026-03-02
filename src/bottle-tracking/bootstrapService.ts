import { BootstrapService } from "../shared/BootstrapService";
import * as trackerRepository from "./repository";
import * as trackerService from "./service";

export class TrackerBootstrapService extends BootstrapService {
  private disconnect: (() => Promise<void>) | null = null;

  async onApplicationBootstrap(): Promise<{
    locals?: Record<string, unknown>;
  }> {
    const handle = await trackerService.startTracker(trackerRepository);
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
