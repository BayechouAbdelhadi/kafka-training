import express, { type Request, type Response } from "express";
import type { Producer } from "kafkajs";
import * as detectorService from "./service.js";

export function createApp(producer: Producer): express.Express {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req: Request, res: Response) => {
    res.json({ ok: true, service: "detector" });
  });

  app.post("/detections", (req: Request, res: Response) => {
    const bottleId = req.body?.bottleId;
    if (typeof bottleId !== "string" || !bottleId.trim()) {
      return res.status(400).json({ error: "bottleId (string) required" });
    }
    const imageUrl = req.body?.imageUrl;
    detectorService
      .publishDetection(producer, bottleId, imageUrl)
      .then((payload) => {
        console.log("Detected:", payload.bottleId);
        res.status(201).json(payload);
      })
      .catch((e: unknown) => {
        console.error("Send error:", e);
        res.status(502).json({ error: "Failed to publish detection" });
      });
  });

  return app;
}
