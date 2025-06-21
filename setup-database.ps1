# PowerShell script to set up IDMA Platform database
Write-Host "🚀 Setting up IDMA Platform Database..." -ForegroundColor Green
Write-Host ""

$PgPath = "C:\Program Files\PostgreSQL\17\bin\psql.exe"
$DatabaseName = "idma_platform"

# Check if PostgreSQL is installed
if (!(Test-Path $PgPath)) {
    Write-Host "❌ PostgreSQL not found at: $PgPath" -ForegroundColor Red
    Write-Host "Please install PostgreSQL or update the path in this script." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "📋 Step 1: Creating database '$DatabaseName'..." -ForegroundColor Cyan
try {
    & $PgPath -U postgres -c "CREATE DATABASE $DatabaseName;"
    Write-Host "✅ Database created successfully!" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Database might already exist (this is okay)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📋 Step 2: Setting up database schema..." -ForegroundColor Cyan
try {
    & $PgPath -U postgres -d $DatabaseName -f "database\schema.sql"
    Write-Host "✅ Schema setup completed!" -ForegroundColor Green
} catch {
    Write-Host "❌ Schema setup failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "📋 Step 3: Testing database connection..." -ForegroundColor Cyan
try {
    node "scripts\test-db.js"
} catch {
    Write-Host "⚠️  Node.js test failed, but database should be set up" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Database setup complete!" -ForegroundColor Green
Write-Host "You can now run: npm run dev" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"
