import { config } from "../shared/config";
import { runApp } from "../shared/appFactory";
import { createApp } from "./app";
import { AutomationBootstrapService } from "./bootstrapService";

const app = createApp();

runApp({
  port: config.ports.automation,
  app,
  bootstrapService: new AutomationBootstrapService(),
}).catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
