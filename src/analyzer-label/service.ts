import { LabelAnalyzer } from "./analyzer.js";

export async function startAnalyzer(): Promise<void> {
  const analyzer = new LabelAnalyzer();
  await analyzer.run();
}
