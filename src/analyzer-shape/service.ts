import { ShapeAnalyzer } from "./analyzer.js";

export async function startAnalyzer(): Promise<ShapeAnalyzer> {
  const analyzer = new ShapeAnalyzer();
  await analyzer.run();
  return analyzer;
}
