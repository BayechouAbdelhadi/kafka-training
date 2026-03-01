import { ShapeAnalyzer } from "./analyzer.js";

export async function startAnalyzer(): Promise<void> {
  const analyzer = new ShapeAnalyzer();
  await analyzer.run();
}
