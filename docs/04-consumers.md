# Step 4 — Consumers

**Check out the tag for this step** (when it exists):

```bash
git checkout step-04-consumers
```

This step covers the Kafka consumer: consumer groups, offsets, partition assignment, rebalance, and delivery semantics. Prerequisite: Step 2 (Topics), Step 3 (Producers), and the four-broker cluster.

**Copying commands (Docsify):** In Docsify, selecting and copying from code blocks sometimes does not put the command on the clipboard at all. If copy does not work: use the **script** when one is shown, or open the doc or script file in your editor and copy from there, or type the command manually.

---

## Content to cover

### 1. Role of the consumer

- Reading records from topics; pull model; one consumer can read from multiple partitions, but each partition is consumed by at most one consumer in a group.

### 2. Consumer group

- **Consumer group** (`group.id`): a set of consumers that cooperate to consume one or more topics; each partition is assigned to exactly one consumer in the group; scaling by adding consumers (up to number of partitions).

### 3. Offsets

- **Partition offset**: position of a record in a partition (per-partition, monotonically increasing).
- **Committed offset**: last offset the consumer has committed for a partition (where the group will resume after restart or rebalance).
- **Current position**: next offset to fetch; commit can be automatic (`enable.auto.commit`) or manual (commit after processing for at-least-once processing).

### 4. Offset commit and delivery semantics

**Auto-commit vs manual commit:** With **auto-commit** (`enable.auto.commit=true`), the consumer periodically commits offsets in the background. With **manual commit**, you call `commitSync()` or `commitAsync()` after you have processed records (or at a chosen point). Manual commit gives control over when the “read position” is advanced, which determines delivery semantics.

**Delivery semantics (how to achieve them):**

- **At-most-once** — Commit **before** processing (or use auto-commit with short interval and process after poll). If the consumer crashes after commit but before or during process, the record is lost (never processed). No duplicates, possible loss.
- **At-least-once** — Commit **after** processing. If the consumer crashes after process but before commit, it will reprocess the same records after restart. No loss, but possible **duplicates** (reprocessing). This is the common choice when you can tolerate or deduplicate repeats.
- **Exactly-once** — Each record is processed once. **idempotent processing** (consumer deduplicates by key or id so reprocessing has no effect). More involved to set up; we do not do an exercise here.

We will cover consumer deserialization and schema in practice in the [Step 5 — Schema (Avro)](05-schema.md) step (schema registry, serialization, and deserialization).

### 5. Partition assignment and rebalance

- **Partition assignment**: which consumer in the group reads which partitions (range, round-robin, sticky, cooperative sticky); decided by the group coordinator.
- **Rebalance**: when consumers join or leave the group, partitions are reassigned; during rebalance, consumption may pause; avoid unnecessary rebalances (e.g. long `session.timeout.ms`, `max.poll.interval.ms`).

### 6. Deserialization

- Key and value arrive as bytes; consumer must deserialize using `key.deserializer` and `value.deserializer` (must match producer serialization).

### 7. Where to start reading: auto.offset.reset

- When the group has no committed offset (new group or new partition): `earliest` (from beginning) vs `latest` (only new messages); default and when to use each.

### 8. Key consumer settings

- Reference: `bootstrap.servers`, `group.id`, `enable.auto.commit`, `auto.commit.interval.ms`, `auto.offset.reset`, `session.timeout.ms`, `max.poll.interval.ms`, `fetch.min.bytes`, `key.deserializer`, `value.deserializer`.

### 9. Traps and best practices

- Committing before processing (losing messages on failure); committing too early (duplicate processing); long processing between polls causing rebalance (`max.poll.interval.ms`); not handling rebalance (duplicates or gaps); mixing different `group.id` for same logical app.

---

**Next:** [Step 5 — Schema (Avro)](docs/05-schema.md) — Avro schema, creation, evolution, compatibility, serialization and schema storing, deserialization.

---

All commands in this step assume you are in the **project root** and the cluster is running. Use bootstrap `kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092` when using `docker compose exec kafka-1 ...`.
