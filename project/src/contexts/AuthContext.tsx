import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type UserType = 'patient' | 'doctor' | null;

interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userType: UserType;
  login: (email: string, password: string, type: UserType) => Promise<void>;
  register: (name: string, email: string, password: string, type: UserType) => Promise<void>;
  logout: () => void;
}

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

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string, type: UserType) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data - in a real app, this would come from the API
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
    
    // Redirect based on user type
    navigate(type === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
  };
  
  // Mock register function - in a real app, this would call an API
  const register = async (name: string, email: string, password: string, type: UserType) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      type,
      avatar: type === 'doctor' ? '/doctor-avatar.jpg' : '/patient-avatar.jpg',
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    // Redirect based on user type
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