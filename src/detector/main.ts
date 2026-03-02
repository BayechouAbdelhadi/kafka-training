import { config } from "../shared/config.js";
import { runApp } from "../shared/appFactory.js";
import { createApp } from "./app.js";
import { DetectorBootstrapService } from "./bootstrapService.js";

runApp({
  port: config.ports.detector,
  createApp,
  bootstrapService: new DetectorBootstrapService(),
 }).catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
