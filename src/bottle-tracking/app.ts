import express from "express";
import { bottlesRouter } from "./routes/bottles";
import { healthRouter } from "./routes/health";
import { statsRouter } from "./routes/stats";

export function createApp(): express.Express {
  const app = express();
  app.use(express.json());
  app.use("/bottles", bottlesRouter);
  app.use("/stats", statsRouter);
  app.use("/health", healthRouter("bottle-tracker"));
  return app;
}
