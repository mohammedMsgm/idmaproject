import dotenv from 'dotenv';
import { testConnection } from './src/lib/database.js';

// Load environment variables
dotenv.config();

console.log('🔌 Testing database connection...');
console.log('Configuration:');
console.log(`  Host: ${process.env.DB_HOST || 'localhost'}`);
console.log(`  Port: ${process.env.DB_PORT || '5432'}`);
console.log(`  Database: ${process.env.DB_NAME || 'idma_platform'}`);
console.log(`  User: ${process.env.DB_USER || 'postgres'}`);
console.log('');

const connected = await testConnection();

if (connected) {
  console.log('✅ Database connection successful!');
  console.log('🎉 Your PostgreSQL setup is working correctly!');
  
  // Test a simple query
  try {
    const { query } = await import('./src/lib/database.js');
    const result = await query('SELECT COUNT(*) as user_count FROM users');
    console.log(`👥 Found ${result.rows[0].user_count} users in the database`);
    
    const doctors = await query("SELECT name FROM users WHERE user_type = 'doctor'");
    console.log(`👨‍⚕️ Doctors: ${doctors.rows.map(d => d.name).join(', ')}`);
    
    const patients = await query("SELECT name FROM users WHERE user_type = 'patient'");
    console.log(`🏥 Patients: ${patients.rows.map(p => p.name).join(', ')}`);
    
  } catch (error) {
    console.log('⚠️  Database connected but tables might not be set up yet');
    console.log('   Run the schema setup if you haven\'t already');
  }
} else {
  console.log('❌ Database connection failed!');
  console.log('📋 Please check:');
  console.log('   1. PostgreSQL is running');
  console.log('   2. Database "idma_platform" exists');
  console.log('   3. Your .env file has correct credentials');
}

process.exit(0);
