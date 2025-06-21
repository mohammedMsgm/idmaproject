// Test the login API endpoint with correct database user
const testLogin = async () => {
  console.log('🧪 Testing login API with database user...');
  
  // Test with actual user from the database
  const testUser = {
    email: 'momo@gmail.com',
    password: 'aaaaaaaa',
    userType: 'patient',
    expectedName: 'momo'
  };
  
  console.log(`\n🔐 Testing login for: ${testUser.email} (${testUser.userType})`);
  
  try {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password,
        userType: testUser.userType
      })
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Login successful!');
      console.log('User data returned:', {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        type: result.user.user_type
      });
      
      if (result.user.name !== testUser.expectedName) {
        console.log(`⚠️  Expected name: ${testUser.expectedName}, got: ${result.user.name}`);
      }
      
      // Check if token is returned
      if (result.token) {
        console.log('✅ JWT token returned');
      } else {
        console.log('⚠️  No JWT token in response');
      }
    } else {
      console.log('❌ Login failed:', result.message);
      console.log('Details:', result.details);
    }
    
  } catch (error) {
    console.log('❌ API request failed:', error.message);
    console.log('Make sure the server is running on http://localhost:3001');
  }
  
  // Test with invalid credentials
  console.log('\n🚫 Testing with invalid credentials...');
  try {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'nonexistent@example.com',
        password: 'wrongpassword',
        userType: 'patient'
      })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      console.log('✅ Invalid credentials correctly rejected:', result.message);
    } else {
      console.log('❌ Invalid credentials were accepted - this is a security issue!');
    }
    
  } catch (error) {
    console.log('❌ API request failed:', error.message);
  }
};

testLogin();
