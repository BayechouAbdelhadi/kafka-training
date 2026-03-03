import { Router, type Request, type Response } from "express";
import * as repository from "../repository";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json(repository.getAllBottles());
});

router.get("/status/:status", (req: Request, res: Response) => {
  const status = req.params.status as "detected" | "valid" | "to_reject" | "rejected";
  if (!["detected", "valid", "to_reject", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  res.json(repository.getBottlesByStatus(status));
});

router.get("/:bottleId", (req: Request, res: Response) => {
  const bottle = repository.getBottle(req.params.bottleId);
  if (!bottle) return res.status(404).json({ error: "Not found" });
  res.json(bottle);
});

export const bottlesRouter = router;
