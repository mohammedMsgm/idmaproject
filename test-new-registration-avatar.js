// Test registration with new avatar
const testNewRegistration = async () => {
  console.log('🧪 Testing new user registration with automatic avatar...');
  
  const newUser = {
    name: 'اختبار جديد',
    email: 'test-new-avatar@example.com',
    password: '123456',
    userType: 'patient'
  };
  
  try {
    const response = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Registration successful!');
      console.log('👤 New user:', result.user);
      console.log('🖼️ Avatar:', result.user.avatar);
      
      // Verify the avatar is /pfp.png
      if (result.user.avatar === '/pfp.png') {
        console.log('✅ Avatar correctly set to /pfp.png');
      } else {
        console.log('❌ Avatar not set correctly, got:', result.user.avatar);
      }
    } else {
      console.log('❌ Registration failed:', result.message);
    }
    
  } catch (error) {
    console.error('❌ API request failed:', error.message);
  }
};

testNewRegistration();
