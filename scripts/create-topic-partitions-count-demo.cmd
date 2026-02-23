@echo off
REM Create topic for partition-count exercise: 2 partitions. Run from project root.
cd /d "%~dp0.."
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create --topic partitions-count-demo --partitions 2 --replication-factor 1 --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
