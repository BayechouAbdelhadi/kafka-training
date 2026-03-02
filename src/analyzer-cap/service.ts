import { CapAnalyzer } from "./analyzer";

export async function startAnalyzer(): Promise<CapAnalyzer> {
  const analyzer = new CapAnalyzer();
  await analyzer.process();
  return analyzer;
}
