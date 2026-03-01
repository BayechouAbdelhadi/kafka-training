# Bottle supervision (Step 5)

Event-driven bottle production supervision: **Detector** → `bottle.detected` → **Analyzers** → `bottle.analysis.result` → **Automation** → `bottle.rejected`. **Bottle tracker** consumes all three topics and updates an in-memory DB; **REST API** (Swagger) reads from the DB.

## Prerequisites

- Node.js 18+
- Docker. Start Kafka from project root:

  ```bash
  docker compose up -d
  ```

  Wait ~30s. The Compose exposes **INTERNAL** (kafka-1:9092, for containers) and **EXTERNAL** (localhost:9092,9094,9095,9096, for host-side apps). Use bootstrap `localhost:9092,localhost:9094,localhost:9095,localhost:9096` when running the bottle apps on your host.

  Create the bottle topics once:

  ```bash
  # Linux/macOS
  sh scripts/create-topics-bottle-supervision.sh
  # Windows
  scripts\create-topics-bottle-supervision.cmd
  ```

## Install and build

```bash
npm install
npm run build
```

## Run

Run each service in its own terminal (or use the dev scripts with `tsx` so you don’t need to rebuild).

1. **Create topics** (once): run `scripts/create-topics-bottle-supervision.sh` (Linux/macOS) or `scripts\create-topics-bottle-supervision.cmd` (Windows) from project root.

2. **Tracker** (consumes all topics, updates DB), port 3030:  
   `npm run tracker` or `npm run dev:tracker`

3. **REST API** (reads from DB; Swagger at http://localhost:3000/api-docs), port 3000:  
   `npm run api` or `npm run dev:api`

4. **Detector** (POST `/detections` to produce `bottle.detected`), port 3001:  
   `npm run detector` or `npm run dev:detector`  
   Body: `{ "bottleId": "bottle-0001", "imageUrl": "https://..." }` (imageUrl optional; timestamp filled on receive).

5. **Analyzers** (three independent Express apps; one per consumer group):  
   `npm run analyzer-cap` (port 3011) or `npm run dev:analyzer-cap`  
   `npm run analyzer-label` (port 3012) or `npm run dev:analyzer-label`  
   `npm run analyzer-shape` (port 3013) or `npm run dev:analyzer-shape`

6. **Automation** (consumes analysis results, produces `bottle.rejected` when any analysis fails), port 3020:  
   `npm run automation` or `npm run dev:automation`

Recommended order: start **tracker** and **api** first, then **detector**, then the three **analyzers**, then **automation**. Open http://localhost:3000/api-docs and http://localhost:3000/bottles to see state.

## Config

- `KAFKA_BOOTSTRAP_SERVERS`: default `localhost:9092,localhost:9094,localhost:9095,localhost:9096` (from host).
- Ports (env override): `API_PORT` (3000), `DETECTOR_PORT` (3001), `ANALYZER_CAP_PORT` (3011), `ANALYZER_LABEL_PORT` (3012), `ANALYZER_SHAPE_PORT` (3013), `AUTOMATION_PORT` (3020), `TRACKER_PORT` (3030). Copy `.env.example` to `.env` to override.
- Set `KAFKAJS_NO_PARTITIONER_WARNING=1` (e.g. in `.env`) to silence the KafkaJS v2 partitioner warning.

## Troubleshooting

- **Port already in use (EADDRINUSE)**  
  Stop the other process using that port (e.g. a previous `npm run dev` or `npm start`), or set a different port via the corresponding env var (e.g. `API_PORT=3010`).

- **UNKNOWN_TOPIC_OR_PARTITION / "This server does not host this topic-partition"**  
  Create the bottle topics before starting the apps: run `scripts/create-topics-bottle-supervision.sh` (or the `.cmd` on Windows) from the project root. Ensure the Kafka cluster is up (`docker compose ps`).

- **getaddrinfo ENOTFOUND kafka-1 (or kafka-2, …)**  
  Ensure you use the main `docker-compose.yml` (with INTERNAL/EXTERNAL listeners) and bootstrap `localhost:9092,localhost:9094,localhost:9095,localhost:9096` from the host. Do not set `KAFKA_BOOTSTRAP_SERVERS` to `kafka-1:9092,...` when running apps on the host.

## Project layout (independent Express.js apps)

- `src/shared` — config, types, in-memory DB, analyzer runner (shared by the three analyzers)
- `src/kafka` — Kafka client
- `src/detector` — Express app; produces bottle.detected (port 3001)
- `src/analyzer-cap` — Express app; consumes bottle.detected, produces bottle.analysis.result (port 3011)
- `src/analyzer-label` — Express app; same for label (port 3012)
- `src/analyzer-shape` — Express app; same for shape (port 3013)
- `src/automation` — Express app; consumes bottle.analysis.result, produces bottle.rejected (port 3020)
- `src/bottle-tracking` — Express app; consumes all three topics, updates DB (port 3030)
- `src/api` — Express.js + Swagger, reads from DB (port 3000)
