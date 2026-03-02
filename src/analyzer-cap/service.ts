import { CapAnalyzer } from "./analyzer.js";

export async function startAnalyzer(): Promise<CapAnalyzer> {
  const analyzer = new CapAnalyzer();
  await analyzer.run();
  return analyzer;
}
