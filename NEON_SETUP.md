# Neon PostgreSQL Setup Guide

This guide will help you set up your IDMA Platform to use Neon PostgreSQL, a serverless PostgreSQL database.

## Prerequisites

- A Neon account (free tier available at [neon.tech](https://neon.tech))
- Node.js installed on your system

## Step 1: Create a Neon Database

1. **Sign up for Neon**
   - Go to [console.neon.tech](https://console.neon.tech)
   - Sign up for a free account
   - Verify your email address

2. **Create a New Project**
   - Click "Create Project"
   - Choose a project name (e.g., "IDMA Platform")
   - Select a region closest to your users
   - Choose PostgreSQL version (latest stable recommended)

3. **Get Your Connection String**
   - After project creation, you'll see a connection string like:
   ```
   postgresql://username:password@hostname/dbname?sslmode=require
   ```
   - Copy this connection string

## Step 2: Configure Your Application

1. **Update Environment Variables**
   - Open your `.env` file
   - Replace the `DATABASE_URL` value with your Neon connection string:
   ```env
   DATABASE_URL=postgresql://your-username:your-password@your-hostname/your-dbname?sslmode=require
   ```

2. **Example Configuration**
   ```env
   # Database Configuration - Neon PostgreSQL
   DATABASE_URL=postgresql://myuser:mypassword@ep-cool-lab-123456.us-east-1.aws.neon.tech/mydb?sslmode=require
   
   # Legacy format (kept for compatibility)
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=idma_platform
   DB_PASSWORD=password
   DB_PORT=5432
   ```

## Step 3: Set Up Database Schema

Run the setup script to create your database tables:

```bash
node setup-neon-database.js
```

This script will:
- Test the connection to your Neon database
- Execute the schema.sql file to create all necessary tables
- Verify that the setup was successful

## Step 4: Test Your Connection

You can test your database connection using any of these scripts:

```bash
# Test basic connection
node test-db-simple.js

# Test with schema validation
node check-schema.js

# Test user operations
node check-users.js
```

## Step 5: Update Your Application

Your application should now automatically use the Neon database. The configuration supports both:
- **Connection String**: When `DATABASE_URL` is set (Neon)
- **Individual Parameters**: Fallback for local development

## Benefits of Using Neon

✅ **Serverless**: No server management required
✅ **Auto-scaling**: Automatically scales with your application
✅ **Branching**: Create database branches for different environments
✅ **Free Tier**: Generous free tier for development and small projects
✅ **High Performance**: Fast, globally distributed PostgreSQL
✅ **Backup & Recovery**: Automatic backups and point-in-time recovery

## Troubleshooting

### Connection Issues
- Ensure your connection string is correct
- Check that SSL is enabled (`?sslmode=require`)
- Verify your Neon project is active

### Schema Issues
- Run `node setup-neon-database.js` to recreate tables
- Check the `database/schema.sql` file for any syntax errors

### Environment Variables
- Make sure your `.env` file is in the project root
- Restart your application after changing environment variables

## Environment-Specific Setup

### Development
Use your Neon database connection string in `.env`

### Production
Set the `DATABASE_URL` environment variable in your hosting platform:
- **Vercel**: Add to environment variables in project settings
- **Netlify**: Add to site settings > environment variables
- **Heroku**: Use `heroku config:set DATABASE_URL="your-connection-string"`

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use different databases** for development, staging, and production
3. **Regularly rotate passwords** in production environments
4. **Use Neon's branching feature** for testing schema changes

## Support

- Neon Documentation: [neon.tech/docs](https://neon.tech/docs)
- PostgreSQL Documentation: [postgresql.org/docs](https://postgresql.org/docs)
- Project Issues: Check your application logs and Neon console

---

Your IDMA Platform is now configured to use Neon PostgreSQL! 🎉
