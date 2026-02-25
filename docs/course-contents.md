# Course contents

A quick map of what each step covers. Use this page to jump to a step or to see the full picture.

---

## Step 1 — [Infrastructure](docs/01-infrastructure.md)

Run Kafka (single-node KRaft), create a topic, produce messages, inspect storage.

| Area | Covered |
|------|--------|
| **Cluster** | Single-node Kafka with KRaft; Docker Compose |
| **Topics** | Create topic, describe, partitions, replication |
| **Produce / consume** | Console producer, console consumer (basics) |
| **Storage** | Log segments, partition directories, offsets |
| **Other** | Auto topic creation; cleanup |

---

## Step 2 — [Topics](docs/02-topics.md)

Four-broker cluster; partitioning, keys, replication, min ISR, cleanup policies.

| Area | Covered |
|------|--------|
| **Partitions** | Distribution across brokers; partition count; add partitions (cannot reduce) |
| **Keys** | Same key → same partition; ordering per partition; no key → round-robin (order not kept) |
| **Replication** | Replication factor; Replicas and ISR |
| **Durability** | min.insync.replicas; acks=all and produce failure when ISR shrinks |
| **Cleanup** | delete vs compact; only closed segments; traps (async, open segment, tombstone) |
| **Conclusion** | Configuring for scalability, fault tolerance, durability, delivery guarantees |

---

## Step 3 — [Producers](docs/03-producers.md)

Acks, retries, serialization, partitioning, idempotence, in-flight requests, compression.

| Area | Covered |
|------|--------|
| **Role** | Sending records; batching |
| **Partitioning** | Producer chooses strategy (default: key hash or round-robin) |
| **Durability** | acks=0, acks=1, acks=all; link to topic min.insync.replicas |
| **Retries** | retries, retry.backoff.ms; retryable vs non-retryable errors |
| **Serialization** | key.serializer, value.serializer |
| **Delivery** | At-most-once, at-least-once, exactly-once; ordering per partition |
| **Idempotence** | enable.idempotence; no duplicates on retry |
| **In-flight** | max.in.flight.requests.per.connection; order with/without idempotence |
| **Compression** | compression.type (none, gzip, snappy, lz4, zstd) |
| **Settings & traps** | Key producer config; common pitfalls |

---

## Step 4 — [Consumers](docs/04-consumers.md)

Consumer groups, offsets, partition assignment, rebalance, commit strategy, deserialization.

| Area | Covered |
|------|--------|
| **Role** | Pull model; one consumer per partition in a group |
| **Consumer group** | group.id; partition assignment; scaling (consumers ≤ partitions) |
| **Offsets** | Partition offset; committed offset; current position; auto vs manual commit |
| **Delivery** | Commit before/after process; at-most-once vs at-least-once |
| **Rebalance** | Partition assignment strategies; rebalance on join/leave; timeouts |
| **Deserialization** | key.deserializer, value.deserializer |
| **Start position** | auto.offset.reset (earliest vs latest) |
| **Settings & traps** | Key consumer config; commit timing; rebalance handling |

---

## Step 5 — [Schema (Avro)](docs/05-schema.md)

Avro schema, Schema Registry, serialization, deserialization, evolution, compatibility.

| Area | Covered |
|------|--------|
| **Why schema** | Contract, types, evolution; Kafka stores bytes |
| **Avro schema** | Creation (.avsc); records, fields, types; required/optional |
| **Schema Registry** | Store and resolve schemas by subject and version/ID |
| **Serialization** | Producer: Avro + registry; register if new; payload (schema ID + Avro) |
| **Deserialization** | Consumer: fetch schema by ID; deserialize to object |
| **Evolution** | Add/remove/rename fields; change types; safe vs breaking |
| **Compatibility** | BACKWARD, FORWARD, FULL, NONE; per subject; rolling upgrades |
| **Settings & traps** | Registry URL; subject naming; compatibility pitfalls |

---

## At a glance

| Step | Focus |
|------|--------|
| 1 | Run Kafka, create topic, produce/consume, see storage |
| 2 | Topics: partitions, keys, replication, min ISR, cleanup |
| 3 | Producers: acks, retries, idempotence, in-flight, compression |
| 4 | Consumers: groups, offsets, commit, rebalance, deserialization |
| 5 | Schema: Avro, Registry, serialization, evolution, compatibility |
