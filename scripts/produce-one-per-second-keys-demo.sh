#!/bin/sh
# Produce one message per second to keys-demo (no key). Run from project root.
# Used in Exercise 2: run ~1 min, then Ctrl+C, then consume to see non-order.
set -e
cd "$(dirname "$0")/.."
BOOTSTRAP="kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092"
i=1
while true; do
  echo "message-$i"
  i=$((i + 1))
  sleep 1
done | docker compose exec -T kafka-1 /opt/kafka/bin/kafka-console-producer.sh \
  --bootstrap-server "$BOOTSTRAP" \
  --topic keys-demo
