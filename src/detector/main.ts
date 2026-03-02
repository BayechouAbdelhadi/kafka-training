import { config } from "../shared/config";
import { runApp } from "../shared/appFactory";
import { createApp } from "./app";
import { DetectorBootstrapService } from "./bootstrapService";

const app = createApp();
runApp({
  port: config.ports.detector,
  app,
  bootstrapService: new DetectorBootstrapService(),
 }).catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
