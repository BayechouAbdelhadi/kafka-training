import { BootstrapService } from "../shared/BootstrapService";
import * as analyzerService from "./service";

export class AnalyzerLabelBootstrapService extends BootstrapService {
  private analyzer: Awaited<
    ReturnType<typeof analyzerService.startAnalyzer>
  > | null = null;

  async onApplicationBootstrap(): Promise<{
    locals?: Record<string, unknown>;
  }> {
    this.analyzer = await analyzerService.startAnalyzer();
    return {};
  }

  async onApplicationShutDown(): Promise<void> {
    if (this.analyzer) {
      await this.analyzer.disconnect();
      this.analyzer = null;
    }
  }
}
