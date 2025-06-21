// Update patient avatars to use the new pfp.png image
import { query } from './lib/database.js';

const updatePatientAvatars = async () => {
  try {
    console.log('🔄 Updating patient avatars...');
    
    // Update all patient users to use the new avatar
    const result = await query(
      'UPDATE users SET avatar = $1 WHERE user_type = $2',
      ['/pfp.png', 'patient']
    );
    
    console.log('✅ Updated', result.rowCount, 'patient avatars');
    
    // Show updated users
    const users = await query(
      'SELECT id, name, email, user_type, avatar FROM users WHERE user_type = $1',
      ['patient']
    );
    
    console.log('📋 Patient users with new avatars:');
    users.rows.forEach(user => {
      console.log(`- ${user.name} (${user.email}): ${user.avatar}`);
    });
    
  } catch (error) {
    console.error('❌ Error updating avatars:', error);
  }
  
  process.exit(0);
};

updatePatientAvatars();
