import dotenv from 'dotenv';
import pg from 'pg';
import bcrypt from 'bcryptjs';

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

console.log('🔍 Checking database passwords...');

try {
  const client = await pool.connect();
  
  // Check current users and their password hashes
  console.log('\n📋 Current users in database:');
  const users = await client.query('SELECT id, name, email, user_type, LEFT(password, 20) as password_preview FROM users ORDER BY id');
  
  users.rows.forEach(user => {
    console.log(`  ${user.id}: ${user.name} (${user.email}) - ${user.user_type} - Password: ${user.password_preview}...`);
  });
  
  // Hash the password "123456" to see what it should look like
  const testPasswordHash = await bcrypt.hash('123456', 10);
  console.log('\n🔐 Newly hashed "123456":', testPasswordHash.substring(0, 20) + '...');
  
  // Test if any existing password matches "123456"
  console.log('\n🧪 Testing password verification:');
  for (const user of users.rows) {
    const fullUser = await client.query('SELECT password FROM users WHERE id = $1', [user.id]);
    const storedPassword = fullUser.rows[0].password;
    
    try {
      const isValid = await bcrypt.compare('123456', storedPassword);
      console.log(`  ${user.name}: Password "123456" ${isValid ? '✅ VALID' : '❌ INVALID'}`);
    } catch (error) {
      console.log(`  ${user.name}: ❌ Error checking password - ${error.message}`);
    }
  }
  
  client.release();
  await pool.end();
  
} catch (error) {
  console.error('❌ Database check failed:', error.message);
  await pool.end();
}
