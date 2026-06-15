@echo off
title AutoResQ AI Launcher
cd "%~dp0"

if exist autoresq (
    cd autoresq
)

echo ========================================================
echo               AutoResQ AI Local Server Launcher
echo ========================================================
echo.
echo Launching your default browser to: http://localhost:8080
echo.

start "" "http://localhost:8080"

python -m http.server 8080

if %errorlevel% neq 0 (
    echo.
    echo Python not found, trying npx http-server...
    npx -y http-server -p 8080
)

pause
