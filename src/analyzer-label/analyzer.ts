import { BaseAnalyzer } from "../shared/BaseAnalyzer";
import type { BottleDetected } from "../shared/types";

export class LabelAnalyzer extends BaseAnalyzer {
  get name() {
    return "label" as const;
  }

  analyze(payload: BottleDetected): boolean {
    //IA pour analyzer l'image de la bouteille et determiner si le label est correct
    return Math.random() > 0.25;
  }
}
