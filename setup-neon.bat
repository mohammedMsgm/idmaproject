@echo off
echo Setting up Neon PostgreSQL database...
echo.

echo Checking if DATABASE_URL is set...
if "%DATABASE_URL%"=="" (
    echo ERROR: DATABASE_URL environment variable is not set!
    echo Please update your .env file with your Neon connection string.
    echo Example: DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
    echo.
    echo Press any key to exit...
    pause > nul
    exit /b 1
)

echo DATABASE_URL is configured.
echo.

echo Installing dependencies...
npm install

echo.
echo Running database setup...
node setup-neon-database.js

echo.
echo Testing database connection...
node test-db-simple.js

echo.
echo Setup complete! Your application is now configured to use Neon PostgreSQL.
echo.
pause
