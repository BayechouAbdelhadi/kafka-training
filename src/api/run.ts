import express, { type Request, type Response } from "express";
import swaggerUi from "swagger-ui-express";
import { config } from "../shared/config.js";
import * as db from "../shared/db.js";

// REST API built with Express.js
const app = express();
app.use(express.json());

const swaggerDoc = {
  openapi: "3.0.0",
  info: { title: "Bottle Supervision API", version: "1.0.0" },
  paths: {
    "/bottles": {
      get: {
        summary: "List all bottles",
        responses: { "200": { description: "List of bottle states" } },
      },
    },
    "/bottles/{bottleId}": {
      get: {
        summary: "Get bottle by ID",
        parameters: [{ name: "bottleId", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Bottle state" }, "404": { description: "Not found" } },
      },
    },
    "/bottles/status/{status}": {
      get: {
        summary: "List bottles by status",
        parameters: [
          { name: "status", in: "path", required: true, schema: { type: "string", enum: ["detected", "valid", "to_reject", "rejected"] } },
        ],
        responses: { "200": { description: "List of bottle states" } },
      },
    },
    "/stats": {
      get: {
        summary: "Counts by status",
        responses: { "200": { description: "Counts" } },
      },
    },
  },
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get("/bottles", (_req: Request, res: Response) => {
  res.json(db.getAllBottles());
});

app.get("/bottles/status/:status", (req: Request, res: Response) => {
  const status = req.params.status as "detected" | "valid" | "to_reject" | "rejected";
  if (!["detected", "valid", "to_reject", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  res.json(db.getBottlesByStatus(status));
});

app.get("/bottles/:bottleId", (req: Request, res: Response) => {
  const bottle = db.getBottle(req.params.bottleId);
  if (!bottle) return res.status(404).json({ error: "Not found" });
  res.json(bottle);
});

app.get("/stats", (_req: Request, res: Response) => {
  const all = db.getAllBottles();
  const counts = { detected: 0, valid: 0, to_reject: 0, rejected: 0 };
  for (const b of all) counts[b.status] += 1;
  res.json(counts);
});

app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

const port = config.ports.api;
const server = app.listen(port, () => {
  console.log(`REST API listening on http://localhost:${port}; Swagger at http://localhost:${port}/api-docs`);
});
server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Stop the other process or set API_PORT to a different port.`);
    process.exit(1);
  }
  throw err;
});
