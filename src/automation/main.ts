import { config } from "../shared/config.js";
import { runApp } from "../shared/appFactory.js";
import { createApp } from "./app.js";
import { AutomationBootstrapService } from "./bootstrapService.js";

runApp({
  port: config.ports.automation,
  createApp,
  bootstrapService: new AutomationBootstrapService(),
}).catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
