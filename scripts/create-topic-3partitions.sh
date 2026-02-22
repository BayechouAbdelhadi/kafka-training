#!/bin/sh
# Create a topic with 3 partitions to show distribution across brokers. Run from project root.
# Requires Kafka (3 brokers) to be running: docker compose up -d
set -e
cd "$(dirname "$0")/.."
BOOTSTRAP="kafka-1:9092,kafka-2:9092,kafka-3:9092"
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create \
  --topic partitions-demo \
  --partitions 3 \
  --replication-factor 1 \
  --bootstrap-server "$BOOTSTRAP"
