import { pool } from './lib/database.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function setupCompleteDatabase() {
  try {
    console.log('🚀 Setting up complete Neon PostgreSQL database...');
    
    const client = await pool.connect();
    console.log('✅ Connected to Neon database successfully');
    
    // Create users table
    console.log('📋 Creating users table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        user_type VARCHAR(10) NOT NULL CHECK (user_type IN ('patient', 'doctor')),
        avatar VARCHAR(255),
        doctor_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created');
    
    // Create doctor_profiles table
    console.log('📋 Creating doctor_profiles table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS doctor_profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        specialization VARCHAR(255) NOT NULL,
        license_number VARCHAR(100),
        experience_years INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Doctor profiles table created');
    
    // Add foreign key constraint
    console.log('📋 Adding foreign key constraints...');
    try {
      await client.query(`
        DO $$ 
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'fk_doctor_profiles_user_id'
          ) THEN
            ALTER TABLE doctor_profiles 
            ADD CONSTRAINT fk_doctor_profiles_user_id 
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
          END IF;
        END $$;
      `);
      console.log('✅ Foreign key constraints added');
    } catch (error) {
      console.log('⚠️  Constraint issue:', error.message);
    }
    
    // Insert sample doctors
    console.log('📋 Inserting sample doctors...');
    const doctorResult = await client.query(`
      INSERT INTO users (name, email, password, user_type, avatar) VALUES
      ('د. خالد العمري', 'khalid@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'doctor', '/doctor-avatar.jpg'),
      ('د. ليلى حسن', 'layla@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'doctor', '/doctor-avatar.jpg'),
      ('د. سيداني منير', 'sidani@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'doctor', '/doctor-avatar.jpg'),
      ('د. بورزق عائشة', 'aicha@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'doctor', '/doctor-avatar.jpg')
      ON CONFLICT (email) DO NOTHING
      RETURNING id, name, email
    `);
    console.log(`✅ Inserted ${doctorResult.rowCount} doctors`);
    
    // Insert doctor profiles
    console.log('📋 Inserting doctor profiles...');
    const profileResult = await client.query(`
      INSERT INTO doctor_profiles (user_id, specialization, experience_years) 
      SELECT u.id, v.specialization, v.experience_years
      FROM (VALUES
        ('khalid@example.com', 'طب نفسي', 10),
        ('layla@example.com', 'اخصائي اجتماعي', 8),
        ('sidani@example.com', 'اخصائي نفساني', 12),
        ('aicha@example.com', 'اخصائي اجتماعي', 6)
      ) AS v(email, specialization, experience_years)
      JOIN users u ON u.email = v.email AND u.user_type = 'doctor'
      WHERE NOT EXISTS (SELECT 1 FROM doctor_profiles WHERE user_id = u.id)
      RETURNING id, user_id, specialization
    `);
    console.log(`✅ Inserted ${profileResult.rowCount} doctor profiles`);
    
    // Insert sample patients
    console.log('📋 Inserting sample patients...');
    const patientResult = await client.query(`
      INSERT INTO users (name, email, password, user_type, avatar, doctor_id)
      SELECT v.name, v.email, v.password, v.user_type, v.avatar, d.id
      FROM (VALUES
        ('أحمد محمد', 'ahmed@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient', '/patient-avatar.jpg', 'khalid@example.com'),
        ('فاطمة علي', 'fatima@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient', '/patient-avatar.jpg', 'khalid@example.com'),
        ('محمد سالم', 'mohamed@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient', '/patient-avatar.jpg', 'layla@example.com'),
        ('نور الهدى', 'nour@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient', '/patient-avatar.jpg', 'sidani@example.com'),
        ('يوسف أحمد', 'youssef@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient', '/patient-avatar.jpg', 'aicha@example.com')
      ) AS v(name, email, password, user_type, avatar, doctor_email)
      JOIN users d ON d.email = v.doctor_email AND d.user_type = 'doctor'
      WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = v.email)
      RETURNING id, name, email
    `);
    console.log(`✅ Inserted ${patientResult.rowCount} patients`);
    
    // Create indexes
    console.log('📋 Creating indexes...');
    await client.query(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_users_type ON users(user_type)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_users_doctor_id ON users(doctor_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_doctor_profiles_user_id ON doctor_profiles(user_id)`);
    console.log('✅ Indexes created');
    
    // Final verification
    console.log('🧪 Verifying database setup...');
    
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    console.log('📊 Created tables:', tablesResult.rows.map(row => row.table_name));
    
    const userCount = await client.query('SELECT COUNT(*) FROM users');
    const doctorCount = await client.query('SELECT COUNT(*) FROM users WHERE user_type = \'doctor\'');
    const patientCount = await client.query('SELECT COUNT(*) FROM users WHERE user_type = \'patient\'');
    const profileCount = await client.query('SELECT COUNT(*) FROM doctor_profiles');
    
    console.log('📈 Data summary:');
    console.log(`   Total users: ${userCount.rows[0].count}`);
    console.log(`   Doctors: ${doctorCount.rows[0].count}`);
    console.log(`   Patients: ${patientCount.rows[0].count}`);
    console.log(`   Doctor profiles: ${profileCount.rows[0].count}`);
    
    client.release();
    console.log('🎉 Neon database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the setup
setupCompleteDatabase();
