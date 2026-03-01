import { BaseAnalyzer } from "../shared/BaseAnalyzer.js";
import type { BottleDetected } from "../shared/types.js";

export class LabelAnalyzer extends BaseAnalyzer {
  get name() {
    return "label" as const;
  }

  analyze(payload: BottleDetected): boolean {
    return Math.random() > 0.25;
  }
}
