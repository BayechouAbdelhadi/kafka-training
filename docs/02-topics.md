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

## Exercise 2: Replication factor

This exercise shows **replication factor (RF)** and the **Replicas** and **Isr** columns: how many copies of each partition exist and which are in sync with the leader.

### 2.1 Create a topic with replication factor 3

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

### 2.2 Describe the topic: Replicas and ISR

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

### 2.3 What you should see

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

## Exercise 3: Min in-sync replicas

This exercise uses a **four-broker** cluster so that when we stop **one** broker we still have **controller quorum** (3 of 4 up). We configure a topic with **min.insync.replicas=3** and **RF=3**. With one broker down, only 2 replicas stay in the ISR, so produces with `acks=all` fail — and `kafka-topics.sh --describe` still works because the cluster has quorum.

### 3.1 Create a topic with min.insync.replicas=3

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

### 3.2 Stop one broker

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

### 3.3 Confirm the ISR has shrunk

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

### 3.4 Try to produce with acks=all

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

### 3.5 Restart the broker and produce again

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

### 3.6 Takeaway

**min.insync.replicas** trades off **durability** (more replicas must ack) and **availability** (if too many brokers are down, writes with acks=all fail until enough replicas are back). .

---

All commands in this step assume you are in the **project root** and the cluster is running. Use the bootstrap server list above when connecting from the host.
