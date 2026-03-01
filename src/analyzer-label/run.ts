import { config } from "../shared/config.js";
import { createApp } from "./controller.js";
import * as analyzerService from "./service.js";

const port = config.ports.analyzerLabel;

async function main() {
  await analyzerService.startAnalyzer();

  const app = createApp();
  app.listen(port, () => {
    console.log(`Analyzer Label HTTP server on http://localhost:${port}`);
  });
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
