import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, getDoctors } from '../services/authAPI';

type UserType = 'patient' | 'doctor' | null;

interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  avatar?: string;
  doctorId?: string; // مضاف لحفظ هوية الطبيب المرتبط بالمريض
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userType: UserType;
  login: (email: string, password: string, type: UserType) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    type: UserType,
    doctorId?: string
  ) => Promise<void>;
  logout: () => void;
}

// استرجاع قائمة الأطباء من قاعدة البيانات
export const fetchDoctors = async () => {
  try {
    return await getDoctors();
  } catch (error) {
    console.error('Error fetching doctors:', error);
    // Fallback to static data if database is not available
    return [
      { id: '1', name: 'د. خالد العمري', specialization: 'طب نفسي' },
      { id: '2', name: 'د. ليلى حسن', specialization: 'اخصائي اجتماعي'},
      { id: '3', name: 'د. سيداني منير', specialization: 'اخصائي نفساني' },
      { id: '4', name: 'د. بورزق عائشة', specialization: 'اخصائي اجتماعي' },
    ];
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // تحميل المستخدم من localStorage إذا كان موجودًا
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  // تسجيل الدخول
  const login = async (email: string, password: string, type: UserType) => {
    if (!type) {
      throw new Error('نوع المستخدم مطلوب');
    }

    const authResponse = await loginUser(email, password, type);
    
    if (!authResponse.success) {
      throw new Error(authResponse.message || 'فشل في تسجيل الدخول');
    }

    const user: User = {
      id: authResponse.user.id,
      name: authResponse.user.name,
      email: authResponse.user.email,
      type: authResponse.user.user_type,
      avatar: authResponse.user.avatar,
      doctorId: authResponse.user.doctor_id,
    };

    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(user));
    navigate(type === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
  };
  // تسجيل مستخدم جديد
  const register = async (
    name: string,
    email: string,
    password: string,
    type: UserType,
    doctorId?: string
  ) => {
    if (!type) {
      throw new Error('نوع المستخدم مطلوب');
    }

    const authResponse = await registerUser(name, email, password, type, doctorId);
    
    if (!authResponse.success) {
      throw new Error(authResponse.message || 'فشل في إنشاء الحساب');
    }

    const user: User = {
      id: authResponse.user.id,
      name: authResponse.user.name,
      email: authResponse.user.email,
      type: authResponse.user.user_type,
      avatar: authResponse.user.avatar,
      doctorId: authResponse.user.doctor_id,
    };

    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(user));
    navigate(type === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        userType: user?.type || null,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
