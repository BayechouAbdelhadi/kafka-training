import { config } from "../shared/config.js";
import { runApp } from "../shared/appFactory.js";
import { createApp } from "./app.js";
import { AnalyzerCapBootstrapService } from "./bootstrapService.js";

runApp({
  port: config.ports.analyzerCap,
  createApp,
  bootstrapService: new AnalyzerCapBootstrapService(),
}).catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
