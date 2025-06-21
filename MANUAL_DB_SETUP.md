# Manual Database Setup Guide

## Step 1: Open Command Prompt as Administrator

1. Press `Win + R`, type `cmd`, then press `Ctrl + Shift + Enter`
2. Click "Yes" when prompted for administrator privileges

## Step 2: Create the Database

Run this command (you'll be prompted for the postgres password):

```cmd
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -c "CREATE DATABASE idma_platform;"
```

If you get a "database already exists" error, that's fine - skip to Step 3.

## Step 3: Set up the Database Schema

Run this command to create tables and insert test data:

```cmd
cd "c:\Users\adnde\OneDrive\Desktop\idmaproject"
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d idma_platform -f database\schema.sql
```

## Step 4: Update Environment Variables

Make sure your `.env` file has the correct PostgreSQL password. The file should look like this:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=idma_platform
DB_PASSWORD=postgres
DB_PORT=5432
```

Replace `postgres` with your actual PostgreSQL password if different.

## Step 5: Test the Connection

```cmd
npm run db:init
```

## Alternative: Use pgAdmin

If command line is difficult, you can use pgAdmin (PostgreSQL's GUI tool):

1. Open pgAdmin (should be installed with PostgreSQL)
2. Connect to your PostgreSQL server
3. Right-click "Databases" → "Create" → "Database"
4. Name it "idma_platform"
5. Open the Query Tool and copy-paste the contents of `database\schema.sql`
6. Execute the script

## Troubleshooting

### If psql command not found:
- Make sure PostgreSQL is installed
- Use the full path: `"C:\Program Files\PostgreSQL\17\bin\psql.exe"`

### If connection is refused:
- Make sure PostgreSQL service is running
- Check Windows Services for "postgresql-x64-17"

### If password authentication fails:
- Try default password "postgres"
- Reset password using pgAdmin
- Or use Windows authentication if configured

### If permission denied:
- Run Command Prompt as Administrator
- Check PostgreSQL service is running under correct user

## Quick Test

Once everything is set up, test the application:

```cmd
npm run dev
```

Then go to http://localhost:5173 and try logging in with:
- Email: ahmed@example.com
- Password: 123456
- User Type: مريض (Patient)

You should see "أحمد محمد" in the dashboard instead of the old hardcoded name!
