import { Router, type Request, type Response } from "express";
import type { BottleDetected } from "../../shared/types";
import type { DetectorProcessor } from "../processor";

/** Express app.locals type for detector (set in main). */
export interface DetectorLocals {
  detectorProcessor: DetectorProcessor;
}

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const processor = (req.app.locals as DetectorLocals).detectorProcessor;
  if (!processor) {
    return res.status(503).json({ error: "Detector processor not ready" });
  }
  const bottleId = req.body?.bottleId;
  if (typeof bottleId !== "string" || !bottleId.trim()) {
    return res.status(400).json({ error: "bottleId (string) required" });
  }
  const imageUrl = req.body?.imageUrl;
 
  const result = await processor.process(bottleId, imageUrl);
  
  if (!result) {
    return res.status(502).json({ error: "Failed to process detection" });
  }

  const payload = result as BottleDetected;
  console.log("Detected:", payload.bottleId);
  res.status(201).json(payload);
});

export const detectionsRouter = router;
