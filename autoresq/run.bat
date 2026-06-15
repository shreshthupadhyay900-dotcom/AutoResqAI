@echo off
title AutoResQ AI Launcher
cd "%~dp0"

:: Check if we need to enter the autoresq directory
if exist autoresq (
    cd autoresq
)

echo ========================================================
echo               AutoResQ AI Local Server Launcher
echo ========================================================
echo.
echo Launching your default browser to: http://localhost:8080
echo.

:: Open default web browser
start "" "http://localhost:8080"

:: Start python server on port 8080
python -m http.server 8080

:: Fallback if python is not available (tries node/npx)
if %errorlevel% neq 0 (
    echo.
    echo Python not found, trying npx http-server...
    npx -y http-server -p 8080
)

pause
