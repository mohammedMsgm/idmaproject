// Update doctor avatars to use the new pfpdoc.png image
import { query } from './lib/database.js';

const updateDoctorAvatars = async () => {
  try {
    console.log('🔄 Updating doctor avatars...');
    
    // Update all doctor users to use the new avatar
    const result = await query(
      'UPDATE users SET avatar = $1 WHERE user_type = $2',
      ['/pfpdoc.png', 'doctor']
    );
    
    console.log('✅ Updated', result.rowCount, 'doctor avatars');
    
    // Show updated users
    const users = await query(
      'SELECT id, name, email, user_type, avatar FROM users WHERE user_type = $1',
      ['doctor']
    );
    
    console.log('📋 Doctor users with new avatars:');
    users.rows.forEach(user => {
      console.log(`- ${user.name} (${user.email}): ${user.avatar}`);
    });
    
  } catch (error) {
    console.error('❌ Error updating doctor avatars:', error);
  }
  
  process.exit(0);
};

updateDoctorAvatars();
