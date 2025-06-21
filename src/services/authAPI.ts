// Database API functions that make HTTP requests to backend endpoints
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

const API_BASE_URL = '/api';

// Login function that calls backend API
export const loginUser = async (
  email: string, 
  password: string, 
  userType: 'patient' | 'doctor'
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        userType
      })    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Login API error:', error instanceof Error ? error.message : String(error));
    
    // Fallback to mock data if API is not available
    return mockLogin(email, password, userType);
  }
};

// Register function that calls backend API
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  userType: 'patient' | 'doctor',
  doctorId?: string
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        userType,
        doctorId
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    
    // Fallback to mock registration if API is not available
    return mockRegister(name, email, password, userType, doctorId);
  }
};

// Get doctors function that calls backend API
export const getDoctors = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const doctors = await response.json();
    
    // Return in the expected format with success flag
    return {
      success: true,
      doctors: doctors
    };
  } catch (error) {
    console.error('Error fetching doctors:', error);
    
    // Fallback to mock data with success format
    return {
      success: true,
      doctors: [
        { id: '6', name: 'د. خالد العمري', specialization: 'طب نفسي' },
        { id: '7', name: 'د. ليلى حسن', specialization: 'اخصائي اجتماعي'},
        { id: '8', name: 'د. سيداني منير', specialization: 'اخصائي نفساني' },
        { id: '9', name: 'د. بورزق عائشة', specialization: 'اخصائي اجتماعي' },
      ]
    };
  }
};

// Mock fallback functions (same as before but for fallback only)
const mockLogin = async (email: string, password: string, userType: 'patient' | 'doctor'): Promise<AuthResponse> => {
  const mockUsersData = [
    // المرضى
    { id: '1', name: 'أحمد محمد', email: 'ahmed@example.com', password: '123456', user_type: 'patient' as const, doctor_id: '6' },
    { id: '2', name: 'فاطمة علي', email: 'fatima@example.com', password: '123456', user_type: 'patient' as const, doctor_id: '6' },
    { id: '3', name: 'محمد سالم', email: 'mohamed@example.com', password: '123456', user_type: 'patient' as const, doctor_id: '7' },
    { id: '4', name: 'نور الهدى', email: 'nour@example.com', password: '123456', user_type: 'patient' as const, doctor_id: '8' },
    { id: '5', name: 'يوسف أحمد', email: 'youssef@example.com', password: '123456', user_type: 'patient' as const, doctor_id: '9' },
    // الأطباء
    { id: '6', name: 'د. خالد العمري', email: 'khalid@example.com', password: '123456', user_type: 'doctor' as const },
    { id: '7', name: 'د. ليلى حسن', email: 'layla@example.com', password: '123456', user_type: 'doctor' as const },
    { id: '8', name: 'د. سيداني منير', email: 'sidani@example.com', password: '123456', user_type: 'doctor' as const },
    { id: '9', name: 'د. بورزق عائشة', email: 'aicha@example.com', password: '123456', user_type: 'doctor' as const }
  ];

  const user = mockUsersData.find(u => u.email === email && u.password === password && u.user_type === userType);

  if (!user) {
    return {
      user: {} as User,
      success: false,
      message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
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
};

const mockRegister = async (name: string, email: string, password: string, userType: 'patient' | 'doctor', doctorId?: string): Promise<AuthResponse> => {
  // This is just a fallback - in reality, new registrations should go to the database
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    user_type: userType,
    avatar: userType === 'doctor' ? '/doctor-avatar.jpg' : '/patient-avatar.jpg',
    doctor_id: doctorId
  };
  return {
    user: newUser,
    success: true,
    message: 'تم إنشاء الحساب بنجاح (وضع تجريبي)'
  };
};

// Get patient's assigned doctor
export const getPatientDoctor = async (patientId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/patient/${patientId}/doctor`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching patient doctor:', error instanceof Error ? error.message : String(error));
    throw error;
  }
};
