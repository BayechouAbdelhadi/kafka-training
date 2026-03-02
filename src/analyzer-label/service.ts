import { LabelAnalyzer } from "./analyzer.js";

export async function startAnalyzer(): Promise<LabelAnalyzer> {
  const analyzer = new LabelAnalyzer();
  await analyzer.run();
  return analyzer;
}
