@echo off
setlocal enabledelayedexpansion
REM Produce one message per second to keys-demo (no key). Run from project root.
REM Run ~1 min, then Ctrl+C, then consume to see non-order.
cd /d "%~dp0.."
set i=1
:loop
echo message-!i!| docker compose exec -T kafka-1 /opt/kafka/bin/kafka-console-producer.sh --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092 --topic keys-demo
set /a i+=1
timeout /t 1 /nobreak >nul
goto loop
