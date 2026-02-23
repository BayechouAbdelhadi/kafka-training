#!/bin/sh
# Create a topic for keys-and-partitioning exercise: 2 partitions, RF 1. Run from project root.
set -e
cd "$(dirname "$0")/.."
BOOTSTRAP="kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092"
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create \
  --topic keys-demo \
  --partitions 2 \
  --replication-factor 1 \
  --bootstrap-server "$BOOTSTRAP"
