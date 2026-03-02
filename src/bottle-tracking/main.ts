import { config } from "../shared/config";
import { runApp } from "../shared/appFactory";
import { createApp } from "./app";
import { TrackerBootstrapService } from "./bootstrapService";

const app = createApp();

runApp({
  port: config.ports.tracker,
  app,
  bootstrapService: new TrackerBootstrapService(),
}).catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
