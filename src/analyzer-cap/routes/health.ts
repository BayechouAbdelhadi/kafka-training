import { Router, type Request, type Response } from "express";

export function healthRouter(serviceName: string): Router {
  const router = Router();
  router.get("/", (_req: Request, res: Response) => {
    res.json({ ok: true, service: serviceName });
  });
  return router;
}
