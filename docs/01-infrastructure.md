# Step 1 — Infrastructure (Kafka KRaft)

**Branch:** `step-01-infrastructure`

This step adds a single-node Kafka cluster using **KRaft** (no Zookeeper) via Docker Compose. No application code and no topics yet.

## What's in this step

- **order-service/docker-compose.yml** — One Kafka node running as both controller and broker.
- **order-service/.env.example** — Example environment (host/port) for local use.

## Run the infrastructure

From the `order-service/` directory:

```bash
cd order-service
docker compose up -d
```

Wait a few seconds for Kafka to be ready.

## Verify

Check that the broker is listening (runs inside the container):

```bash
docker compose exec kafka kafka-broker-api-versions --bootstrap-server localhost:9092
```

You should see a list of supported API versions. No Zookeeper is involved; this is KRaft-only.

## Compose file explained

- **Single node:** One container runs Kafka with `KAFKA_PROCESS_ROLES=controller,broker` and a fixed `KAFKA_NODE_ID` so it acts as both controller and broker (valid for development only).
- **Port:** Kafka is exposed on `9092` (e.g. `localhost:9092` from the host).
- **Storage:** Data is stored in a named volume so it persists between restarts.

## Next step

In **Step 2** we create the `orders` topic and document its use (who produces, who consumes, event shape).
