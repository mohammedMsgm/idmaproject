// Assign a doctor to a patient for testing
import { query } from './lib/database.js';

const assignDoctorToPatient = async () => {
  try {
    console.log('🔧 Assigning doctor to patient for testing...');
    
    // Assign doctor ID 10 (tbib) to patient ID 12 (m9rota)
    const result = await query(
      'UPDATE users SET doctor_id = $1 WHERE id = $2 AND user_type = $3',
      [10, 12, 'patient']
    );
    
    console.log('✅ Updated', result.rowCount, 'patient');
    
    // Verify the assignment
    const verification = await query(
      'SELECT id, name, email, doctor_id FROM users WHERE id = $1',
      [12]
    );
    
    const patient = verification.rows[0];
    console.log(`📋 Patient: ${patient.name} (ID: ${patient.id}) now assigned to Doctor ID: ${patient.doctor_id}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
  
  process.exit(0);
};

assignDoctorToPatient();
