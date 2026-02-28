#!/bin/sh
# Produce one message per second to order-topic. Run from project root.
# Use with Step 4 (Consumers): run this, then start consumer groups to see messages.
# Stop with Ctrl+C.
set -e
cd "$(dirname "$0")/.."
BOOTSTRAP="kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092"
i=1
while true; do
  echo "order-$i"
  i=$((i + 1))
  sleep 1
done | docker compose exec -T kafka-1 /opt/kafka/bin/kafka-console-producer.sh \
  --bootstrap-server "$BOOTSTRAP" \
  --topic order-topic
