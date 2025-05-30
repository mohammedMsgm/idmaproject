import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  MessageCircle, 
  Calendar, 
  Clock, 
  User, 
  Phone 
} from 'lucide-react';

// بيانات وهمية للطبيب
const mockDoctor = {
  id: 'doc-1',
  name: 'د. خالد العمري',
  specialization: 'طب نفسي',
  avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150',
};

// بيانات وهمية للمواعيد
const mockAppointments = [
  {
    id: 'app-1',
    date: '2025-05-15',
    time: '10:00',
    doctorName: 'د. خالد العمري',
    status: 'scheduled',
  },
  {
    id: 'app-2',
    date: '2025-05-10',
    time: '14:30',
    doctorName: 'د. خالد العمري',
    status: 'completed',
  },
  {
    id: 'app-3',
    date: '2025-04-28',
    time: '11:15',
    doctorName: 'د. خالد العمري',
    status: 'completed',
  },
];

const PatientDashboard = () => {
  // فقط اسم المستخدم من بيانات وهمية
  const user = { name: 'أحمد محمد' };

  const [doctor, setDoctor] = useState<typeof mockDoctor | null>(null);
  const [appointments, setAppointments] = useState<typeof mockAppointments>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة تأخير تحميل البيانات
    const timer = setTimeout(() => {
      setDoctor(mockDoctor);
      setAppointments(mockAppointments);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const upcomingAppointments = appointments.filter(app => app.status === 'scheduled');
  const recentAppointments = appointments.filter(app => app.status === 'completed').slice(0, 3);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>جارٍ تحميل البيانات...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        مرحباً، {user.name}
      </motion.h1>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">معلومات الطبيب المعالج</h2>
        {doctor ? (
          <div className="flex items-center space-x-4 space-x-reverse bg-white p-4 rounded shadow">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-bold">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.specialization}</p>
              <Link
                to={`/doctor/${doctor.id}`}
                className="text-primary-600 hover:underline mt-1 block"
              >
                عرض الملف الشخصي للطبيب
              </Link>
            </div>
          </div>
        ) : (
          <p>لا يوجد طبيب معالج معين.</p>
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
    </div>
  );
};

export default PatientDashboard;
