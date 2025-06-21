// Test doctor registration with new avatar
const testDoctorRegistration = async () => {
  console.log('🧪 Testing new doctor registration with automatic avatar...');
  
  const newDoctor = {
    name: 'د. اختبار جديد',
    email: 'test-doctor-avatar@example.com',
    password: '123456',
    userType: 'doctor'
  };
  
  try {
    const response = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDoctor)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Doctor registration successful!');
      console.log('👨‍⚕️ New doctor:', result.user);
      console.log('🖼️ Avatar:', result.user.avatar);
      
      // Verify the avatar is /pfpdoc.png
      if (result.user.avatar === '/pfpdoc.png') {
        console.log('✅ Doctor avatar correctly set to /pfpdoc.png');
      } else {
        console.log('❌ Doctor avatar not set correctly, got:', result.user.avatar);
      }
    } else {
      console.log('❌ Doctor registration failed:', result.message);
    }
    
  } catch (error) {
    console.error('❌ API request failed:', error.message);
  }
};

testDoctorRegistration();
