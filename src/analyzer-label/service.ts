import { LabelAnalyzer } from "./analyzer";

export async function startAnalyzer(): Promise<LabelAnalyzer> {
  const analyzer = new LabelAnalyzer();
  await analyzer.process();
  return analyzer;
}
