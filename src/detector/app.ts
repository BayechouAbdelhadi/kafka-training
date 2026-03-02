import express from "express";
import { detectionsRouter } from "./routes/detections.js";
import { healthRouter } from "./routes/health.js";

/** Create Express app. Attach Kafka producer in main via app.locals.kafkaProducer. */
export function createApp(): express.Express {
  const app = express();
  app.use(express.json());

  app.use("/detections", detectionsRouter);
  app.use("/health", healthRouter("detector"));

  return app;
}
