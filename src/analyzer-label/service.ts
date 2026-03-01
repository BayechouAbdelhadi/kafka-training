import { runAnalyzer } from "../shared/analyzerRunner.js";

export async function startAnalyzer(): Promise<void> {
  await runAnalyzer("label");
}
