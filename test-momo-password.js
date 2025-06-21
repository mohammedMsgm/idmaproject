// Test common passwords for momo user
import bcrypt from 'bcrypt';
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function testMomoPasswords() {
  try {
    // Get momo's password hash
    const result = await pool.query('SELECT password FROM users WHERE email = $1', ['momo@gmail.com']);
    if (result.rows.length === 0) {
      console.log('❌ User momo not found');
      return;
    }
    
    const storedHash = result.rows[0].password;
    console.log('🔍 Testing common passwords for momo...');
    
    const commonPasswords = ['123456', 'password', 'momo', 'admin', 'secret', '123', 'test'];
    
    for (const password of commonPasswords) {
      const isValid = await bcrypt.compare(password, storedHash);
      console.log(`  "${password}": ${isValid ? '✅ MATCH!' : '❌'}`);
      if (isValid) {
        console.log(`🎉 Found momo's password: "${password}"`);
        break;
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

testMomoPasswords();
