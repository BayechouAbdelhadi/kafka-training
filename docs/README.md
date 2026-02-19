# Order project

We will build a simple **order-management system**: when an order is created, the system publishes an event to Kafka; two consumers handle **notification** and **invoice**. The database is mocked (save + optional error to mimic failure). Stack: Node.js for the app; Kafka with KRaft in Docker Compose for infrastructure.

Follow the steps below to discover how this is done and explore it in practice.

## Steps

1. [Step 1 — Infrastructure](01-infrastructure.md)


## Preview the docs

From the project root:

```bash
npx docsify-cli serve
```

Then open [http://localhost:3000](http://localhost:3000).
