import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

interface LoginFormData {
  email: string;
  password: string;
  userType: 'patient' | 'doctor';
}

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      userType: 'patient',
    },
  });
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await login(data.email, data.password, data.userType);
      navigate(data.userType === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
    } catch (error) {
      setError('حدث خطأ أثناء تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك والمحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">تسجيل الدخول</h1>
        
        <Card>
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="userType" className="label">
                نوع الحساب
              </label>
              <div className="flex space-x-4 space-x-reverse mb-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="patient"
                    {...register('userType')}
                    className="ml-2"
                  />
                  <span>مريض</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="doctor"
                    {...register('userType')}
                    className="ml-2"
                  />
                  <span>طبيب</span>
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="label">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'البريد الإلكتروني مطلوب',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'يرجى إدخال عنوان بريد إلكتروني صالح',
                  },
                })}
                className="input"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="label">
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                {...register('password', {
                  required: 'كلمة المرور مطلوبة',
                  minLength: {
                    value: 6,
                    message: 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل',
                  },
                })}
                className="input"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
            >
              تسجيل الدخول
            </Button>
            
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                ليس لديك حساب؟{' '}
                <Link to="/register" className="text-primary-600 hover:underline">
                  إنشاء حساب جديد
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;