# Step 1 — Infrastructure

We keep it simple: run a **single-node Kafka cluster** (KRaft, no Zookeeper), create a topic, produce messages, then look at the **storage layer**. Do the steps in order. **You are responsible for cleanup** (see end).

All commands assume you are in the **project root** and Kafka is running unless stated otherwise.

---

## 1. Run a single-node cluster

Start Kafka:

```bash
docker compose up -d
```

Wait until the broker is ready (a few seconds). You now have one Kafka node acting as both controller and broker (development setup only).

---

## 2. Create the topic `learning`

Create topic **learning** with **3 partitions** and **replication factor 1**:

```bash
sh scripts/create-learning-topic.sh
```

Or by hand:

```bash
docker compose exec kafka /opt/kafka/bin/kafka-topics.sh --create \
  --topic learning \
  --partitions 3 \
  --replication-factor 1 \
  --bootstrap-server localhost:9092
```

---

## 3. Describe the topic

Inspect the topic:

```bash
docker compose exec kafka /opt/kafka/bin/kafka-topics.sh --describe \
  --topic learning \
  --bootstrap-server localhost:9092
```

Check that you see 3 partitions and replication factor 1.

---

## 4. Send messages (one per second)

Run the script that sends one message per second to `learning`:

```bash
sh scripts/send-one-message-per-second.sh
```

It runs until you stop it with **Ctrl+C**. Leave it running for a short while so there is some data, then stop it.

Optionally consume to confirm:

```bash
docker compose exec kafka /opt/kafka/bin/kafka-console-consumer.sh \
  --bootstrap-server localhost:9092 \
  --topic learning \
  --from-beginning
```

Stop with Ctrl+C when done.

---

## 5. Check the storage layer

Kafka stores log segments and indexes on disk. Inside the container, data is under `/var/lib/kafka/data`.

List the data directory:

```bash
docker compose exec kafka ls -la /var/lib/kafka/data
```

You should see directories per topic partition (e.g. `learning-0`, `learning-1`, `learning-2`). Enter one partition:

```bash
docker compose exec kafka ls -la /var/lib/kafka/data/learning-0
```

You will see **log segment** files (`.log`) and **index** files (`.index`, `.timeindex`). The log holds the messages; the indexes allow fast lookup by offset or time.

Inspect one of the segment files (optional):

```bash
docker compose exec kafka /opt/kafka/bin/kafka-dump-log.sh \
  --files /var/lib/kafka/data/learning-0/00000000000000000000.log \
  --print-data-log
```

---

## 6. Cleanup (your responsibility)

When you are done with the step, stop the cluster and remove the container (and optionally the volume so the next run starts clean):

```bash
docker compose down
```

To also remove the data volume:

```bash
docker compose down -v
```

Do this between runs or at the end of the exercise so the next time you start from a clean state.
