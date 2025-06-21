// Test registration with real doctor selection
const testRegistrationWithDoctor = async () => {
  console.log('🧪 Testing registration with real doctor selection...');
  
  const newPatient = {
    name: 'مريض جديد مع طبيب',
    email: 'test-with-real-doctor@example.com',
    password: '123456',
    userType: 'patient',
    doctorId: '10' // tbib doctor from database
  };
  
  try {
    const response = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPatient)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Registration successful!');
      console.log('👤 New patient:', result.user);
      console.log('🏥 Doctor ID assigned:', result.user.doctor_id || 'None');
      
      if (result.user.doctor_id) {
        console.log('✅ Doctor successfully assigned during registration!');
        
        // Test the patient doctor API
        const doctorResponse = await fetch(`http://localhost:3001/api/patient/${result.user.id}/doctor`);
        const doctorResult = await doctorResponse.json();
        
        if (doctorResult.success && doctorResult.doctor) {
          console.log('✅ Patient doctor API working!');
          console.log('👨‍⚕️ Assigned doctor:', doctorResult.doctor.name);
          console.log('🏥 Specialization:', doctorResult.doctor.specialization);
        }
      } else {
        console.log('❌ Doctor ID not assigned during registration');
      }
    } else {
      console.log('❌ Registration failed:', result.message);
    }
    
  } catch (error) {
    console.error('❌ API request failed:', error.message);
  }
};

testRegistrationWithDoctor();
