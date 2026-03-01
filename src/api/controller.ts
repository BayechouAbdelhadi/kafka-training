import express, { type Request, type Response } from "express";
import * as bottleService from "./service.js";

export function createApp(): express.Express {
  const app = express();
  app.use(express.json());

  app.get("/bottles", (_req: Request, res: Response) => {
    res.json(bottleService.getAllBottles());
  });

  app.get("/bottles/status/:status", (req: Request, res: Response) => {
    const status = req.params.status as "detected" | "valid" | "to_reject" | "rejected";
    if (!["detected", "valid", "to_reject", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    res.json(bottleService.getBottlesByStatus(status));
  });

  app.get("/bottles/:bottleId", (req: Request, res: Response) => {
    const bottle = bottleService.getBottle(req.params.bottleId);
    if (!bottle) return res.status(404).json({ error: "Not found" });
    res.json(bottle);
  });

  app.get("/stats", (_req: Request, res: Response) => {
    res.json(bottleService.getStats());
  });

  app.get("/health", (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  return app;
}
