// Test the registration API endpoint
const testRegistration = async () => {
  console.log('🧪 Testing registration API...');
    const testUser = {
    name: 'محمد تجريبي',
    email: 'test-patient@example.com',
    password: '123456',
    userType: 'patient'
    // No doctorId since we don't have doctors in the database yet
  };
  
  try {
    const response = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Registration successful!');
      console.log('User created:', result.user);
    } else {
      console.log('❌ Registration failed:', result.message);
      console.log('Details:', result.details);
    }
    
  } catch (error) {
    console.log('❌ API request failed:', error.message);
    console.log('Make sure the server is running on http://localhost:3001');
  }
};

testRegistration();
