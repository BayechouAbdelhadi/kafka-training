@echo off
REM Create the learning topic (3 partitions, RF 1). Run from project root.
REM Requires Kafka to be running: docker compose up -d
cd /d "%~dp0.."
docker compose exec kafka /opt/kafka/bin/kafka-topics.sh --create --topic learning --partitions 3 --replication-factor 1 --bootstrap-server localhost:9092
