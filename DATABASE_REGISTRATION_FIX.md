# IDMA Platform - Database Registration Fix

## ✅ Problem Fixed!

The registration system now properly saves to PostgreSQL database instead of just mock data.

## 🚀 How to Run with Database Support

### Option 1: Run Full Stack (Recommended)
```bash
# Start both frontend and backend together
npm run dev:full
```

### Option 2: Run Separately
```bash
# Terminal 1: Start backend API server
npm run server

# Terminal 2: Start frontend
npm run dev
```

## 🔧 What's Changed

1. **New Backend API** (`server.js`):
   - Express server with PostgreSQL integration
   - Real user registration that saves to database
   - Password hashing with bcrypt
   - Doctor profile creation

2. **Updated Frontend** (`authAPI.ts`):
   - Makes HTTP requests to backend API
   - Falls back to mock data if backend unavailable
   - Proper error handling

3. **Database Integration**:
   - New users saved to `users` table
   - Doctor profiles saved to `doctor_profiles` table
   - Passwords properly hashed and stored

## 🧪 Test Registration

1. Start the full stack: `npm run dev:full`
2. Go to registration page
3. Create a new account (patient or doctor)
4. The user will be saved to PostgreSQL database!

## 🔍 Verify Database Changes

Check if new users are saved:
```bash
npm run db:connect
```
Then in PostgreSQL:
```sql
SELECT id, name, email, user_type FROM users ORDER BY id DESC LIMIT 5;
```

## 📡 API Endpoints

- `POST /api/login` - User login
- `POST /api/register` - User registration  
- `GET /api/doctors` - Get all doctors
- `GET /health` - Server health check

Backend runs on: http://localhost:3001
Frontend runs on: http://localhost:5173

## 🔄 Fallback System

If the backend server is not running, the frontend will automatically fall back to mock data, so the app still works during development.
