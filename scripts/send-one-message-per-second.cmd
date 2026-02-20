@echo off
setlocal enabledelayedexpansion
REM Send one message per second to the learning topic. Run from project root.
REM Requires Kafka and topic "learning" to exist. Stop with Ctrl+C.
cd /d "%~dp0.."
set i=1
:loop
echo message-!i!| docker compose exec -T kafka /opt/kafka/bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic learning
set /a i+=1
timeout /t 1 /nobreak >nul
goto loop
