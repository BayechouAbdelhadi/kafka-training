#!/bin/sh
# Create topics for bottle supervision (Step 5): bottle.detected, bottle.analysis.result, bottle.rejected.
# Run from project root. Requires cluster up.
set -e
cd "$(dirname "$0")/.."
BOOTSTRAP="kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092"
for topic in bottle.detected bottle.analysis.result bottle.rejected; do
  docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create \
    --topic "$topic" \
    --partitions 3 \
    --replication-factor 3 \
    --config min.insync.replicas=2 \
    --bootstrap-server "$BOOTSTRAP" \
    2>/dev/null || true
done
echo "Bottle supervision topics ready."
