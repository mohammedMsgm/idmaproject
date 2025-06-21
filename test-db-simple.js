import dotenv from 'dotenv';
import pg from 'pg';

// Load environment variables
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'idma_platform',
  password: process.env.DB_PASSWORD || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
});

console.log('🔌 Testing database connection...');
console.log('Configuration:');
console.log(`  Host: ${process.env.DB_HOST || 'localhost'}`);
console.log(`  Port: ${process.env.DB_PORT || '5432'}`);
console.log(`  Database: ${process.env.DB_NAME || 'idma_platform'}`);
console.log(`  User: ${process.env.DB_USER || 'postgres'}`);
console.log('');

try {
  const client = await pool.connect();
  console.log('✅ Database connection successful!');
  
  // Test if tables exist
  const result = await client.query('SELECT COUNT(*) as user_count FROM users');
  console.log(`👥 Found ${result.rows[0].user_count} users in the database`);
  
  const doctors = await client.query("SELECT name FROM users WHERE user_type = 'doctor'");
  console.log(`👨‍⚕️ Doctors: ${doctors.rows.map(d => d.name).join(', ')}`);
  
  const patients = await client.query("SELECT name FROM users WHERE user_type = 'patient'");
  console.log(`🏥 Patients: ${patients.rows.map(p => p.name).join(', ')}`);
  
  console.log('🎉 Your PostgreSQL setup is working correctly!');
  console.log('');
  console.log('✅ You can now run: npm run dev');
  console.log('✅ Try logging in with any of these accounts:');
  console.log('   • ahmed@example.com (أحمد محمد)');
  console.log('   • khalid@example.com (د. خالد العمري)');
  console.log('   • Password for all: 123456');
  
  client.release();
  await pool.end();
} catch (error) {
  if (error.code === '42P01') {
    console.log('⚠️  Database connected but tables don\'t exist yet');
    console.log('💡 Please run the schema setup:');
    console.log('   "C:\\Program Files\\PostgreSQL\\17\\bin\\psql.exe" -U postgres -h localhost -d idma_platform -f "database\\schema.sql"');
  } else {
    console.log('❌ Database connection failed!');
    console.log('Error:', error.message);
    console.log('');
    console.log('📋 Please check:');
    console.log('   1. PostgreSQL is running');
    console.log('   2. Database "idma_platform" exists');
    console.log('   3. Your .env file has correct credentials');
  }
  await pool.end();
}
