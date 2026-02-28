#!/bin/sh
# Produce one message per second to order-topic with key=user, value=order-N. Run from project root.
# Uses a fixed list of users as keys (round-robin). Use with Step 4 (Consumers). Stop with Ctrl+C.
set -e
cd "$(dirname "$0")/.."
BOOTSTRAP="kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092"
USERS="user-alice user-bob user-carol"
i=1
idx=1
while true; do
  key=$(echo "$USERS" | cut -d' ' -f"$idx")
  echo "${key}:order-$i"
  i=$((i + 1))
  idx=$((idx % 3 + 1))
  sleep 1
done | docker compose exec -T kafka-1 /opt/kafka/bin/kafka-console-producer.sh \
  --bootstrap-server "$BOOTSTRAP" \
  --topic order-topic \
  --property parse.key=true \
  --property key.separator=:
