# Step 3 — Producers

**Check out the tag for this step** (when it exists):

```bash
git checkout step-03-producers
```

This step covers the Kafka producer: durability, delivery semantics, idempotence, ordering, and compression. Prerequisite: Step 2 (Topics) and the four-broker cluster.

**Copying commands (Docsify):** In Docsify, selecting and copying from code blocks sometimes does not put the command on the clipboard at all. If copy does not work: use the **script** when one is shown, or open the doc or script file in your editor and copy from there, or type the command manually.

---

## Content to cover

### 1. Role of the producer

- Sending records to topics; batching.

### 2. Partitioning

- It is up to the **producer** to choose the partitioning strategy. Default: hash(key) % num_partitions when key is present, else round-robin; custom partitioner can override (e.g. by header, or sticky partition for no key). The broker receives the partition index from the producer (or uses the default partitioner on the broker if the client does not specify).

### 3. Acknowledgments and durability

- `acks=0`, `acks=1`, `acks=all`; link to topic `min.insync.replicas` and replication factor.

### 4. Retries

- `retries` and `retry.backoff.ms`; whether the producer retries depends on the **error type** — retryable (e.g. transient network, not leader) vs non-retryable (e.g. serialization, invalid config); relation to duplicates and need for idempotence when using at-least-once.

### 5. Serialization

- Key and value must be serialized to bytes before send; common serializers (String, Avro, JSON, etc.); producer config: `key.serializer`, `value.serializer`.

### 6. Delivery semantics

- At-most-once, at-least-once, exactly-once (brief); ordering is per partition.

### 7. Idempotent producer

- `enable.idempotence=true`; deduplication by producer ID and sequence; retries without duplicates.

### 8. In-flight requests and order

- `max.in.flight.requests.per.connection`; how multiple in-flight requests can cause out-of-order writes when retries happen; preserving order with `max.in.flight=1` vs `enable.idempotence=true`.

### 9. Compression

- Producer-side `compression.type` (none, gzip, snappy, lz4, zstd); trade-off CPU vs network/disk.

### 10. Key producer settings

- Reference: `bootstrap.servers`, `acks`, `retries`, `retry.backoff.ms`, `linger.ms`, `batch.size`, `enable.idempotence`, `max.in.flight.requests.per.connection`, `compression.type`, `key.serializer`, `value.serializer`.

### 11. Traps and best practices

- Relying on weak acks for durability; ignoring duplicates without idempotence; multiple in-flight without idempotence breaking order.

---

## Exercises (titles — what each will cover)

| # | Exercise title | What it will cover |
|---|----------------|--------------------|
| 1 | **acks and durability** | Topic with `min.insync.replicas=2` and RF≥2; produce with `acks=0`, `acks=1`, `acks=all`; optionally stop a broker and show `acks=all` fails when ISR &lt; min.insync.replicas. Takeaway: use `acks=all` for durability. |
| 2 | **Delivery semantics and idempotence** | Produce with `enable.idempotence=false` then `enable.idempotence=true`; consume to show no duplicates with idempotence. Takeaway: idempotence avoids duplicates from retries. |
| 3 | **In-flight requests and ordering** | Produce ordered messages (same key) with `max.in.flight.requests.per.connection=5` and `enable.idempotence=false` to show order can break; repeat with idempotence to show order preserved. Takeaway: multiple in-flight can break order without idempotence; with idempotence, order is preserved. |
| 4 | **Compression (optional)** | Produce larger payload with `compression.type=none` then `compression.type=lz4`; show smaller on-wire or on-disk size. Takeaway: producer compression reduces network and storage at CPU cost. |
| 5 | **Conclusion / summary** | Recap: acks for durability, idempotence for no duplicates and ordered writes with in-flight &gt; 1, compression for efficiency. Optional table: goal → producer settings. |

---

**Next:** [Step 4 — Consumers](docs/04-consumers.md) — consumer groups, offsets, partition assignment, and rebalance.

---

All commands in this step assume you are in the **project root** and the cluster is running. Use bootstrap `kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092` when using `docker compose exec kafka-1 ...`.
