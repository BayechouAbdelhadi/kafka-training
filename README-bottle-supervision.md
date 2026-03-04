# Bottle supervision (Step 5)

**Full documentation:** [docs/05-schema.md](docs/05-schema.md)

Event-driven bottle production supervision with **Confluent Schema Registry** and **Avro**: **Detector** → `bottle.detected` → **Analyzers** → `bottle.analysis.result` → **Automation** → `bottle.rejected`. **Tracker** consumes all three topics and exposes the HTTP API (bottles, stats, Swagger at http://localhost:3030).

**Quick start:** Prerequisites (Docker, topics) and install → then run:

```bash
npm run dev
```

See [docs/05-schema.md](docs/05-schema.md) for prerequisites, topic creation, Schema Registry, schemas, app roles (producer/consumer), config, troubleshooting, and project layout.
