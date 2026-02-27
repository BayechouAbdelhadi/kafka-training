# Step 2 — Topics

**Check out the tag for this step** (when it exists):

```bash
git checkout step-02-topics
```

From now on we use a **four-broker cluster**. This step deep dives into topics (partitioning, replication, cleanup policies). Content to be added.

---

## Running the four-broker cluster

The project runs Kafka with **four brokers** (KRaft, no Zookeeper). Each node is both controller and broker for a simple dev setup.

### Start the cluster

From the **project root**:

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose up -d
```

<!-- tab:Windows -->

```batch
docker compose up -d
```

<!-- tabs:end -->

Wait **at least 30–60 seconds** after starting so all four brokers are ready. Check with:

```bash
docker compose ps
```

### Bootstrap servers

When running Kafka CLI tools **from your host** (e.g. from the project root or your machine), use this bootstrap server list:

- **`localhost:9092,localhost:9094,localhost:9095,localhost:9096`**

Example — list topics:

```bash
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092 --list
```

From the host with a local Kafka install, you would use:

```bash
kafka-topics.sh --bootstrap-server localhost:9092,localhost:9094,localhost:9095,localhost:9096 --list
```

**If you see "Connection to node … could not be established":** (1) Ensure the cluster is running (`docker compose ps`) and you waited long enough after `docker compose up -d`. (2) When using **host** Kafka CLI, use bootstrap `localhost:9092,localhost:9094,localhost:9095,localhost:9096`. (3) When using **`docker compose exec kafka-1 ...`**, use bootstrap `kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092` (never localhost inside the container).

## Exercise 1: Partitions distributed across brokers

This exercise shows that when you create a topic with **3 partitions** on a **3-broker** cluster, Kafka assigns one partition (leader) per broker so the load is spread across the cluster.

### 1.1 Create a topic with 3 partitions

Create the topic `partitions-demo` with 3 partitions and replication factor 1. You can use the script or run the command by hand.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
sh scripts/create-topic-3partitions.sh
```

Or by hand:

```bash
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create \
  --topic partitions-demo \
  --partitions 3 \
  --replication-factor 1 \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tab:Windows -->

```batch
scripts\create-topic-3partitions.cmd
```

Or by hand:

```batch
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create --topic partitions-demo --partitions 3 --replication-factor 1 --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tabs:end -->

### 1.2 Describe the topic and see partition assignment

Run `kafka-topics.sh --describe` to see how partitions are assigned to brokers. The **Leader** column is the broker ID that hosts each partition.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --describe \
  --topic partitions-demo \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tab:Windows -->

```batch
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --describe --topic partitions-demo --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tabs:end -->

### 1.3 What you should see

The output looks like:

```
Topic: partitions-demo	PartitionCount: 3	ReplicationFactor: 1	...
	Topic: partitions-demo	Partition: 0	Leader: 1	Replicas: 1	Isr: 1
	Topic: partitions-demo	Partition: 1	Leader: 2	Replicas: 2	Isr: 2
	Topic: partitions-demo	Partition: 2	Leader: 3	Replicas: 3	Isr: 3
```

- **Partition 0** → Leader **1** (kafka-1)  
- **Partition 1** → Leader **2** (kafka-2)  
- **Partition 2** → Leader **3** (kafka-3)

So the 3 partitions are **distributed across the 3 brokers**: one partition per broker. That way, produce and consume traffic is spread across the cluster. With more partitions than brokers, some brokers would host multiple partitions.

---

## Exercise 2: Keys and partitioning

Kafka assigns the partition by **`hash(key) % num_partitions`**: messages with the same key always go to the same partition. Ordering is guaranteed **within a partition** (and thus per key when you use keys). Messages with a null key are spread round-robin across partitions — no ordering guarantee across partitions. You will use **one topic** (`keys-demo`) for both parts: first **without keys** (order not kept), then after cleaning up the topic, **with keys** (order kept per key).

### 2.1 Create the topic

Create the topic `keys-demo` with **2 partitions** and replication factor 1.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
sh scripts/create-topic-keys-demo.sh
```

Or by hand:

```bash
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create \
  --topic keys-demo \
  --partitions 2 \
  --replication-factor 1 \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tab:Windows -->

```batch
scripts\create-topic-keys-demo.cmd
```

Or by hand:

```batch
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create --topic keys-demo --partitions 2 --replication-factor 1 --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tabs:end -->

### 2.2 Part 1 — No key: produce one message per second, then consume

Produce messages **without** a key to `keys-demo` (one per second). **Wait about one minute** so enough messages accumulate across both partitions, then stop the script with **Ctrl+C**. After that, consume and observe that order is not preserved.

**Step 1 — Producer:** Run the script and let it run for **about a minute**, then **Ctrl+C** to stop.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
sh scripts/produce-one-per-second-keys-demo.sh
```

<!-- tab:Windows -->

```batch
scripts\produce-one-per-second-keys-demo.cmd
```

<!-- tabs:end -->

**Step 2 — Consumer:** After stopping the producer, run the console consumer and read from the beginning.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec -it kafka-1 /opt/kafka/bin/kafka-console-consumer.sh \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092 \
  --topic keys-demo \
  --from-beginning
```

<!-- tab:Windows -->

```batch
docker compose exec -it kafka-1 /opt/kafka/bin/kafka-console-consumer.sh --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092 --topic keys-demo --from-beginning
```

<!-- tabs:end -->

**What you should see:** Messages may **not** appear in numerical order (e.g. you might see `message-2`, then `message-4`, then `message-1`, then `message-3`). With no key, they were spread across the 2 partitions (round-robin); the consumer reads from multiple partitions and there is **no total order** across the topic. Order is **not** kept when no key is used.

### 2.3 Clean up the topic

Delete the topic and recreate it so the next part starts with an empty topic.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
sh scripts/delete-topic-keys-demo.sh
sh scripts/create-topic-keys-demo.sh
```

Or by hand:

```bash
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --delete --topic keys-demo --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create --topic keys-demo --partitions 2 --replication-factor 1 --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tab:Windows -->

```batch
scripts\delete-topic-keys-demo.cmd
scripts\create-topic-keys-demo.cmd
```

Or by hand:

```batch
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --delete --topic keys-demo --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create --topic keys-demo --partitions 2 --replication-factor 1 --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tabs:end -->

### 2.4 Part 2 — With key: produce messages with the same key

Use the console producer with **key:value** format (`key.separator=:`). Send several messages with the **same key** so they all go to one partition and stay in order.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec -it kafka-1 /opt/kafka/bin/kafka-console-producer.sh \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092 \
  --topic keys-demo \
  --reader-property parse.key=true \
  --reader-property key.separator=:
```

At the `>` prompt, type these lines (one per line), then **Ctrl+C** to exit:

```
user1:first
user1:second
user1:third
```

**Important:** Do not press Enter after the last line (no empty line). Exit with **Ctrl+C** after typing `user1:third`.

<!-- tab:Windows -->

```batch
docker compose exec -it kafka-1 /opt/kafka/bin/kafka-console-producer.sh --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092 --topic keys-demo --reader-property parse.key=true --reader-property key.separator=:
```

At the `>` prompt, type these lines (one per line), then **Ctrl+C** to exit:

```
user1:first
user1:second
user1:third
```

**Important:** Do not press Enter after the last line (no empty line). Exit with **Ctrl+C** after typing `user1:third`.

<!-- tabs:end -->

### 2.5 Consume and observe order (with key)

Consume from the beginning with keys printed. All three messages have key `user1`, so they went to the **same partition** and appear in the order you produced them.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec -it kafka-1 /opt/kafka/bin/kafka-console-consumer.sh \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092 \
  --topic keys-demo \
  --from-beginning \
  --property print.key=true
```

<!-- tab:Windows -->

```batch
docker compose exec -it kafka-1 /opt/kafka/bin/kafka-console-consumer.sh --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092 --topic keys-demo --from-beginning --property print.key=true
```

<!-- tabs:end -->

**What you should see:** `user1	first`, `user1	second`, `user1	third` in that order. Same key → same partition → ordering preserved for that key.

### 2.6 Takeaway

- **Same topic, two behaviors:** Without keys, order was not kept across the topic; after cleanup, with the same key on every message, order was kept for that key.
- **Same key → same partition** (`hash(key) % num_partitions`). All messages for `user1` landed in one partition and stayed in order.
- **Ordering is per partition:** Within a partition, messages are in produce order. There is no ordering guarantee **across** partitions.
- **No key (null key):** Messages without a key are assigned to partitions (e.g. round-robin). Order is **not** kept across the topic — as you saw, `message-1`, `message-2`, … could appear out of sequence when you consumed.

---

## Exercise 3: Choosing partition count

Partition count is a **scaling lever**: more partitions allow more consumers in a group and more producer parallelism. You **can add** partitions to a topic later, but it **may break ordering** for keyed messages (because `hash(key) % num_partitions` changes). You **cannot reduce** or delete partitions — once a topic has N partitions, N can only stay the same or increase.

### 3.1 Create a topic with 2 partitions

Create the topic `partitions-count-demo` with **2 partitions**.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
sh scripts/create-topic-partitions-count-demo.sh
```

Or by hand:

```bash
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create \
  --topic partitions-count-demo \
  --partitions 2 \
  --replication-factor 1 \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tab:Windows -->

```batch
scripts\create-topic-partitions-count-demo.cmd
```

Or by hand:

```batch
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create --topic partitions-count-demo --partitions 2 --replication-factor 1 --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tabs:end -->

### 3.2 Describe the topic

Confirm the topic has 2 partitions.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --describe \
  --topic partitions-count-demo \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tab:Windows -->

```batch
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --describe --topic partitions-count-demo --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tabs:end -->

You should see **PartitionCount: 2**.

### 3.3 Add partitions (alter the topic)

You **can increase** the number of partitions with `--alter`. Here we change from 2 to **4** partitions.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
sh scripts/alter-topic-partitions-count-demo.sh
```

Or by hand:

```bash
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --alter \
  --topic partitions-count-demo \
  --partitions 4 \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tab:Windows -->

```batch
scripts\alter-topic-partitions-count-demo.cmd
```

Or by hand:

```batch
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --alter --topic partitions-count-demo --partitions 4 --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tabs:end -->

**Important:** Adding partitions **may break ordering** for keyed messages. The partition is chosen by `hash(key) % num_partitions`. When `num_partitions` changes, the same key can map to a different partition, so existing and new messages for that key may no longer be in the same partition and total order per key can be lost. Use with care if you rely on per-key ordering.

### 3.4 Describe again

Describe the topic again. You should see **PartitionCount: 4** and four partition lines (0–3).

### 3.5 Try to reduce partitions (prove it is not allowed)

Run the same `--alter` command but ask for **fewer** partitions (e.g. 2 instead of 4). Kafka rejects the request.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --alter \
  --topic partitions-count-demo \
  --partitions 2 \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tab:Windows -->

```batch
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --alter --topic partitions-count-demo --partitions 2 --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tabs:end -->

**What you should see:** An error such as *"The number of partitions for a topic can only be increased"* (or similar, depending on Kafka version).

**Why decreasing is not allowed:** Reducing partitions would mean merging data from several partitions into fewer. Each partition has its own offset space and ordering; merging would require moving and reordering messages, redefining offsets, and could break consumer commits and ordering guarantees. Kafka avoids that complexity and risk by only allowing the partition count to stay the same or increase. Choose the initial partition count with future growth in mind.

### 3.6 Takeaway

- **Partition count is a scaling lever:** More partitions → more parallelism (consumers in a group, producer throughput).
- **You can add partitions** with `kafka-topics.sh --alter --partitions N`, but it **may break order** for keyed data (hash mapping changes).
- **You cannot delete or reduce partitions** — N can only stay the same or increase.

---

## Exercise 4: Replication factor

This exercise shows **replication factor (RF)** and the **Replicas** and **Isr** columns: how many copies of each partition exist and which are in sync with the leader.

### 4.1 Create a topic with replication factor 3

Create the topic `replication-demo` with **2 partitions** and **replication factor 3** (each partition has 3 replicas, one per broker).

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
sh scripts/create-topic-replication-demo.sh
```

Or by hand:

```bash
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create \
  --topic replication-demo \
  --partitions 2 \
  --replication-factor 3 \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tab:Windows -->

```batch
scripts\create-topic-replication-demo.cmd
```

Or by hand:

```batch
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create --topic replication-demo --partitions 2 --replication-factor 3 --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tabs:end -->

### 4.2 Describe the topic: Replicas and ISR

Run `--describe` to see **Replicas** (all brokers holding a copy) and **Isr** (in-sync replicas — currently in sync with the leader).

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --describe \
  --topic replication-demo \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tab:Windows -->

```batch
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --describe --topic replication-demo --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tabs:end -->

### 4.3 What you should see

Example output:

```
Topic: replication-demo	PartitionCount: 2	ReplicationFactor: 3	...
	Topic: replication-demo	Partition: 0	Leader: 1	Replicas: 1,2,3	Isr: 1,2,3
	Topic: replication-demo	Partition: 1	Leader: 2	Replicas: 2,3,1	Isr: 2,3,1
```

- **Replication factor 3:** Each partition has **Replicas: 1,2,3** (or 2,3,1) — all three brokers hold a copy.
- **Leader:** The broker that handles reads and writes for that partition (e.g. partition 0 → leader 1).
- **Isr: 1,2,3:** All three replicas are **in-sync** (they have the same data as the leader). If one broker were slow or down, it would drop out of the ISR list.

---

<a id="exercise-5-min-in-sync-replicas"></a>

## Exercise 5: Min in-sync replicas

This exercise uses a **four-broker** cluster so that when we stop **one** broker we still have **controller quorum** (3 of 4 up). We configure a topic with **min.insync.replicas=3** and **RF=3**. With one broker down, only 2 replicas stay in the ISR, so produces with `acks=all` fail — and `kafka-topics.sh --describe` still works because the cluster has quorum.

### 5.1 Create a topic with min.insync.replicas=3

Create the topic `min-isr-demo` with **2 partitions**, **replication factor 3**, and **min.insync.replicas=3**. A producer using **acks=all** will only get an acknowledgement once at least 3 replicas have written the record.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
sh scripts/create-topic-min-isr-demo.sh
```

Or by hand:

```bash
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create \
  --topic min-isr-demo \
  --partitions 2 \
  --replication-factor 3 \
  --config min.insync.replicas=3 \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tab:Windows -->

```batch
scripts\create-topic-min-isr-demo.cmd
```

Or by hand:

```batch
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create --topic min-isr-demo --partitions 2 --replication-factor 3 --config min.insync.replicas=3 --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
```

<!-- tabs:end -->

### 5.2 Stop one broker

Stop **kafka-4** so that three brokers remain. We still have **controller quorum** (3 of 4), so admin commands will work. Each partition has 3 replicas; with one broker down, only **2** replicas stay in the ISR, which is less than min.insync.replicas=3.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose stop kafka-4
```

<!-- tab:Windows -->

```batch
docker compose stop kafka-4
```

<!-- tabs:end -->

**Wait 20–30 seconds** so the leader removes the stopped broker from the ISR.

### 5.3 Confirm the ISR has shrunk

Describe the topic. Because we have quorum, this should succeed. The **Isr** column should show only **2** brokers (e.g. `Isr: 1,2,3` without 4, or similar).

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --describe \
  --topic min-isr-demo \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092
```

<!-- tab:Windows -->

```batch
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --describe --topic min-isr-demo --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092
```

<!-- tabs:end -->

You should see **Isr** with only 2 replica IDs (the stopped broker is no longer in the ISR). The leader will reject produces with acks=all because 2 &lt; min.insync.replicas (3).

### 5.4 Try to produce with acks=all

Send **one** message non-interactively so the producer exits and prints the error. Use a short **request.timeout.ms** so the failure appears quickly.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
echo "hello" | docker compose exec -T kafka-1 /opt/kafka/bin/kafka-console-producer.sh \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092 \
  --topic min-isr-demo \
  --producer-property acks=all \
  --producer-property request.timeout.ms=5000
```

<!-- tab:Windows -->

```batch
echo hello| docker compose exec -T kafka-1 /opt/kafka/bin/kafka-console-producer.sh --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092 --topic min-isr-demo --producer-property acks=all --producer-property request.timeout.ms=5000
```

<!-- tabs:end -->

**What you should see:** An error such as `NotEnoughReplicasException` or a timeout, because the topic requires at least 3 in-sync replicas but only 2 are in the ISR.

If your Kafka version warns that `--producer-property` is deprecated, use `--command-property` instead.

### 5.5 Restart the broker and produce again

Start kafka-4 again. Once it is back in the ISR, produces with acks=all will succeed.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose start kafka-4
```

Wait a few seconds, then try the producer again:

```bash
docker compose exec -it kafka-1 /opt/kafka/bin/kafka-console-producer.sh \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092 \
  --topic min-isr-demo \
  --producer-property acks=all
```

Type a message and press Enter — it should be accepted.

<!-- tab:Windows -->

```batch
docker compose start kafka-4
```

Wait a few seconds, then try the producer again:

```batch
docker compose exec -it kafka-1 /opt/kafka/bin/kafka-console-producer.sh --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092 --topic min-isr-demo --producer-property acks=all
```

Type a message and press Enter — it should be accepted.

<!-- tabs:end -->

### 5.6 Takeaway

**min.insync.replicas** trades off **durability** (more replicas must ack) and **availability** (if too many brokers are down, writes with acks=all fail until enough replicas are back).

---

## Cleanup policies: delete and compact

Kafka has two **cleanup policies** for topic segments:

- **delete** (default): drop old log segments when they exceed **retention** (by time, e.g. `retention.ms`, or by size, e.g. `retention.bytes`).
- **compact**: keep only the **latest** value per key; older values for the same key are removed when segments are compacted.

**How it works:** Both policies apply **only to closed segments**. The **active (open) segment** is never cleaned up and never compacted. Segments close when they hit **segment.bytes** (size) or **segment.ms** (time); only then do retention-based deletion or compaction run on them.

### Traps to avoid

- **Expecting compaction or delete to be effective immediately** — Cleanup runs asynchronously (log cleaner thread). After producing, you may still see multiple values per key or old segments until the cleaner has run. With default `log.cleaner.backoff.ms` (e.g. 15s), there can be a noticeable delay.
- **Expecting the open segment to be cleaned** — The current active segment is never compacted and never removed by retention. If you produce a few messages and never close the segment (e.g. very large `segment.ms` or never reaching `segment.bytes`), compaction will not run on that data.
- **Compact: assuming one value per key right away** — Consumers can read duplicates (multiple values for the same key) until compaction has run on closed segments. Design for at least-once semantics and idempotent handling of updates.
- **Delete: assuming data is gone at exactly retention time** — Deletion applies to **closed** segments. Data in the active segment is retained until the segment closes, so "old" data can outlive `retention.ms` until the next segment roll.
- **Compact: null/tombstone semantics** — To remove a key from a compacted topic you must send a message with that key and a **null** value (tombstone). The tombstone is retained until compaction runs and then the key is removed.

---

## Conclusion: Configuring topics for your goals

When you create or alter a topic, these levers help you balance **scalability**, **fault tolerance**, **durability**, and **delivery guarantees**.

| Goal | What to configure | Advice |
|------|-------------------|--------|
| **Scalability** | **Partition count** | More partitions → more consumers in a group (up to one per partition) and higher produce throughput. Choose initial count with growth in mind; you can add partitions later but **not reduce** them, and adding can break per-key ordering. |
| **Fault tolerance** | **Replication factor (RF)** | RF = number of copies of each partition. Higher RF (e.g. 2 or 3) lets the topic tolerate more broker failures without data loss. Use at least 2 in production. |
| **Durability** | **RF + min.insync.replicas** | Set **min.insync.replicas** (e.g. 2 or more) so the leader only acks a write once that many replicas have it. Producers using **acks=all** then get a durable commit. Trade-off: if too many brokers are down, writes fail until enough replicas are back. |
| **Delivery guarantees** | **Topic + producer + consumer** | Ordering is **per partition** (and per key if you use keys). For at-least-once or exactly-once, use **acks=all** and **min.insync.replicas** so commits are durable; then configure idempotent producers and transactional or deduplicating consumers as needed. The topic’s replication and retention keep data available for redelivery. |

**Summary:** Use **enough partitions** for future scale, **replication factor ≥ 2** (often 3) for fault tolerance, and **min.insync.replicas ≥ 2** with **acks=all** for durability and stronger delivery guarantees. Choose **cleanup.policy** (delete vs compact) and **retention** to match how long you need the data.

---

**Next:** [Step 3 — Producers](docs/03-producers.md) — acks, idempotence, in-flight requests, and compression.

---

All commands in this step assume you are in the **project root** and the cluster is running. Use the bootstrap server list above when connecting from the host.
