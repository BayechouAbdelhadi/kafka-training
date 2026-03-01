import express from "express";
import type { Producer } from "kafkajs";
import { detectionsRouter } from "./routes/detections.js";
import { healthRouter } from "./routes/health.js";

export function createApp(producer: Producer): express.Express {
  const app = express();
  app.use(express.json());

  app.use("/detections", detectionsRouter(producer));
  app.use("/health", healthRouter("detector"));

  return app;
}
