# IDMA Platform - Authentication Update

## What's Fixed

The authentication system has been updated to solve the hardcoded names issue. Now when you login, you'll see the actual user's name instead of the static "أحمد محمد" for patients or "د. سارة الأحمد" for doctors.

## Two Options Available

### Option 1: Use Mock Data (Immediate - No Database Required)
The system now includes intelligent fallback to mock data when PostgreSQL is not available. This works out of the box.

### Option 2: Use PostgreSQL Database (Full Solution)
For the complete database solution, follow the setup instructions in `DATABASE_SETUP.md`.

## Test Accounts

You can now login with these specific accounts and see the correct names:

### Patients:
- **أحمد محمد**: ahmed@example.com (password: 123456)
- **فاطمة علي**: fatima@example.com (password: 123456)  
- **محمد سالم**: mohamed@example.com (password: 123456)
- **نور الهدى**: nour@example.com (password: 123456)
- **يوسف أحمد**: youssef@example.com (password: 123456)

### Doctors:
- **د. خالد العمري**: khalid@example.com (password: 123456)
- **د. ليلى حسن**: layla@example.com (password: 123456)
- **د. سيداني منير**: sidani@example.com (password: 123456)
- **د. بورزق عائشة**: aicha@example.com (password: 123456)

## Quick Start

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Go to the login page and try any of the test accounts above

3. You should now see the correct user names in the dashboard!

## Database Setup (Optional)

If you want to use the full PostgreSQL solution:

1. Install PostgreSQL
2. Follow instructions in `DATABASE_SETUP.md`
3. Run `npm run db:init` to test connection
4. Run `npm run db:setup` to create tables and data

The system will automatically detect if the database is available and use it, otherwise it will fallback to the mock data.

## Files Changed

- `src/contexts/AuthContext.tsx` - Updated to use real authentication
- `src/services/auth.ts` - New authentication service with database support
- `src/lib/database.ts` - Database connection configuration
- `src/data/mockData.ts` - Mock data fallback
- `database/schema.sql` - PostgreSQL database schema
- Login page updated with demo accounts list

## Features

✅ **Real user authentication** - No more hardcoded names
✅ **Database integration** - PostgreSQL support with proper schema  
✅ **Intelligent fallback** - Works with or without database
✅ **Password hashing** - Secure bcrypt password storage
✅ **Test accounts** - Ready-to-use demo accounts
✅ **Error handling** - Proper error messages in Arabic
