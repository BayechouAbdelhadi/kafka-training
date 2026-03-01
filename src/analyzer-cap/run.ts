import express, { type Request, type Response } from "express";
import { config } from "../shared/config.js";
import { runAnalyzer } from "../shared/analyzerRunner.js";

const port = config.ports.analyzerCap;
const app = express();
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true, service: "analyzer-cap" });
});

async function main() {
  await runAnalyzer("cap");
  app.listen(port, () => {
    console.log(`Analyzer Cap HTTP server on http://localhost:${port}`);
  });
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
