import { CapAnalyzer } from "./analyzer.js";

export async function startAnalyzer(): Promise<void> {
  const analyzer = new CapAnalyzer();
  await analyzer.run();
}
