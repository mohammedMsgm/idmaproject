// Test the patient doctor API endpoint
const testPatientDoctor = async () => {
  console.log('🧪 Testing patient doctor API...');
    // Test with a patient that has a doctor assigned
  const patientId = '12'; // m9rota patient who now has doctor assigned
  
  try {
    const response = await fetch(`http://localhost:3001/api/patient/${patientId}/doctor`);
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ API request successful!');
      console.log('📋 Result:', JSON.stringify(result, null, 2));
      
      if (result.doctor) {
        console.log('👨‍⚕️ Doctor found:', result.doctor.name);
        console.log('🏥 Specialization:', result.doctor.specialization);
        console.log('🖼️ Avatar:', result.doctor.avatar);
      } else {
        console.log('ℹ️ No doctor assigned to this patient');
      }
    } else {
      console.log('❌ API request failed:', result.message);
    }
    
  } catch (error) {
    console.error('❌ API request failed:', error.message);
  }
};

testPatientDoctor();
