@echo off
REM Create topics for bottle supervision (Step 5). Run from project root.
cd /d "%~dp0.."
set BOOTSTRAP=kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092
for %%t in (bottle.detected bottle.analysis.result bottle.rejected) do (
  docker compose exec kafka-1 /opt/kafka/bin/kafka-topics.sh --create --topic %%t --partitions 3 --replication-factor 3 --config min.insync.replicas=2 --bootstrap-server %BOOTSTRAP% 2>nul
)
echo Bottle supervision topics ready.
