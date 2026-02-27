@echo off
REM Create topic for Step 3 (Producers): user-clicks, 2 partitions, RF 3, min.insync.replicas=2. Run from project root.
cd /d "%~dp0.."
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create --topic user-clicks --partitions 2 --replication-factor 3 --config min.insync.replicas=2 --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
