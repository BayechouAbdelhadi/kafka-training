@echo off
REM Create topic for Step 4 (Consumers): order-topic, 3 partitions, RF 1. Run from project root.
cd /d "%~dp0.."
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create --topic order-topic --partitions 3 --replication-factor 1 --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
