import { config } from "../shared/config.js";
import { runApp } from "../shared/appFactory.js";
import { createApp } from "./app.js";
import { TrackerBootstrapService } from "./bootstrapService.js";

runApp({
  port: config.ports.tracker,
  createApp,
  bootstrapService: new TrackerBootstrapService(),
}).catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
