# Step 2 — Topics

**Check out the tag for this step** (when it exists):

```bash
git checkout step-02-topics
```

From now on we use a **three-broker cluster**. This step deep dives into topics (partitioning, replication, cleanup policies). Content to be added.

---

## Running the three-broker cluster

The project runs Kafka with **three brokers** (KRaft, no Zookeeper). Each node is both controller and broker for a simple dev setup.

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

Wait **at least 30–60 seconds** after starting so all three brokers are ready. Check with:

```bash
docker compose ps
```

### Bootstrap servers

When running Kafka CLI tools **from your host** (e.g. from the project root or your machine), use this bootstrap server list:

- **`localhost:9092,localhost:9094,localhost:9095`**

Example — list topics:

```bash
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092 --list
```

From the host with a local Kafka install, you would use:

```bash
kafka-topics.sh --bootstrap-server localhost:9092,localhost:9094,localhost:9095 --list
```

**If you see "Connection to node … could not be established":** (1) Ensure the cluster is running (`docker compose ps`) and you waited long enough after `docker compose up -d`. (2) When using **host** Kafka CLI, use bootstrap `localhost:9092,localhost:9094,localhost:9095`. (3) When using **`docker compose exec kafka-1 ...`**, use bootstrap `kafka-1:9092,kafka-2:9092,kafka-3:9092` (never localhost inside the container).

### Stop the cluster

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose down
```

To remove data volumes as well:

```bash
docker compose down -v
```

<!-- tab:Windows -->

```batch
docker compose down
```

To remove data volumes as well:

```batch
docker compose down -v
```

<!-- tabs:end -->

---

## Exercise: Partitions distributed across brokers

This exercise shows that when you create a topic with **3 partitions** on a **3-broker** cluster, Kafka assigns one partition (leader) per broker so the load is spread across the cluster.

### 1. Create a topic with 3 partitions

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
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092
```

<!-- tab:Windows -->

```batch
scripts\create-topic-3partitions.cmd
```

Or by hand:

```batch
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create --topic partitions-demo --partitions 3 --replication-factor 1 --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092
```

<!-- tabs:end -->

### 2. Describe the topic and see partition assignment

Run `kafka-topics.sh --describe` to see how partitions are assigned to brokers. The **Leader** column is the broker ID that hosts each partition.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --describe \
  --topic partitions-demo \
  --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092
```

<!-- tab:Windows -->

```batch
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --describe --topic partitions-demo --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092
```

<!-- tabs:end -->

### 3. What you should see

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

All commands in this step assume you are in the **project root** and the cluster is running. Use the bootstrap server list above when connecting from the host.
