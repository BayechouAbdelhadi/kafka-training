import { config } from "../shared/config.js";
import { createApp } from "./app.js";
import * as automationService from "./service.js";

const port = config.ports.automation;

async function main() {
  await automationService.startAutomation();

  const app = createApp();
  app.listen(port, () => {
    console.log(`Automation HTTP server on http://localhost:${port}`);
  });
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
