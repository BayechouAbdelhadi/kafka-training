import { Router, type Request, type Response } from "express";
import * as repository from "../repository";

const router = Router();
router.get("/", (_req: Request, res: Response) => {
  res.json(repository.getStats());
});
export const statsRouter = router;
