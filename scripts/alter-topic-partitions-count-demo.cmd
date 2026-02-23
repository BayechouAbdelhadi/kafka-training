@echo off
REM Alter topic partitions-count-demo to 4 partitions. Run from project root.
cd /d "%~dp0.."
docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --alter --topic partitions-count-demo --partitions 4 --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
