import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { getPatientDoctor } from '../../services/authAPI';
import { 
  Calendar, 
  Clock,
  CreditCard,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  avatar?: string;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  status: 'scheduled' | 'completed';
}

const PatientDashboard = () => {
  const { user } = useAuth();

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchPatientData = async () => {
      if (!user?.id) {
        console.log('No user or user ID found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log('Fetching patient data for user:', user.id);
        
        // Fetch patient's assigned doctor
        const doctorResponse = await getPatientDoctor(user.id);
        
        console.log('Doctor response:', doctorResponse);
        
        if (doctorResponse.success && doctorResponse.doctor) {
          setDoctor(doctorResponse.doctor);
          
          // Generate mock appointments with the patient's assigned doctor
          const mockUpcomingAppointments: Appointment[] = [
            {
              id: '1',
              date: '2025-06-25',
              time: '10:00 ص',
              doctorName: doctorResponse.doctor.name,
              status: 'scheduled'
            },
            {
              id: '2',
              date: '2025-07-02',
              time: '2:00 م',
              doctorName: doctorResponse.doctor.name,
              status: 'scheduled'
            }
          ];

          const mockRecentAppointments: Appointment[] = [
            {
              id: '3',
              date: '2025-06-15',
              time: '11:00 ص',
              doctorName: doctorResponse.doctor.name,
              status: 'completed'
            },
            {
              id: '4',
              date: '2025-06-08',
              time: '3:00 م',
              doctorName: doctorResponse.doctor.name,
              status: 'completed'
            },
            {
              id: '5',
              date: '2025-06-01',
              time: '9:30 ص',
              doctorName: doctorResponse.doctor.name,
              status: 'completed'
            }
          ];

          setAppointments([...mockUpcomingAppointments, ...mockRecentAppointments]);
        } else {
          console.log('No doctor found or failed to fetch doctor');
          setDoctor(null);
          setAppointments([]);
        }
        
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setError('حدث خطأ أثناء تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>جارٍ تحميل البيانات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600">{error}</p>
      </div>
    );  }
  // Separate upcoming and recent appointments
  const upcomingAppointments = appointments.filter(app => app.status === 'scheduled');
  const recentAppointments = appointments.filter(app => app.status === 'completed');

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        مرحباً، {user?.name || 'ضيف'}
      </motion.h1>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">معلومات الطبيب المعالج</h2>        {doctor ? (
          <div className="flex items-center space-x-4 space-x-reverse bg-white p-4 rounded shadow">
            <img
              src={doctor.avatar || '/pfpdoc.png'}
              alt={doctor.name}
              className="w-20 h-20 rounded-full object-cover"
            />            <div>
              <h3 className="text-lg font-bold">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.specialization}</p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 p-4 rounded shadow">
            <p className="text-gray-600">لم يتم تعيين طبيب معالج بعد.</p>
          </div>
        )}
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">المواعيد القادمة</h2>
        {upcomingAppointments.length > 0 ? (
          <ul className="space-y-3">
            {upcomingAppointments.map((app) => (
              <li key={app.id} className="border p-4 rounded-md bg-white shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Calendar className="text-primary-600" />
                    <span>{app.date}</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Clock className="text-primary-600" />
                    <span>{app.time}</span>
                  </div>
                </div>
                <p className="mt-2">
                  مع الطبيب: <strong>{app.doctorName}</strong>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>لا توجد مواعيد قادمة.</p>
        )}
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-4">المواعيد الأخيرة</h2>
        {recentAppointments.length > 0 ? (
          <ul className="space-y-3">
            {recentAppointments.map((app) => (
              <li key={app.id} className="border p-4 rounded-md bg-white shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Calendar className="text-gray-500" />
                    <span>{app.date}</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Clock className="text-gray-500" />
                    <span>{app.time}</span>
                  </div>
                </div>
                <p className="mt-2">
                  مع الطبيب: <strong>{app.doctorName}</strong>
                </p>
                <span className="text-green-600 font-semibold">تمت</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>لا توجد مواعيد سابقة.</p>
        )}
      </motion.section>

      {/* Quick Actions */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">الإجراءات السريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/patient/payment"
            className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg shadow-md transition-colors duration-200 text-center group"
          >
            <CreditCard className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-2">دفع ثمن الخدمات</h3>
            <p className="text-sm opacity-90">ادفع مقابل الخدمات الطبية</p>
          </Link>
          
          <Link 
            to="/patient/consultations"
            className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg shadow-md transition-colors duration-200 text-center group"
          >
            <Calendar className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-2">المواعيد</h3>
            <p className="text-sm opacity-90">عرض وإدارة المواعيد</p>
          </Link>
          
          <Link 
            to="/patient/reports"
            className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg shadow-md transition-colors duration-200 text-center group"
          >
            <FileText className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-2">التقارير الطبية</h3>
            <p className="text-sm opacity-90">عرض التقارير والنتائج</p>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default PatientDashboard;
