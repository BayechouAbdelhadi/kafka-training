import express from "express";
import { bottlesRouter } from "./routes/bottles.js";
import { healthRouter } from "./routes/health.js";
import { statsRouter } from "./routes/stats.js";

export function createApp(): express.Express {
  const app = express();
  app.use(express.json());

  app.use("/bottles", bottlesRouter);
  app.use("/stats", statsRouter);
  app.use("/health", healthRouter);

  return app;
}
