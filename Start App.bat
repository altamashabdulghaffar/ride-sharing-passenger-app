@echo off
title Smart Safe Ride
cd /d "%~dp0"
start "" "http://localhost:5510/app.html"
node serve.js
pause
