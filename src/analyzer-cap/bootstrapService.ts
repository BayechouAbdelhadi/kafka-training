import { BootstrapService } from "../shared/BootstrapService.js";
import * as analyzerService from "./service.js";

export class AnalyzerCapBootstrapService extends BootstrapService {
  private analyzer: Awaited<ReturnType<typeof analyzerService.startAnalyzer>> | null = null;

  async process(): Promise<{ locals?: Record<string, unknown> }> {
    this.analyzer = await analyzerService.startAnalyzer();
    return {};
  }

  async cleanUp(): Promise<void> {
    if (this.analyzer) {
      await this.analyzer.disconnect();
      this.analyzer = null;
    }
  }
}
