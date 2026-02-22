#!/bin/sh
# Create a topic with replication factor 3 (Exercise 2). Run from project root.
# Requires 3-broker cluster: docker compose up -d
set -e
cd "$(dirname "$0")/.."
BOOTSTRAP="kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092"
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create \
  --topic replication-demo \
  --partitions 2 \
  --replication-factor 3 \
  --bootstrap-server "$BOOTSTRAP"
