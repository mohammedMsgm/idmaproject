@echo off
echo Starting IDMA Platform with Database Support...
echo.
echo 🚀 Backend API: http://localhost:3001
echo 🌐 Frontend: http://localhost:5173
echo.
echo Press Ctrl+C to stop both services
echo.

start "Backend API" cmd /k "cd /d %~dp0 && npm run server"
timeout /t 3 /nobreak >nul
start "Frontend" cmd /k "cd /d %~dp0 && npm run dev"

echo Both services are starting...
echo Backend: Starting Express server with database...
echo Frontend: Starting Vite development server...
echo.
echo ✅ You can now register new users and they will be saved to PostgreSQL!
pause
