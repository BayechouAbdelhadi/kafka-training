#!/bin/sh
# Create the orders topic. Run from order-service/ (where docker-compose.yml is).
# Requires Kafka to be running: docker compose up -d
set -e
cd "$(dirname "$0")/.."
docker compose exec kafka /opt/kafka/bin/kafka-topics.sh --create \
  --topic orders \
  --partitions 1 \
  --replication-factor 1 \
  --bootstrap-server localhost:9092
