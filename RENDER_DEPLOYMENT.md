# Render Deployment Guide

## Overview
This guide will help you deploy the IDMA Platform to Render with separate frontend and backend services.

## Prerequisites
1. Neon Database (already set up)
2. Render account
3. GitHub repository with your code

## Deployment Steps

### 1. Backend Deployment

1. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Choose the root directory
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Set Environment Variables**
   ```
   NODE_ENV=production
   DATABASE_URL=your_neon_database_connection_string
   FRONTEND_URL=https://your-frontend-app.onrender.com
   ```

3. **Get Backend URL**
   - After deployment, note your backend URL (e.g., `https://your-backend-app.onrender.com`)

### 2. Frontend Deployment

1. **Update API URL**
   - Edit `src/services/authAPI.ts`
   - Replace `https://your-backend-app.onrender.com/api` with your actual backend URL

2. **Create a new Static Site on Render**
   - Connect your GitHub repository
   - Choose the root directory
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

### 3. Update CORS Configuration

After both services are deployed:
1. Update the `FRONTEND_URL` environment variable in your backend service
2. Replace it with your actual frontend URL from Render

## Environment Variables Reference

### Backend (.env for production)
```
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend-app.onrender.com
```

### Frontend
No environment variables needed - the API URL is set automatically based on build environment.

## Database Schema

Make sure your Neon database has the required tables. You can run the schema from `database/schema.sql` on your Neon database.

## Testing

1. Test backend: `https://your-backend-app.onrender.com/health`
2. Test frontend: `https://your-frontend-app.onrender.com`

## Troubleshooting

- **CORS Issues**: Make sure `FRONTEND_URL` in backend matches your frontend URL
- **Database Connection**: Verify your `DATABASE_URL` is correct and includes `?sslmode=require`
- **Build Failures**: Check build logs on Render dashboard
