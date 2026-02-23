#!/bin/sh
# Delete topic keys-demo. Run from project root. Use before recreating for the with-keys part of the exercise.
set -e
cd "$(dirname "$0")/.."
BOOTSTRAP="kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092"
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --delete \
  --topic keys-demo \
  --bootstrap-server "$BOOTSTRAP"
