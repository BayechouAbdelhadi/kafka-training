# Order project — Step-by-step training

This training builds a simple **order-management system**: when an order is created, the system publishes an event to Kafka; two consumers handle **notification** and **invoice**. The database is mocked (save + optional error to mimic failure).

**Stack:** Node.js for the app; Kafka with KRaft in Docker Compose for infrastructure.

## How to follow

- **By branch:** Check out each step branch in order to see the code at that stage:
  - `step-01-infrastructure` → Kafka KRaft in Docker Compose
  - `step-02-topics` → Topic creation and documentation
  - `step-03-order-service` → Node app + mock DB (later)
  - `step-04-producer` → Produce order events (later)
  - `step-05-consumer-notification` → Notification consumer (later)
  - `step-06-consumer-invoice` → Invoice consumer (later)
- **On main:** After each step is merged, `main` contains the cumulative result. You can also follow by reading the docs and looking at `main`.

## Steps

| Step | Branch | Content |
|------|--------|--------|
| 1 | [step-01-infrastructure](01-infrastructure.md) | Docker Compose: Kafka KRaft only |
| 2 | [step-02-topics](02-topics.md) | Topic creation + docs (partitions, replication, usage) |
| 3 | step-03-order-service | Node app skeleton + mock DB |
| 4 | step-04-producer | Order API produces event to topic |
| 5 | step-05-consumer-notification | Notification consumer |
| 6 | step-06-consumer-invoice | Invoice consumer |

## Preview the docs

From the project root:

```bash
npx docsify-cli serve
```

Then open [http://localhost:3000](http://localhost:3000).
