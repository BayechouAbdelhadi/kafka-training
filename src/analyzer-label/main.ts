import { config } from "../shared/config";
import { runApp } from "../shared/appFactory";
import { createApp } from "./app";
import { AnalyzerLabelBootstrapService } from "./bootstrapService";

const app = createApp();

runApp({
  port: config.ports.analyzerLabel,
  app,
  bootstrapService: new AnalyzerLabelBootstrapService(),
}).catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
