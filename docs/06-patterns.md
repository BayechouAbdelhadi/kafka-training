# Step 6 — Patterns

**Check out the tag for this step** (when it exists):

```bash
git checkout step-06-patterns
```

This step covers **common patterns** when building event-driven systems with Kafka: consumer and producer patterns, delivery guarantees, error handling, and integration patterns. Prerequisite: Steps 1–5 (Infrastructure, Topics, Producers, Consumers, Schema).

**Copying commands (Docsify):** In Docsify, selecting and copying from code blocks sometimes does not put the command on the clipboard at all. If copy does not work: use the **script** when one is shown, or open the doc or script file in your editor and copy from there, or type the command manually.

---

## What this step covers

- **Consumer patterns** — Single consumer per partition; consumer groups and scaling; at-least-once vs at-most-once vs exactly-once; idempotent processing; replay and reset.
- **Producer patterns** — Fire-and-forget vs synchronous; batching and compression; partitioning by key; exactly-once (idempotence + transactions).
- **Error handling** — Retries; dead-letter topics (DLQ); poison pills; schema compatibility and evolution.
- **Integration patterns** — Event-driven pipelines (like the bottle supervision flow); outbox pattern for dual writes; saga and choreography vs orchestration (conceptual).
- **Operational patterns** — Monitoring offsets and lag; rebalance handling; safe shutdown and graceful disconnect.

---

## Content to cover

*(Expand each area with examples, commands, and references to the bottle-supervision project where relevant.)*

### 1. Consumer patterns

- One consumer per partition within a group; scaling consumers up to the number of partitions.
- At-least-once: process then commit; risk of duplicates on crash after process, before commit.
- At-most-once: commit then process; risk of message loss on crash.
- Idempotent processing: design handlers so duplicate delivery is safe (e.g. by key or idempotency key).
- Offset reset and replay: from beginning vs latest; when and how to reset offsets for reprocessing.

### 2. Producer patterns

- Acks and durability: acks=all with min.insync.replicas for durable writes.
- Idempotent producer: avoid duplicate records on retry.
- Partitioning: same key → same partition for ordering; no key → round-robin.
- Transactions and exactly-once: when needed; producer and consumer configuration.

### 3. Error handling and dead-letter

- Retry with backoff; max retries and when to give up.
- Dead-letter topic (DLQ): send failed messages to a separate topic for inspection or replay.
- Poison pills: messages that always fail; how to skip or isolate them.
- Schema errors: incompatible schema; handling registry errors in producers/consumers.

### 4. Integration patterns

- Event-driven pipeline: producer → topic → consumer → topic → … (as in bottle supervision).
- Outbox pattern: write business event + outbox row in one transaction; separate process reads outbox and publishes to Kafka (avoids dual-write inconsistency).
- Saga (conceptual): distributed workflow across services; compensation on failure; choreography (events) vs orchestration (central coordinator).

### 5. Operational patterns

- Consumer lag: monitor offset lag per partition and per group; alert on high lag.
- Rebalance: avoid long processing in the rebalance callback; commit offsets before slow work.
- Graceful shutdown: leave group, flush producer, close connections.

---

All commands in this step assume you are in the **project root** and the cluster (and Schema Registry, if applicable) is running.
