import { config } from "../shared/config";
import { runApp } from "../shared/appFactory";
import { createApp } from "./app";
import { AnalyzerShapeBootstrapService } from "./bootstrapService";

const app = createApp();

runApp({
  port: config.ports.analyzerShape,
  app,
  bootstrapService: new AnalyzerShapeBootstrapService(),
}).catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
