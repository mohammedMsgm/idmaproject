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
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';

interface DoctorInfo {
  id: string;
  name: string;
  specialization: string;
  avatar: string;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const PatientDashboard = () => {
  const { user } = useAuth();
  const [doctor, setDoctor] = useState<DoctorInfo | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Mock API call to fetch patient data
    const fetchPatientData = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockDoctor: DoctorInfo = {
        id: 'doc-1',
        name: 'د. خالد العمري',
        specialization: 'طب نفسي',
        avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150',
      };
      
      const mockAppointments: Appointment[] = [
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
      
      setDoctor(mockDoctor);
      setAppointments(mockAppointments);
      setLoading(false);
    };
    
    fetchPatientData();
  }, []);
  
  const upcomingAppointments = appointments.filter(app => app.status === 'scheduled');
  const recentAppointments = appointments.filter(app => app.status === 'completed');
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">مرحبًا، {user?.name}</h1>
        <p className="text-gray-600">
          مرحبًا بك في لوحة التحكم الخاصة بك. هنا يمكنك متابعة تقدمك والاطلاع على المواعيد والتقارير.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar - Doctor Info */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-1"
        >
          <Card className="mb-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">الطبيب المعالج</h2>
              {doctor ? (
                <div>
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-medium">{doctor.name}</h3>
                  <p className="text-gray-600 mb-4">{doctor.specialization}</p>
                  <div className="flex justify-center space-x-4 space-x-reverse">
                    <button className="btn btn-outline flex items-center">
                      <MessageCircle className="ml-2 h-4 w-4" />
                      <span>مراسلة</span>
                    </button>
                    <button className="btn btn-outline flex items-center">
                      <Phone className="ml-2 h-4 w-4" />
                      <span>اتصال</span>
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">لم يتم تعيين طبيب معالج بعد.</p>
              )}
            </div>
          </Card>
          
          <Card>
            <h2 className="text-xl font-semibold mb-4">روابط سريعة</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/patient/reports"
                  className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <FileText className="ml-3 h-5 w-5 text-primary-600" />
                  <span>التقارير والوصفات</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/patient/consultations"
                  className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <MessageCircle className="ml-3 h-5 w-5 text-primary-600" />
                  <span>الاستشارات</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/patient/settings"
                  className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <User className="ml-3 h-5 w-5 text-primary-600" />
                  <span>الملف الشخصي</span>
                </Link>
              </li>
            </ul>
          </Card>
        </motion.div>
        
        {/* Main Content - Appointments and Reports */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2"
        >
          {/* Upcoming Appointments */}
          <Card className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">المواعيد القادمة</h2>
              <button className="text-primary-600 hover:underline">عرض الكل</button>
            </div>
            
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map(appointment => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Calendar className="ml-3 h-5 w-5 text-primary-600" />
                        <div>
                          <p className="font-medium">{formatDate(appointment.date)}</p>
                          <div className="flex items-center text-gray-600">
                            <Clock className="ml-1 h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <button className="btn btn-outline btn-sm">تعديل</button>
                        <button className="btn btn-primary btn-sm">تأكيد</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">لا توجد مواعيد قادمة.</p>
            )}
          </Card>
          
          {/* Recent Appointments */}
          <Card className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">المواعيد السابقة</h2>
              <button className="text-primary-600 hover:underline">عرض الكل</button>
            </div>
            
            {recentAppointments.length > 0 ? (
              <div className="space-y-4">
                {recentAppointments.map(appointment => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-md p-4"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Calendar className="ml-3 h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{formatDate(appointment.date)}</p>
                          <div className="flex items-center text-gray-600">
                            <Clock className="ml-1 h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          مكتمل
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">لا توجد مواعيد سابقة.</p>
            )}
          </Card>
          
          {/* Latest Reports */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">أحدث التقارير</h2>
              <Link to="/patient/reports" className="text-primary-600 hover:underline">
                عرض الكل
              </Link>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start">
                  <FileText className="ml-3 h-5 w-5 text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-medium">تقرير الجلسة الأسبوعية</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      بواسطة: د. خالد العمري - {formatDate('2025-05-10')}
                    </p>
                    <p className="text-gray-700">
                      ملخص الجلسة العلاجية الأسبوعية وتقييم التقدم في خطة العلاج.
                    </p>
                    <button className="mt-2 text-primary-600 hover:underline">
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start">
                  <FileText className="ml-3 h-5 w-5 text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-medium">وصفة علاجية</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      بواسطة: د. خالد العمري - {formatDate('2025-04-28')}
                    </p>
                    <p className="text-gray-700">
                      الوصفة العلاجية الشهرية مع التعليمات والإرشادات.
                    </p>
                    <button className="mt-2 text-primary-600 hover:underline">
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PatientDashboard;