@echo off
REM Create the orders topic. Run from project root.
REM Requires Kafka to be running: docker compose up -d
cd /d "%~dp0..\.."
docker compose exec kafka /opt/kafka/bin/kafka-topics.sh --create --topic orders --partitions 1 --replication-factor 1 --bootstrap-server localhost:9092
