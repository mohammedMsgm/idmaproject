import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { getDoctors } from '../../services/authAPI';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

interface RegisterFormData {
  name: string;
  email: string;
  password: string; 
  confirmPassword: string;
  userType: 'patient' | 'doctor';  doctorId?: string;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
}

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      userType: 'patient',
    },
  });
  const userType = watch('userType');
  const password = watch('password');  // Fetch doctors when component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true);
        const response = await getDoctors();
        if (response.success && response.doctors) {
          setDoctors(response.doctors);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    if (data.userType === 'patient' && !data.doctorId) {
      setError('يرجى اختيار الطبيب المعالج');
      setIsLoading(false);
      return;
    }

    try {
      await registerUser(
        data.name,
        data.email,
        data.password,
        data.userType,
        data.userType === 'patient' ? data.doctorId : undefined
      );

      navigate(data.userType === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
    } catch (error) {
      setError('حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.');
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
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">إنشاء حساب جديد</h1>

        <Card>
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* نوع الحساب */}
            <div className="mb-4">
              <label htmlFor="userType" className="label">نوع الحساب</label>
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

            {/* اختيار الطبيب إذا كان مريض */}
            {userType === 'patient' && (
              <div className="mb-4">
                <label htmlFor="doctorId" className="label">اختر الطبيب المعالج</label>                <select
                  id="doctorId"
                  {...register('doctorId')}
                  className="input"
                  disabled={loadingDoctors}
                >
                  <option value="">-- اختر الطبيب --</option>
                  {loadingDoctors ? (
                    <option disabled>جارٍ تحميل الأطباء...</option>
                  ) : (
                    doctors.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                      </option>
                    ))
                  )}
                </select>
              </div>
            )}

            {/* الاسم */}
            <div className="mb-4">
              <label htmlFor="name" className="label">الاسم الكامل</label>
              <input
                id="name"
                type="text"
                {...register('name', {
                  required: 'الاسم مطلوب',
                  minLength: {
                    value: 3,
                    message: 'يجب أن يتكون الاسم من 3 أحرف على الأقل',
                  },
                })}
                className="input"
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* البريد الإلكتروني */}
            <div className="mb-4">
              <label htmlFor="email" className="label">البريد الإلكتروني</label>
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
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* كلمة المرور */}
            <div className="mb-4">
              <label htmlFor="password" className="label">كلمة المرور</label>
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

            {/* تأكيد كلمة المرور */}
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="label">تأكيد كلمة المرور</label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', {
                  required: 'تأكيد كلمة المرور مطلوب',
                  validate: value =>
                    value === password || 'كلمات المرور غير متطابقة',
                })}
                className="input"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
            >
              إنشاء حساب
            </Button>

            <div className="mt-4 text-center">
              <p className="text-gray-600">
                لديك حساب بالفعل؟{' '}
                <Link to="/login" className="text-primary-600 hover:underline">
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
