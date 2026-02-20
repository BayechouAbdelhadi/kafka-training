# Step 1 — Infrastructure

We keep it simple: run a **single-node Kafka cluster** (KRaft, no Zookeeper), create a topic, produce messages, then look at the **storage layer**. Do the steps in order. **You are responsible for cleanup** (see end).

All commands assume you are in the **project root** and Kafka is running unless stated otherwise.

---

## 1. Run a single-node cluster

Start Kafka. Choose your shell:

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

Wait until the broker is ready (a few seconds). You now have one Kafka node acting as both controller and broker (development setup only).

---

## 2. Create the topic `learning`

Create topic **learning** with **3 partitions** and **replication factor 1**. Choose your shell:

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
sh scripts/create-learning-topic.sh
```

<!-- tab:Windows -->

```batch
scripts\create-learning-topic.cmd
```

<!-- tabs:end -->

Or by hand. Choose your shell:

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec kafka /opt/kafka/bin/kafka-topics.sh --create \
  --topic learning \
  --partitions 3 \
  --replication-factor 1 \
  --bootstrap-server localhost:9092
```

<!-- tab:Windows -->

```batch
docker compose exec kafka /opt/kafka/bin/kafka-topics.sh --create --topic learning --partitions 3 --replication-factor 1 --bootstrap-server localhost:9092
```

<!-- tabs:end -->

---

## 3. Describe the topic

Inspect the topic. Choose your shell:

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec kafka /opt/kafka/bin/kafka-topics.sh --describe \
  --topic learning \
  --bootstrap-server localhost:9092
```

<!-- tab:Windows -->

```batch
docker compose exec kafka /opt/kafka/bin/kafka-topics.sh --describe --topic learning --bootstrap-server localhost:9092
```

<!-- tabs:end -->

Check that you see 3 partitions and replication factor 1.

---

## 4. Send messages (one per second)

Run the script that sends one message per second to `learning`. Choose your shell:

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
sh scripts/send-one-message-per-second.sh
```

<!-- tab:Windows -->

```batch
scripts\send-one-message-per-second.cmd
```

<!-- tabs:end -->

It runs until you stop it with **Ctrl+C**. Leave it running for a short while so there is some data, then stop it.

Optionally consume to confirm. Choose your shell:

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec kafka /opt/kafka/bin/kafka-console-consumer.sh \
  --bootstrap-server localhost:9092 \
  --topic learning \
  --from-beginning
```

<!-- tab:Windows -->

```batch
docker compose exec kafka /opt/kafka/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic learning --from-beginning
```

<!-- tabs:end -->

Stop with Ctrl+C when done.

---

## 5. Check the storage layer

Kafka stores log segments and indexes on disk. Inside the container, data is under `/var/lib/kafka/data`.

List the data directory. Choose your shell:

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec kafka ls -la /var/lib/kafka/data
```

<!-- tab:Windows -->

```batch
docker compose exec kafka ls -la /var/lib/kafka/data
```

<!-- tabs:end -->

You should see directories per topic partition (e.g. `learning-0`, `learning-1`, `learning-2`). If you only see `.` and `..`, (1) make sure you completed steps 2 and 4 (create topic and send messages).

Enter one partition. Choose your shell:

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec kafka ls -la /var/lib/kafka/data/learning-0
```

<!-- tab:Windows -->

```batch
docker compose exec kafka ls -la /var/lib/kafka/data/learning-0
```

<!-- tabs:end -->

You will see **log segment** files (`.log`) and **index** files (`.index`, `.timeindex`). The log holds the messages; the indexes allow fast lookup by offset or time.

**See the log as raw bytes** — the segment file is stored in binary. View the first bytes to confirm it is not human-readable:

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec kafka od -A x -t x1z -v -N 384 /var/lib/kafka/data/learning-0/00000000000000000000.log
```

<!-- tab:Windows -->

```batch
docker compose exec kafka od -A x -t x1z -v -N 384 /var/lib/kafka/data/learning-0/00000000000000000000.log
```

<!-- tabs:end -->

You see hex bytes (and ASCII on the right). The log content is stored in this binary format on disk.

**See the index content** — the `.index` file maps offsets to byte positions in the log. View its raw bytes first:

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec kafka od -A x -t x1z -v -N 128 /var/lib/kafka/data/learning-0/00000000000000000000.index
```

<!-- tab:Windows -->

```batch
docker compose exec kafka od -A x -t x1z -v -N 128 /var/lib/kafka/data/learning-0/00000000000000000000.index
```

<!-- tabs:end -->

Then decode the index to see offset → position pairs:

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec kafka /opt/kafka/bin/kafka-dump-log.sh \
  --files /var/lib/kafka/data/learning-0/00000000000000000000.index
```

<!-- tab:Windows -->

```batch
docker compose exec kafka /opt/kafka/bin/kafka-dump-log.sh --files /var/lib/kafka/data/learning-0/00000000000000000000.index
```

<!-- tabs:end -->

**Decode the log** — to see the actual messages (key/value) from the segment, use the dump tool:

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec kafka /opt/kafka/bin/kafka-dump-log.sh \
  --files /var/lib/kafka/data/learning-0/00000000000000000000.log \
  --print-data-log
```

<!-- tab:Windows -->

```batch
docker compose exec kafka /opt/kafka/bin/kafka-dump-log.sh --files /var/lib/kafka/data/learning-0/00000000000000000000.log --print-data-log
```

<!-- tabs:end -->

---

## 6. Auto topic creation

By default, Kafka creates a topic automatically when you first produce to it or consume from it. This section shows that behavior, then disables it so that producing to a non-existing topic fails.

### 6.1 Auto creation is on (default)

Produce to a topic that **does not exist** yet (e.g. `auto-created-demo`). Use the console producer: send one line, then **Ctrl+C** to exit.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec -it kafka /opt/kafka/bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic auto-created-demo
```

Type a line (e.g. `hello`), press Enter, then **Ctrl+C**.

<!-- tab:Windows -->

```batch
docker compose exec -it kafka /opt/kafka/bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic auto-created-demo
```

Type a line (e.g. `hello`), press Enter, then **Ctrl+C**.

<!-- tabs:end -->

Describe the topic. You will see that it **exists** and was created automatically:

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec kafka /opt/kafka/bin/kafka-topics.sh --describe --topic auto-created-demo --bootstrap-server localhost:9092
```

<!-- tab:Windows -->

```batch
docker compose exec kafka /opt/kafka/bin/kafka-topics.sh --describe --topic auto-created-demo --bootstrap-server localhost:9092
```

<!-- tabs:end -->

Note the **partition count** and **replication factor** (typically 1 partition, replication 1). Those are the broker defaults. Auto creation can be convenient in development, but in production it is usually better to **disable** it: otherwise topics appear with default partitioning and replication, which you may not want. Topics should be created explicitly with the right number of partitions and replication factor.

### 6.2 Disable auto topic creation

Add the following to the **kafka** service in `docker-compose.yml`, under the `environment` section:

```yaml
KAFKA_AUTO_CREATE_TOPICS_ENABLE: "false"
```

Then restart the cluster so the change is applied:

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose down -v
docker compose up -d
```

<!-- tab:Windows -->

```batch
docker compose down
docker compose up -d
```

<!-- tabs:end -->

Wait a few seconds for Kafka to be ready.

### 6.3 Produce to a non-existing topic (expect an error)

Try to produce to a topic that does **not** exist (e.g. `does-not-exist`). Do **not** create this topic first.

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose exec -it kafka /opt/kafka/bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic does-not-exist
```

Type a line and press Enter.

<!-- tab:Windows -->

```batch
docker compose exec -it kafka /opt/kafka/bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic does-not-exist
```

Type a line and press Enter.

<!-- tabs:end -->

You should get an **error** (e.g. `TopicAuthorizationException` or `UNKNOWN_TOPIC_OR_PARTITION`). The broker no longer creates the topic automatically; it must exist before you can produce to it. Exit the producer with **Ctrl+C**.

With auto creation disabled, create topics explicitly (e.g. with `kafka-topics.sh --create`) so you control partitions and replication.

---

## 7. Cleanup (your responsibility)

When you are done with the step, stop the cluster and remove the container (and optionally the volume so the next run starts clean). Choose your shell:

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose down
```

<!-- tab:Windows -->

```batch
docker compose down
```

<!-- tabs:end -->

To also remove the data volume. Choose your shell:

<!-- tabs:start -->

<!-- tab:Linux / macOS -->

```bash
docker compose down -v
```

<!-- tab:Windows -->

```batch
docker compose down -v
```

<!-- tabs:end -->

Do this between runs or at the end of the exercise so the next time you start from a clean state.
