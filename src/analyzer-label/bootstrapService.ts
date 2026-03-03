import { BootstrapService } from "../shared/BootstrapService";
import { LabelAnalyzer } from "./analyzer";

export class AnalyzerLabelBootstrapService extends BootstrapService {
  private analyzer: LabelAnalyzer | null = null;

  async onApplicationBootstrap(): Promise<{
    locals?: Record<string, unknown>;
  }> {
    const analyzer = new LabelAnalyzer();
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
