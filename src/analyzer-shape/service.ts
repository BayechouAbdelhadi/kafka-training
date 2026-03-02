import { ShapeAnalyzer } from "./analyzer";

export async function startAnalyzer(): Promise<ShapeAnalyzer> {
  const analyzer = new ShapeAnalyzer();
  await analyzer.run();
  return analyzer;
}
