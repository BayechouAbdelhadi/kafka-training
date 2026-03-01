import { config } from "../shared/config.js";
import { createApp } from "./controller.js";
import * as trackerRepository from "./repository.js";
import * as trackerService from "./service.js";

const port = config.ports.tracker;

async function main() {
  await trackerService.startTracker(trackerRepository);

  const app = createApp();
  app.listen(port, () => {
    console.log(`Bottle Tracker HTTP server on http://localhost:${port}`);
  });
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
