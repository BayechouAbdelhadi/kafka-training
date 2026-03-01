import express, { type Request, type Response } from "express";

export function createApp(): express.Express {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req: Request, res: Response) => {
    res.json({ ok: true, service: "automation" });
  });

  return app;
}
