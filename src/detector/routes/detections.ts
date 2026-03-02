import { Router, type Request, type Response } from "express";
import type { BottleDetectedProducer } from "../../kafka/producers/BottleDetectedProducer";
import * as detectorService from "../service";

/** Express app.locals type for detector (set in main). */
export interface DetectorLocals {
  kafkaProducer: BottleDetectedProducer;
}

const router = Router();

router.post("/", (req: Request, res: Response) => {
  const producer = (req.app.locals as DetectorLocals).kafkaProducer;
  if (!producer) {
    return res.status(503).json({ error: "Kafka producer not ready" });
  }
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

export const detectionsRouter = router;
