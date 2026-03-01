import { BaseAnalyzer } from "../shared/BaseAnalyzer.js";
import type { BottleDetected } from "../shared/types.js";

export class ShapeAnalyzer extends BaseAnalyzer {
  get name() {
    return "shape" as const;
  }

  analyze(payload: BottleDetected): boolean {
    return Math.random() > 0.25;
  }
}
