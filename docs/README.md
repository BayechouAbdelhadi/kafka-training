# Kafka training

A step-by-step **Kafka training**: run a cluster, configure topics, then explore **producers**, **consumers**, and **schema** (Avro). Infrastructure is Kafka with KRaft in Docker Compose; you use the Kafka console tools and scripts to produce, consume, and try different settings.

Follow the steps below to learn by doing.

> **Docker network — "Resource is still in use"**  
> If you see a message like `! Network kafka-training_default - Resource is still in use` when running `docker compose down` (or similar), the network is still attached to containers. **Inspect** which containers use it (`docker network inspect kafka-training_default`), **stop** (or disconnect) those containers, then **remove** the network (`docker network rm kafka-training_default`). After that you can run `docker compose up -d` again.

## Steps

1. [Step 1 — Infrastructure](docs/01-infrastructure.md)
2. [Step 2 — Topics](docs/02-topics.md)
3. [Step 3 — Producers](docs/03-producers.md)
4. [Step 4 — Consumers](docs/04-consumers.md)
5. [Step 5 — Schema (Avro)](docs/05-schema.md)

## Preview the docs

From the project root:

```bash
npx docsify-cli serve
```

Then open [http://localhost:3000](http://localhost:3000).
