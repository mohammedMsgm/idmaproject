@echo off
echo Setting up IDMA Platform Database...
echo.

set PGPATH=C:\Program Files\PostgreSQL\17\bin
set PGPASSWORD=postgres

echo Creating database...
"%PGPATH%\psql.exe" -U postgres -h localhost -c "CREATE DATABASE idma_platform;"

echo.
echo Setting up database schema...
"%PGPATH%\psql.exe" -U postgres -h localhost -d idma_platform -f database\schema.sql

echo.
echo Testing database connection...
node scripts\test-db.js

echo.
echo Database setup complete!
pause
