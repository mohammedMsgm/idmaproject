import dotenv from 'dotenv';
import pg from 'pg';

// Load environment variables
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'idma_platform',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
});

console.log('🔍 Checking database schema...');

try {
  const client = await pool.connect();
  
  // Check if users table exists and its structure
  console.log('\n📋 Users table structure:');
  const tableInfo = await client.query(`
    SELECT column_name, data_type, is_nullable, column_default 
    FROM information_schema.columns 
    WHERE table_name = 'users' 
    ORDER BY ordinal_position;
  `);
  
  tableInfo.rows.forEach(row => {
    console.log(`  ${row.column_name}: ${row.data_type} ${row.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'} ${row.column_default ? `DEFAULT ${row.column_default}` : ''}`);
  });
  
  // Check if doctor_profiles table exists
  console.log('\n📋 Doctor profiles table structure:');
  const doctorProfileInfo = await client.query(`
    SELECT column_name, data_type, is_nullable, column_default 
    FROM information_schema.columns 
    WHERE table_name = 'doctor_profiles' 
    ORDER BY ordinal_position;
  `);
  
  if (doctorProfileInfo.rows.length > 0) {
    doctorProfileInfo.rows.forEach(row => {
      console.log(`  ${row.column_name}: ${row.data_type} ${row.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'} ${row.column_default ? `DEFAULT ${row.column_default}` : ''}`);
    });
  } else {
    console.log('  ❌ Doctor profiles table not found');
  }
  
  // Test a simple insert to verify the schema works
  console.log('\n🧪 Testing registration insert...');
  try {
    await client.query('BEGIN');
    
    const testResult = await client.query(
      'INSERT INTO users (name, email, password, user_type, avatar, doctor_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      ['Test User', 'test@test.com', 'hashedpassword', 'patient', '/patient-avatar.jpg', null]
    );
    
    console.log('✅ Test insert successful, new user ID:', testResult.rows[0].id);
    
    // Clean up test data
    await client.query('DELETE FROM users WHERE email = $1', ['test@test.com']);
    await client.query('COMMIT');
    
  } catch (testError) {
    await client.query('ROLLBACK');
    console.log('❌ Test insert failed:', testError.message);
  }
  
  client.release();
  await pool.end();
  
} catch (error) {
  console.error('❌ Database check failed:', error.message);
  await pool.end();
}
