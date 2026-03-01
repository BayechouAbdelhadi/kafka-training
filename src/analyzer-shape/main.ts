import { config } from "../shared/config.js";
import { createApp } from "./app.js";
import * as analyzerService from "./service.js";

const port = config.ports.analyzerShape;

async function main() {
  await analyzerService.startAnalyzer();

  const app = createApp();
  app.listen(port, () => {
    console.log(`Analyzer Shape HTTP server on http://localhost:${port}`);
  });
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
