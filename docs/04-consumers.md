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

- Auto-commit vs manual commit; commit-before-process (at-most-once) vs commit-after-process (at-least-once, with risk of reprocessing on failure); exactly-once with transactional consumer or idempotent processing.

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

## Exercises (titles — what each will cover)

| # | Exercise title | What it will cover |
|---|----------------|--------------------|
| 1 | **Consumer group and partition assignment** | Start multiple consumers in the same group on a topic with 2+ partitions; show each partition is consumed by one consumer; add/remove consumer and observe rebalance. Takeaway: one partition per consumer in group; scaling = more consumers up to partition count. |
| 2 | **Offsets: committed offset and resume** | Consume some messages, stop consumer, restart with same group; show consumption resumes from committed offset. Compare `auto.offset.reset=earliest` vs `latest` for a new group. Takeaway: committed offset = resume point; no commit = re-read from start (earliest) or miss messages (latest). |
| 3 | **Manual commit and at-least-once** | Disable auto-commit; consume, process, then commit; show that after crash before commit, messages are reprocessed (at-least-once). Takeaway: manual commit after process for at-least-once; idempotent processing to handle duplicates. |
| 4 | **Rebalance (optional)** | Run two consumers in same group; kill one and observe rebalance (brief pause, then remaining consumer gets all partitions). Takeaway: rebalance on join/leave; tune timeouts to avoid false rebalances. |
| 5 | **Conclusion / summary** | Recap: consumer group for scaling; offsets for progress and resume; commit strategy for delivery semantics; rebalance and tuning. Optional table: goal → consumer settings. |

---

---

All commands in this step assume you are in the **project root** and the cluster is running. Use bootstrap `kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092` when using `docker compose exec kafka-1 ...`.
