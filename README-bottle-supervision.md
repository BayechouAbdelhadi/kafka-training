# Bottle supervision (Step 5)

Event-driven bottle production supervision with **Confluent Schema Registry** and **Avro**: **Detector** → `bottle.detected` → **Analyzers** → `bottle.analysis.result` → **Automation** → `bottle.rejected`. **Tracker** consumes all three topics, updates an in-memory DB, and exposes HTTP API (bottles, stats, Swagger).

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

2. **Tracker** (consumes all topics, updates DB, HTTP API + Swagger at http://localhost:3030/api-docs), port 3030:  
   `npm run tracker` or `npm run dev:tracker`

3. **Detector** (POST `/detections` to produce `bottle.detected`), port 3010:  
   `npm run detector` or `npm run dev:detector`  
   Body: `{ "bottleId": "bottle-0001", "imageUrl": "https://..." }` (imageUrl optional; timestamp filled on receive).

4. **Analyzers** (three independent Express apps; one per consumer group):  
   `npm run analyzer-cap` (port 3011) or `npm run dev:analyzer-cap`  
   `npm run analyzer-label` (port 3012) or `npm run dev:analyzer-label`  
   `npm run analyzer-shape` (port 3013) or `npm run dev:analyzer-shape`

5. **Automation** (consumes analysis results, produces `bottle.rejected` when any analysis fails), port 3020:  
   `npm run automation` or `npm run dev:automation`

Recommended order: start **tracker** first, then **detector**, then the three **analyzers**, then **automation**. Open http://localhost:3030/api-docs and http://localhost:3030/bottles to see state.

---

## Schema Registry (Step 5)

Messages are **Avro**-encoded and registered in **Confluent Schema Registry**. Schema Registry runs in Docker (`http://localhost:8081`). Each event type has one Avro schema in `avro/` and one helper class in `src/shared/schemaRegistry.ts` that registers the schema and uses `@confluentinc/schemaregistry` to serialize/deserialize.

### How to run with Schema Registry

1. Start infrastructure: `docker compose up -d` (Kafka + Schema Registry on 8081).
2. Create topics: `scripts/create-topics-bottle-supervision.sh` or `.cmd`.
3. Run all apps: `npm run start` or `npm run debug`.

Override Schema Registry URL with `SCHEMA_REGISTRY_URL` (default `http://localhost:8081`).

### How to test

1. **Produce a detection:** `POST http://localhost:3010/detections` with body `{ "bottleId": "bottle-0001" }` (use `detector.http`).
2. Wait ~1–2 seconds for events to flow through analyzers and automation.
3. **Read state:** `GET http://localhost:3030/bottles`, `/bottles/bottle-0001`, `/bottles/status/detected`, `/stats`, `/health`; Swagger at http://localhost:3030/api-docs (use `tracker.http`).
4. **Inspect registry:** `curl http://localhost:8081/subjects` — expect `bottle.detected-value`, `bottle.analysis.result-value`, `bottle.rejected-value` after messages are produced.

### Schemas

| Topic | Subject (registry) | Schema file | Description |
|-------|--------------------|------------|-------------|
| `bottle.detected` | `bottle.detected-value` | `avro/BottleDetected.avsc` | Emitted when a bottle is captured. Fields: `bottleId`, `timestamp` (ISO-8601), `imageUrl`. |
| `bottle.analysis.result` | `bottle.analysis.result-value` | `avro/BottleAnalysisResult.avsc` | One result per analyzer. Fields: `bottleId`, `analyzer` (cap/label/shape), `passed`, `timestamp`, optional `details`. |
| `bottle.rejected` | `bottle.rejected-value` | `avro/BottleRejected.avsc` | Emitted when automation rejects a bottle. Fields: `bottleId`, `reason`, `timestamp`. |

### What each app does

| App | Consumes | Produces | Process |
|-----|----------|----------|---------|
| **Detector** | — | `bottle.detected` | HTTP `POST /detections` with `bottleId` (and optional `imageUrl`). Builds a `BottleDetected` payload, serializes with Avro, sends to `bottle.detected`. |
| **Analyzer (cap / label / shape)** | `bottle.detected` | `bottle.analysis.result` | Deserializes `BottleDetected`, runs a simple check (e.g. random pass/fail), builds `BottleAnalysisResult`, serializes and sends to `bottle.analysis.result`. Each analyzer has its own consumer group. |
| **Automation** | `bottle.analysis.result` | `bottle.rejected` | Deserializes each `BottleAnalysisResult`. If `passed === false`, builds `BottleRejected`, serializes and sends to `bottle.rejected`. One reject message per failed result. |
| **Tracker** | `bottle.detected`, `bottle.analysis.result`, `bottle.rejected` | — | Deserializes by topic (right Avro helper per topic). Updates in-memory state: on detected → create bottle; on analysis result → append analyses and set status; on rejected → set status to rejected. Exposes HTTP API (bottles, stats, health, Swagger) from that state. |

---

## Config

- `KAFKA_BOOTSTRAP_SERVERS`: default `localhost:9092,localhost:9094,localhost:9095,localhost:9096`.
- `SCHEMA_REGISTRY_URL`: default `http://localhost:8081`.
- Ports (env override): `DETECTOR_PORT` (3010), `ANALYZER_CAP_PORT` (3011), `ANALYZER_LABEL_PORT` (3012), `ANALYZER_SHAPE_PORT` (3013), `AUTOMATION_PORT` (3020), `TRACKER_PORT` (3030). Copy `.env.example` to `.env` to override.
- Set `KAFKAJS_NO_PARTITIONER_WARNING=1` (e.g. in `.env`) to silence the KafkaJS v2 partitioner warning.

## Troubleshooting

- **Port already in use (EADDRINUSE)**  
  Stop the other process using that port (e.g. a previous `npm run dev` or `npm start`), or set a different port via the corresponding env var (e.g. `DETECTOR_PORT=3011`).

- **UNKNOWN_TOPIC_OR_PARTITION / "This server does not host this topic-partition"**  
  Create the bottle topics before starting the apps: run `scripts/create-topics-bottle-supervision.sh` (or the `.cmd` on Windows) from the project root. Ensure the Kafka cluster is up (`docker compose ps`).

- **getaddrinfo ENOTFOUND kafka-1 (or kafka-2, …)**  
  Ensure you use the main `docker-compose.yml` (with INTERNAL/EXTERNAL listeners) and bootstrap `localhost:9092,localhost:9094,localhost:9095,localhost:9096` from the host. Do not set `KAFKA_BOOTSTRAP_SERVERS` to `kafka-1:9092,...` when running apps on the host.

## Project layout (independent Express.js apps)

- `src/shared` — config, types, in-memory DB, analyzer runner (shared by the three analyzers)
- `src/kafka` — Kafka client
- `src/detector` — Express app; produces bottle.detected (port 3010)
- `src/analyzer-cap` — Express app; consumes bottle.detected, produces bottle.analysis.result (port 3011)
- `src/analyzer-label` — Express app; same for label (port 3012)
- `src/analyzer-shape` — Express app; same for shape (port 3013)
- `src/automation` — Express app; consumes bottle.analysis.result, produces bottle.rejected (port 3020)
- `src/bottle-tracking` — Express app; consumes all three topics, updates DB, HTTP API + Swagger (port 3030)
- `src/shared/schemaRegistry.ts` — Avro + Schema Registry helpers (BottleDetectedAvro, BottleAnalysisResultAvro, BottleRejectedAvro)
