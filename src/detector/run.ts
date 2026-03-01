import express, { type Request, type Response } from "express";
import { getKafka } from "../kafka/client.js";
import { config } from "../shared/config.js";
import type { BottleDetected } from "../shared/types.js";

const TOPIC = config.topics.bottleDetected;
const port = config.ports.detector;

const app = express();
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true, service: "detector" });
});

async function main() {
  const kafka = getKafka();
  const producer = kafka.producer();
  await producer.connect();

  /** POST /detections — body: { bottleId: string, imageUrl?: string }. timestamp and imageUrl (default) filled on request. */
  app.post("/detections", (req: Request, res: Response) => {
    const bottleId = req.body?.bottleId;
    if (typeof bottleId !== "string" || !bottleId.trim()) {
      return res.status(400).json({ error: "bottleId (string) required" });
    }
    const now = new Date().toISOString();
    const payload: BottleDetected = {
      bottleId: bottleId.trim(),
      timestamp: now,
      imageUrl:
        typeof req.body?.imageUrl === "string" && req.body.imageUrl.trim()
          ? req.body.imageUrl.trim()
          : `https://example.com/capture/${bottleId.trim()}.jpg`,
    };
    producer
      .send({
        topic: TOPIC,
        messages: [{ key: payload.bottleId, value: JSON.stringify(payload) }],
      })
      .then(() => {
        console.log("Detected:", payload.bottleId);
        res.status(201).json(payload);
      })
      .catch((e: unknown) => {
        console.error("Send error:", e);
        res.status(502).json({ error: "Failed to publish detection" });
      });
  });

  app.listen(port, () => {
    console.log(`Detector HTTP server on http://localhost:${port} (POST /detections with { bottleId, imageUrl? })`);
  });
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
