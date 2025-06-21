import { testConnection } from '../src/lib/database.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const testDatabase = async () => {
  console.log('🔌 Testing database connection...');
  console.log(`📋 Database: ${process.env.DB_NAME}`);
  console.log(`📋 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
  console.log(`📋 User: ${process.env.DB_USER}`);
  
  const connected = await testConnection();
  
  if (connected) {
    console.log('✅ Database connection successful!');
    console.log('🎉 You can now run the application with: npm run dev');
  } else {
    console.log('❌ Database connection failed!');
    console.log('💡 Please check:');
    console.log('   - PostgreSQL service is running');
    console.log('   - Database credentials in .env file');
    console.log('   - Database "idma_platform" exists');
  }
  
  process.exit(connected ? 0 : 1);
};

testDatabase();
