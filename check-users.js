// Check what users exist in the database
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

async function checkUsers() {
  try {
    console.log('🔍 Checking users in database...');
    
    // Get all users
    const usersResult = await pool.query('SELECT * FROM users ORDER BY id');
    console.log('\n📋 Users in database:');
    usersResult.rows.forEach(user => {
      console.log(`  ${user.id}: ${user.name} (${user.email}) - ${user.user_type}`);
    });
    
    // Get all doctor profiles
    const doctorsResult = await pool.query('SELECT * FROM doctor_profiles ORDER BY user_id');
    console.log('\n👨‍⚕️ Doctor profiles:');
    doctorsResult.rows.forEach(doctor => {
      console.log(`  User ID ${doctor.user_id}: ${doctor.specialization}`);
    });
    
  } catch (error) {
    console.error('❌ Error checking users:', error.message);
  } finally {
    await pool.end();
  }
}

checkUsers();
