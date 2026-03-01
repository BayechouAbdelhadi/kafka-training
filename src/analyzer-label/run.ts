import express, { type Request, type Response } from "express";
import { config } from "../shared/config.js";
import { runAnalyzer } from "../shared/analyzerRunner.js";

const port = config.ports.analyzerLabel;
const app = express();
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true, service: "analyzer-label" });
});

async function main() {
  await runAnalyzer("label");
  app.listen(port, () => {
    console.log(`Analyzer Label HTTP server on http://localhost:${port}`);
  });
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
