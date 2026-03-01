import express, { type Request, type Response } from "express";
import { config } from "../shared/config.js";
import { runAnalyzer } from "../shared/analyzerRunner.js";

const port = config.ports.analyzerShape;
const app = express();
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true, service: "analyzer-shape" });
});

async function main() {
  await runAnalyzer("shape");
  app.listen(port, () => {
    console.log(`Analyzer Shape HTTP server on http://localhost:${port}`);
  });
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
