import { config } from "../shared/config.js";
import { runApp } from "../shared/appFactory.js";
import { createApp } from "./app.js";
import { AnalyzerShapeBootstrapService } from "./bootstrapService.js";

runApp({
  port: config.ports.analyzerShape,
  createApp,
  bootstrapService: new AnalyzerShapeBootstrapService(),
}).catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
