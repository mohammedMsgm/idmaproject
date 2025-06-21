// Test login for the newly registered user
const testLogin = async () => {
  console.log('🧪 Testing login for newly registered user...');
    const loginData = {
    email: 'test-patient@example.com',
    password: '123456',
    userType: 'patient'
  };
  
  try {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Login successful!');
      console.log('User data:', result.user);
      console.log('JWT token:', result.token ? 'Present' : 'Missing');
    } else {
      console.log('❌ Login failed:', result.message);
      console.log('Details:', result.details);
    }
    
  } catch (error) {
    console.error('❌ API request failed:', error.message);
  }
};

testLogin();
