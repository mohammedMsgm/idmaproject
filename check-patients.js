// Check patient IDs and their assigned doctors
import { query } from './lib/database.js';

const checkPatients = async () => {
  try {
    console.log('🔍 Checking patients and their assigned doctors...');
    
    const result = await query(
      'SELECT id, name, email, user_type, doctor_id FROM users WHERE user_type = $1 ORDER BY id',
      ['patient']
    );
    
    console.log('📋 Patients in database:');
    result.rows.forEach(patient => {
      console.log(`- ID: ${patient.id}, Name: ${patient.name}, Email: ${patient.email}, Doctor ID: ${patient.doctor_id || 'None'}`);
    });
    
    // Also check doctors
    const doctors = await query(
      'SELECT id, name, email FROM users WHERE user_type = $1 ORDER BY id',
      ['doctor']
    );
    
    console.log('\n👨‍⚕️ Doctors in database:');
    doctors.rows.forEach(doctor => {
      console.log(`- ID: ${doctor.id}, Name: ${doctor.name}, Email: ${doctor.email}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
  
  process.exit(0);
};

checkPatients();
