#!/usr/bin/env node

import { testConnection } from '../src/lib/database.js';

const initDatabase = async () => {
  console.log('🔌 Testing database connection...');
  
  const connected = await testConnection();
  
  if (connected) {
    console.log('✅ Database connection successful!');
    console.log('📋 To set up the database schema, run:');
    console.log('   psql -U postgres -d idma_platform -f database/schema.sql');
  } else {
    console.log('❌ Database connection failed!');
    console.log('📋 Make sure PostgreSQL is running and check your .env configuration:');
    console.log('   - DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD');
  }
  
  process.exit(connected ? 0 : 1);
};

initDatabase();
