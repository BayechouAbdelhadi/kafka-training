import { config } from "../shared/config.js";
import { runApp } from "../shared/appFactory.js";
import { createApp } from "./app.js";
import { AnalyzerLabelBootstrapService } from "./bootstrapService.js";

runApp({
  port: config.ports.analyzerLabel,
  createApp,
  bootstrapService: new AnalyzerLabelBootstrapService(),
}).catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
