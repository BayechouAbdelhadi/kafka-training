@echo off
setlocal enabledelayedexpansion
REM Produce one message per second to order-topic. Run from project root.
REM Use with Step 4 (Consumers): run this, then start consumer groups. Stop with Ctrl+C.
cd /d "%~dp0.."
set i=1
:loop
echo order-!i!| docker compose exec -T kafka-1 /opt/kafka/bin/kafka-console-producer.sh --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092 --topic order-topic
set /a i+=1
timeout /t 1 /nobreak >nul
goto loop
