import { BootstrapService } from "../shared/BootstrapService";
import { CapAnalyzer } from "./analyzer";

export class AnalyzerCapBootstrapService extends BootstrapService {
  private analyzer: CapAnalyzer| null = null;

  async onApplicationBootstrap(): Promise<{
    locals?: Record<string, unknown>;
  }> {
    const analyzer = new CapAnalyzer();
    this.analyzer = analyzer;
    await analyzer.process();
    return {};
  }

  async onApplicationShutDown(): Promise<void> {
    if (this.analyzer) {
      await this.analyzer.cleanUp();
      this.analyzer = null;
    }
  }
}
