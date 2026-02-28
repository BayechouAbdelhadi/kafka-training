# Step 4 — Consumers

**Check out the tag for this step** (when it exists):

```bash
git checkout step-04-consumers
```

This step covers the Kafka consumer: consumer groups, offsets, partition assignment, rebalance, and delivery semantics. Prerequisite: Step 2 (Topics), Step 3 (Producers), and the four-broker cluster.

**Copying commands (Docsify):** In Docsify, selecting and copying from code blocks sometimes does not put the command on the clipboard at all. If copy does not work: use the **script** when one is shown, or open the doc or script file in your editor and copy from there, or type the command manually.

---

## Topic for this step: order-topic

Consumer exercises in this step use one topic: **order-topic** (e.g. order events). Create it once from the **project root** with **3 partitions** and replication factor 1. With 3 partitions we can run **two consumer groups** on the same topic — for example **notification-sender** and **inventory-manager** — so each group consumes the full stream independently (typical pattern: one topic, multiple groups for different use cases).

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
sh scripts/create-topic-order-topic.sh
```

Or by hand:

```bash
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create \
  --topic order-topic \
  --partitions 3 \
  --replication-factor 1 \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tab:Windows -->

```batch
scripts\create-topic-order-topic.cmd
```

Or by hand:

```batch
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create --topic order-topic --partitions 3 --replication-factor 1 --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tabs:end -->

---

## Content to cover

### 1. Role of the consumer

The consumer **reads** records from one or more topics. Kafka uses a **pull** model: the consumer requests data from the broker (no broker push). That gives the consumer control over pace and batching.

A single consumer instance can read from **multiple partitions** (e.g. one consumer reading partitions 0 and 1 of a topic). Within a **consumer group**, each partition is assigned to **at most one** consumer; so partitions are shared across the group without overlap. That is how you scale consumption (add consumers up to the number of partitions) and avoid duplicate processing of the same partition.

### 2. Consumer group

A **consumer group** (`group.id`) is a set of consumers that cooperate to consume one or more topics. Each partition is assigned to **exactly one** consumer in the group; you scale by adding consumers (up to the number of partitions). Different groups consume the **same** topic independently — each group gets its own copy of the stream.

#### 2.1 Two groups, two members each (CLI)

Create the topic first (see above). **First**, run the **producer script** in one terminal so messages are sent to **order-topic** (one per second, key=user, value=order-N). **Then** open **four** more terminals and run the four consumers (two per group).

**Step 1 — Run the producer** (one terminal; leave it running):

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
sh scripts/produce-one-per-second-order-topic.sh
```

<!-- tab:Windows -->

```batch
scripts\produce-one-per-second-order-topic.cmd
```

<!-- tabs:end -->

The script uses a fixed list of users as keys (**user-alice**, **user-bob**, **user-carol**) in round-robin and sends `key:order-N`.

**Step 2 — Run the four consumers** (one consumer per terminal):

**Group `notification-sender` — member 1 and 2:**  
Run in terminal 2 and terminal 3 (same command; same `group.id`):

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec -it kafka-1 /opt/kafka/bin/kafka-console-consumer.sh \
  --topic order-topic \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092 \
  --group notification-sender \
  --from-beginning \
  --property print.key=true \
  --property key.separator=:
```

<!-- tab:Windows -->

```batch
docker compose exec -it kafka-1 /opt/kafka/bin/kafka-console-consumer.sh --topic order-topic --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092 --group notification-sender --from-beginning --property print.key=true --property key.separator=:
```

<!-- tabs:end -->

**Group `inventory-manager` — member 1 and 2:**  
Run the same in terminal 4 and terminal 5, but with `--group inventory-manager`:

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec -it kafka-1 /opt/kafka/bin/kafka-console-consumer.sh \
  --topic order-topic \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092 \
  --group inventory-manager \
  --from-beginning \
  --property print.key=true \
  --property key.separator=:
```

<!-- tab:Windows -->

```batch
docker compose exec -it kafka-1 /opt/kafka/bin/kafka-console-consumer.sh --topic order-topic --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092 --group inventory-manager --from-beginning --property print.key=true --property key.separator=:
```

<!-- tabs:end -->

With **3 partitions** and **2 consumers per group**, Kafka assigns e.g. 2 partitions to one consumer and 1 to the other in each group. You will see each message in **both** groups (once in notification-sender, once in inventory-manager), and within each group only **one** of the two members gets each message. Stop the producer and the consumers with **Ctrl+C**.

### 3. Offsets

- **Partition offset** — Position of a record in a partition (per-partition, monotonically increasing). Each record has an offset in its partition.
- **Committed offset** — The last offset the consumer group has **committed** for a partition. After a restart or rebalance, the group resumes from this offset. Stored in the internal topic `__consumer_offsets`.
- **Current position** — The next offset the consumer will fetch. It advances as the consumer reads and (with auto-commit or after manual commit) as offsets are committed. Commit can be **automatic** (`enable.auto.commit`) or **manual** (commit after processing for at-least-once).

#### 3.1 Displaying committed offsets (CLI)

To **track or display** committed offsets for a consumer group, use **`kafka-consumer-groups.sh --describe`**. It shows per partition: **CURRENT-OFFSET** (the committed offset; next record to read is at this offset), **LOG-END-OFFSET** (latest offset in the partition), and **LAG** (how many records the group has not yet consumed).

Example for the **notification-sender** group (create the topic and run at least one consumer in that group first, then run describe):

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec kafka-1 /opt/kafka/bin/kafka-consumer-groups.sh \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092 \
  --group notification-sender \
  --describe
```

<!-- tab:Windows -->

```batch
docker compose exec kafka-1 /opt/kafka/bin/kafka-consumer-groups.sh --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092 --group notification-sender --describe
```

<!-- tabs:end -->

Example output (topic **order-topic**, 3 partitions):

| TOPIC        | PARTITION | CURRENT-OFFSET | LOG-END-OFFSET | LAG   |
|--------------|-----------|----------------|----------------|-------|
| order-topic  | 0         | 5              | 5              | 0     |
| order-topic  | 1         | 4              | 4              | 0     |
| order-topic  | 2         | 6              | 6              | 0     |

**CURRENT-OFFSET** is the committed offset (the group will read from this offset next). **LAG** 0 means the group is caught up; if LAG &gt; 0, the group has records left to consume. Run describe again after producing or consuming to see offsets and lag change.

### 4. Offset commit and delivery semantics

**Auto-commit vs manual commit:** With **auto-commit** (`enable.auto.commit=true`), the consumer periodically commits offsets in the background. With **manual commit**, you call `commitSync()` or `commitAsync()` after you have processed records (or at a chosen point). Manual commit gives control over when the “read position” is advanced, which determines delivery semantics.

**Delivery semantics (how to achieve them):**

- **At-most-once** — Commit **before** processing (or use auto-commit with short interval and process after poll). If the consumer crashes after commit but before or during process, the record is lost (never processed). No duplicates, possible loss.
- **At-least-once** — Commit **after** processing. If the consumer crashes after process but before commit, it will reprocess the same records after restart. No loss, but possible **duplicates** (reprocessing). This is the common choice when you can tolerate or deduplicate repeats.
- **Exactly-once** — Each record is processed once. **idempotent processing** (consumer deduplicates by key or id so reprocessing has no effect). More involved to set up; we do not do an exercise here.

We will cover consumer deserialization and schema in practice in the [Step 5 — Schema (Avro)](docs/05-schema.md) step (schema registry, serialization, and deserialization).

### 5. Partition assignment and rebalance

- **Partition assignment**: which consumer in the group reads which partitions (range, round-robin, sticky, cooperative sticky); decided by the group coordinator.
- **Rebalance**: when consumers join or leave the group, partitions are reassigned; during rebalance, consumption may pause; avoid unnecessary rebalances (e.g. long `session.timeout.ms`, `max.poll.interval.ms`).

### 6. Deserialization

Records in Kafka are stored as **bytes**. The consumer must **deserialize** key and value using `key.deserializer` and `value.deserializer`; they must match the producer’s serialization (e.g. both sides use String, or both use Avro). Mismatched serialization leads to wrong data or deserialization errors. Deserialization and schema (including Schema Registry and Avro) are covered in practice in the [Step 5 — Schema (Avro)](docs/05-schema.md) step.

### 7. Where to start reading: auto.offset.reset

When the group has **no committed offset** (new group or new partition), **`auto.offset.reset`** tells the consumer where to start:

- **`earliest`** — Start from the beginning of the partition (smallest offset); use when you need to process all existing messages (e.g. backfill, replay).
- **`latest`** — Start from the end (only new messages); use when you only care about data produced after the consumer joins (default in many clients).
- **`none`** — Do not auto-seek; if no offset exists, the consumer throws; use when you require an explicit committed offset and want to fail instead of guessing.

Default is often **`latest`**; set **`earliest`** if you want to read from the beginning when the group is new.

### 8. Key consumer settings

- Reference: `bootstrap.servers`, `group.id`, `enable.auto.commit`, `auto.commit.interval.ms`, `auto.offset.reset`, `session.timeout.ms`, `max.poll.interval.ms`, `fetch.min.bytes`, `key.deserializer`, `value.deserializer`.

### 9. Traps and best practices

- Committing before processing (losing messages on failure); committing too early (duplicate processing); long processing between polls causing rebalance (`max.poll.interval.ms`); not handling rebalance (duplicates or gaps); mixing different `group.id` for same logical app.

---

**Next:** [Step 5 — Schema (Avro)](docs/05-schema.md) — Avro schema, creation, evolution, compatibility, serialization and schema storing, deserialization.

---

All commands in this step assume you are in the **project root** and the cluster is running. Use bootstrap `kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092` when using `docker compose exec kafka-1 ...`.
