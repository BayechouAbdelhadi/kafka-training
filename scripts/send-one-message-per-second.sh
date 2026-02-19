#!/bin/sh
# Send one message per second to the learning topic. Run from project root.
# Requires Kafka and topic "learning" to exist. Stop with Ctrl+C.
set -e
cd "$(dirname "$0")/.."
i=1
while true; do
  echo "message-$i"
  i=$((i + 1))
  sleep 1
done | docker compose exec -T kafka /opt/kafka/bin/kafka-console-producer.sh \
  --bootstrap-server localhost:9092 \
  --topic learning
