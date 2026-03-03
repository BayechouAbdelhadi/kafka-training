import { BootstrapService } from "../shared/BootstrapService";
import { ShapeAnalyzer } from "./analyzer";

export class AnalyzerShapeBootstrapService extends BootstrapService {
  private analyzer: ShapeAnalyzer | null = null;

  async onApplicationBootstrap(): Promise<{
    locals?: Record<string, unknown>;
  }> {
    const analyzer = new ShapeAnalyzer();
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
