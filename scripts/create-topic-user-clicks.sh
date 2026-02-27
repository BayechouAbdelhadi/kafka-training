#!/bin/sh
# Create topic for Step 3 (Producers): user-clicks, 2 partitions, RF 3, min.insync.replicas=2. Run from project root.
set -e
cd "$(dirname "$0")/.."
BOOTSTRAP="kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092"
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create \
  --topic user-clicks \
  --partitions 2 \
  --replication-factor 3 \
  --config min.insync.replicas=2 \
  --bootstrap-server "$BOOTSTRAP"
