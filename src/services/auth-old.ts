// Note: This is a frontend-compatible version that uses mock data
// For full database integration, we would need to create API endpoints
import { mockUsersData, mockDoctorsData } from '../data/mockData';

export interface User {
  id: string;
  name: string;
  email: string;
  user_type: 'patient' | 'doctor';
  avatar?: string;
  doctor_id?: string;
}

export interface AuthResponse {
  user: User;
  success: boolean;
  message?: string;
}

// Simple password comparison for mock data
const comparePasswords = (inputPassword: string, storedPassword: string): boolean => {
  return inputPassword === storedPassword;
};

export interface User {
  id: string;
  name: string;
  email: string;
  user_type: 'patient' | 'doctor';
  avatar?: string;
  doctor_id?: string;
}

export interface AuthResponse {
  user: User;
  success: boolean;
  message?: string;
}

// Login function
export const loginUser = async (
  email: string, 
  password: string, 
  userType: 'patient' | 'doctor'
): Promise<AuthResponse> => {
  try {
    // Check if database is available
    const dbAvailable = await isDatabaseAvailable();
    
    if (!dbAvailable) {
      // Use mock data fallback
      return await mockLogin(email, password, userType);
    }

    // Get user from database
    const result = await query(
      'SELECT * FROM users WHERE email = $1 AND user_type = $2',
      [email, userType]
    );

    if (result.rows.length === 0) {
      return {
        user: {} as User,
        success: false,
        message: 'المستخدم غير موجود'
      };
    }

    const dbUser = result.rows[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, dbUser.password);
    
    if (!isPasswordValid) {
      return {
        user: {} as User,
        success: false,
        message: 'كلمة المرور غير صحيحة'
      };
    }

    // Return user data (without password)
    const user: User = {
      id: dbUser.id.toString(),
      name: dbUser.name,
      email: dbUser.email,
      user_type: dbUser.user_type,
      avatar: dbUser.avatar,
      doctor_id: dbUser.doctor_id?.toString()
    };

    return {
      user,
      success: true,
      message: 'تم تسجيل الدخول بنجاح'
    };

  } catch (error) {
    console.error('Login error:', error);
    // Fallback to mock login if database fails
    return await mockLogin(email, password, userType);
  }
};

// Register function
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  userType: 'patient' | 'doctor',
  doctorId?: string
): Promise<AuthResponse> => {
  try {
    // Check if user already exists
    const existingUser = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return {
        user: {} as User,
        success: false,
        message: 'البريد الإلكتروني مستخدم بالفعل'
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await query(
      'INSERT INTO users (name, email, password, user_type, avatar, doctor_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        name, 
        email, 
        hashedPassword, 
        userType, 
        userType === 'doctor' ? '/doctor-avatar.jpg' : '/patient-avatar.jpg',
        doctorId ? parseInt(doctorId) : null
      ]
    );

    const newUser = result.rows[0];

    const user: User = {
      id: newUser.id.toString(),
      name: newUser.name,
      email: newUser.email,
      user_type: newUser.user_type,
      avatar: newUser.avatar,
      doctor_id: newUser.doctor_id?.toString()
    };

    return {
      user,
      success: true,
      message: 'تم إنشاء الحساب بنجاح'
    };

  } catch (error) {
    console.error('Registration error:', error);
    return {
      user: {} as User,
      success: false,
      message: 'حدث خطأ أثناء إنشاء الحساب'
    };
  }
};

// Get all doctors (for patient registration)
export const getDoctors = async () => {
  try {
    const dbAvailable = await isDatabaseAvailable();
    
    if (!dbAvailable) {
      // Use mock data fallback
      return mockDoctorsData;
    }

    const result = await query(
      `SELECT u.id, u.name, dp.specialization 
       FROM users u 
       JOIN doctor_profiles dp ON u.id = dp.user_id 
       WHERE u.user_type = 'doctor'`
    );

    return result.rows.map(row => ({
      id: row.id.toString(),
      name: row.name,
      specialization: row.specialization
    }));
  } catch (error) {
    console.error('Error fetching doctors:', error);
    // Return mock data as fallback
    return mockDoctorsData;
  }
};
