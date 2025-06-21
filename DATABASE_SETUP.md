# Database Setup Instructions

## Prerequisites
1. Install PostgreSQL on your system
2. Make sure PostgreSQL service is running

## Setup Steps

### 1. Create Database
```bash
# Connect to PostgreSQL as superuser
psql -U postgres

# Create the database
CREATE DATABASE idma_platform;

# Exit psql
\q
```

### 2. Configure Environment Variables
Update the `.env` file with your PostgreSQL credentials:
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=idma_platform
DB_PASSWORD=your_postgres_password
DB_PORT=5432
```

### 3. Initialize Database Schema
```bash
# Run the schema setup
npm run db:setup
```

### 4. Test Database Connection
```bash
npm run db:init
```

## Test Accounts

After setting up the database, you can login with these accounts:

### Doctors
- **د. خالد العمري**: khalid@example.com (password: 123456)
- **د. ليلى حسن**: layla@example.com (password: 123456)
- **د. سيداني منير**: sidani@example.com (password: 123456)
- **د. بورزق عائشة**: aicha@example.com (password: 123456)

### Patients
- **أحمد محمد**: ahmed@example.com (password: 123456)
- **فاطمة علي**: fatima@example.com (password: 123456)
- **محمد سالم**: mohamed@example.com (password: 123456)
- **نور الهدى**: nour@example.com (password: 123456)
- **يوسف أحمد**: youssef@example.com (password: 123456)

## Troubleshooting

### Database Connection Issues
1. Ensure PostgreSQL is running
2. Check your database credentials in `.env`
3. Verify the database exists: `psql -U postgres -l`

### Permission Issues
If you get permission errors, make sure your PostgreSQL user has the necessary privileges:
```sql
GRANT ALL PRIVILEGES ON DATABASE idma_platform TO your_user;
```
