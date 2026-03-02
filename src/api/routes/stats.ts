import { Router, type Request, type Response } from "express";
import * as bottleService from "../service";

const router = Router();
router.get("/", (_req: Request, res: Response) => {
  res.json(bottleService.getStats());
});
export const statsRouter = router;
