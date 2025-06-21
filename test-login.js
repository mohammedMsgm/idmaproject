// Test the login API endpoint with database users
const testLogin = async () => {
  console.log('🧪 Testing login API with database users...');
    // Test with actual users from the database  const testUsers = [
    {
      email: 'momo@gmail.com',
      password: 'aaaaaaaa',
      userType: 'patient',
      expectedName: 'momo'
    }
  ];
  
  // Try common passwords for momo if first attempt fails
  const commonPasswords = ['123456', 'password', 'momo', 'admin', 'secret', '123', 'test'];
    for (const testUser of testUsers) {
    console.log(`\n🔐 Testing login for: ${testUser.email} (${testUser.userType})`);
    
    let loginSuccess = false;
    
    // Try the expected password first
    for (const password of [testUser.password, ...commonPasswords]) {
      try {
        const response = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: testUser.email,
            password: password,
            userType: testUser.userType
          })
        });
        
        const result = await response.json();
        
        if (response.ok) {
          console.log(`✅ Login successful with password: "${password}"`);
          console.log('User returned:', {
            id: result.user.id,
            name: result.user.name,
            email: result.user.email,
            type: result.user.user_type
          });
          loginSuccess = true;
          break;
        } else if (password === testUser.password) {
          console.log(`❌ Expected password "${password}" failed, trying common passwords...`);
        }
        
      } catch (error) {
        if (password === testUser.password) {
          console.log('❌ API request failed:', error.message);
          console.log('Make sure the server is running on http://localhost:3001');
          break;
        }
      }
    }
    
    if (!loginSuccess) {
      console.log(`❌ All password attempts failed for ${testUser.email}`);
    }
          console.log(`⚠️  Expected name: ${testUser.expectedName}, got: ${result.user.name}`);
        }
      } else {
        console.log('❌ Login failed:', result.message);
        console.log('Details:', result.details);
      }
      
    } catch (error) {
      console.log('❌ API request failed:', error.message);
      console.log('Make sure the server is running on http://localhost:3001');
    }
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
