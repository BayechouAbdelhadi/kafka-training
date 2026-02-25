# Order project

We will build a simple **order-management system**: when an order is created, the system publishes an event to Kafka; two consumers handle **notification** and **invoice**. The database is mocked (save + optional error to mimic failure). Stack: Node.js for the app; Kafka with KRaft in Docker Compose for infrastructure.

Follow the steps below to discover how this is done and explore it in practice.

## Steps

1. [Step 1 — Infrastructure](docs/01-infrastructure.md)
2. [Step 2 — Topics](docs/02-topics.md) *(deep dive; tag when ready)*
3. [Step 3 — Producers](docs/03-producers.md)
4. [Step 4 — Consumers](docs/04-consumers.md)
5. [Step 5 — Schema (Avro)](docs/05-schema.md)

## Preview the docs

From the project root:

```bash
npx docsify-cli serve
```

Then open [http://localhost:3000](http://localhost:3000).
