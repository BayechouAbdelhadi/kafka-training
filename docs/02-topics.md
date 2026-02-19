# Step 2 — Topics

**Branch:** `step-02-topics`

This step creates the **orders** topic and documents its configuration and usage. Still no application code.

## Topic: `orders`

| Setting | Value | Note |
|--------|--------|------|
| Name | `orders` | Order-created events |
| Partitions | 1 | Simple start; increase for throughput |
| Replication factor | 1 | Single broker in this setup |
| Retention | Default (e.g. 7 days) | Adjust as needed |

## Who produces / who consumes

- **Producer:** Order service (Node.js). After saving an order to the mock DB, it will produce one message per order to `orders`.
- **Consumers:** Notification service and Invoice service (Node.js). Each subscribes to `orders` and processes events (send notification, generate invoice).

## Event shape (example)

Messages are JSON. Example payload:

```json
{
  "orderId": "ord-123",
  "customerId": "cust-456",
  "amount": 99.50,
  "createdAt": "2025-02-19T12:00:00.000Z"
}
```

Schema may be extended later (e.g. currency, items). Document any change in this doc.

## Create the topic

With Kafka running (Step 1), from the **order-service/** directory either run the script:

```bash
cd order-service
sh scripts/create-orders-topic.sh
```

or run the command directly:

```bash
cd order-service
docker compose exec kafka /opt/kafka/bin/kafka-topics.sh --create \
  --topic orders \
  --partitions 1 \
  --replication-factor 1 \
  --bootstrap-server localhost:9092
```

Verify:

```bash
docker compose exec kafka /opt/kafka/bin/kafka-topics.sh --describe --topic orders --bootstrap-server localhost:9092
```

## Next step

In **Step 3** we add the Node.js order service: REST API, mock DB (save + optional save failure), no Kafka yet.
