import { BaseAnalyzer } from "../shared/BaseAnalyzer";
import type { BottleDetected } from "../shared/types";

export class CapAnalyzer extends BaseAnalyzer {
  get name() {
    return "cap" as const;
  }

  analyze(payload: BottleDetected): boolean {
    return Math.random() > 0.25;
  }
}
