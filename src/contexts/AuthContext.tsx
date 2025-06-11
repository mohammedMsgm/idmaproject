import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

export const mockDoctors = [
  { id: 'doc-1', name: 'د. خالد العمري', specialization: 'طب نفسي' },
  { id: 'doc-2', name: 'د. ليلى حسن', specialization: 'اخصائي اجتماعي'},
  { id: 'doc-2', name: 'د. سيداني منير', specialization: 'اخصائي نفساني' },
  { id: 'doc-2', name: 'د. بورزق عائشة', specialization: 'اخصائي اجتماعي' },
];


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

  // تسجيل الدخول (وهمي)
  const login = async (email: string, password: string, type: UserType) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: `user-${Date.now()}`,
      name: type === 'patient' ? 'أحمد محمد' : 'د. سارة الأحمد',
      email,
      type,
      avatar: type === 'doctor' ? '/doctor-avatar.jpg' : '/patient-avatar.jpg',
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
    navigate(type === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
  };

  // تسجيل مستخدم جديد (وهمي) مع doctorId إن وجد
  const register = async (
    name: string,
    email: string,
    password: string,
    type: UserType,
    doctorId?: string
  ) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      type,
      avatar: type === 'doctor' ? '/doctor-avatar.jpg' : '/patient-avatar.jpg',
      doctorId: type === 'patient' ? doctorId : undefined,
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
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
