@echo off
REM Create a topic with 3 partitions to show distribution across brokers. Run from project root.
REM Requires Kafka (3 brokers) to be running: docker compose up -d
cd /d "%~dp0.."
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create --topic partitions-demo --partitions 3 --replication-factor 1 --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092
