@echo off
setlocal enabledelayedexpansion
REM Produce one message per second to order-topic with key=user, value=order-N. Run from project root.
REM Uses a fixed list of users as keys (round-robin). Use with Step 4 (Consumers). Stop with Ctrl+C.
cd /d "%~dp0.."
set i=1
set idx=1
:loop
if !idx!==1 set key=user-alice
if !idx!==2 set key=user-bob
if !idx!==3 set key=user-carol
echo !key!:order-!i!| docker compose exec -T kafka-1 /opt/kafka/bin/kafka-console-producer.sh --bootstrap-server kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092 --topic order-topic --property parse.key=true --property key.separator=:
set /a i+=1
set /a idx=idx %% 3 + 1
timeout /t 1 /nobreak >nul
goto loop
