// Browser-compatible authentication service using mock data
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

// Simple password check (in production, this would be handled by backend)
const checkPassword = (inputPassword: string, storedPassword: string): boolean => {
  return inputPassword === storedPassword;
};

// Login function using mock data
export const loginUser = async (
  email: string, 
  password: string, 
  userType: 'patient' | 'doctor'
): Promise<AuthResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  try {
    const user = mockUsersData.find(
      u => u.email === email && u.user_type === userType
    );

    if (!user) {
      return {
        user: {} as User,
        success: false,
        message: 'المستخدم غير موجود'
      };
    }

    // Check password
    if (!checkPassword(password, user.password)) {
      return {
        user: {} as User,
        success: false,
        message: 'كلمة المرور غير صحيحة'
      };
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        user_type: user.user_type,
        avatar: user.user_type === 'doctor' ? '/doctor-avatar.jpg' : '/patient-avatar.jpg',
        doctor_id: user.doctor_id
      },
      success: true,
      message: 'تم تسجيل الدخول بنجاح'
    };

  } catch (error) {
    console.error('Login error:', error);
    return {
      user: {} as User,
      success: false,
      message: 'حدث خطأ أثناء تسجيل الدخول'
    };
  }
};

// Register function using mock data
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  userType: 'patient' | 'doctor',
  doctorId?: string
): Promise<AuthResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  try {
    // Check if user already exists
    const existingUser = mockUsersData.find(u => u.email === email);
    if (existingUser) {
      return {
        user: {} as User,
        success: false,
        message: 'البريد الإلكتروني مستخدم بالفعل'
      };
    }    // Create new user
    const newUserId = (mockUsersData.length + 1).toString();
    const newUser: any = {
      id: newUserId,
      name,
      email,
      password,
      user_type: userType,
      doctor_id: userType === 'patient' ? doctorId : undefined
    };

    // Add to mock data (in memory only)
    mockUsersData.push(newUser);

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        user_type: newUser.user_type,
        avatar: userType === 'doctor' ? '/doctor-avatar.jpg' : '/patient-avatar.jpg',
        doctor_id: newUser.doctor_id
      },
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

// Get all doctors
export const getDoctors = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  try {
    return mockDoctorsData;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return mockDoctorsData;
  }
};
