import { getKafka } from "../kafka/client.js";
import { config } from "../shared/config.js";
import { createApp } from "./controller.js";

const port = config.ports.detector;

async function main() {
  const kafka = getKafka();
  const producer = kafka.producer();
  await producer.connect();

  const app = createApp(producer);
  app.listen(port, () => {
    console.log(`Detector HTTP server on http://localhost:${port} (POST /detections with { bottleId, imageUrl? })`);
  });
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
