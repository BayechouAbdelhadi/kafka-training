import { config } from "../shared/config";
import { runApp } from "../shared/appFactory";
import { createApp } from "./app";
import { AnalyzerCapBootstrapService } from "./bootstrapService";

const app = createApp();

runApp({
  port: config.ports.analyzerCap,
  app,
  bootstrapService: new AnalyzerCapBootstrapService(),
}).catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
