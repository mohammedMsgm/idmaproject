import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Users, 
  Calendar, 
  Clock, 
  Activity, 
  MessageCircle 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';

interface PatientSummary {
  id: string;
  name: string;
  age: number;
  treatmentStart: string;
  avatar: string;
  status: 'active' | 'inactive';
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  patientName: string;
  patientId: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface Statistics {
  totalPatients: number;
  activePatients: number;
  pendingReports: number;
  upcomingAppointments: number;
}

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Mock API call to fetch doctor dashboard data
    const fetchDoctorData = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockPatients: PatientSummary[] = [
        {
          id: 'pat-1',
          name: 'أحمد محمد',
          age: 17,
          treatmentStart: '2025-03-15',
          avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
          status: 'active',
        },
        {
          id: 'pat-2',
          name: 'سارة أحمد',
          age: 16,
          treatmentStart: '2025-04-02',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
          status: 'active',
        },
        {
          id: 'pat-3',
          name: 'محمد علي',
          age: 15,
          treatmentStart: '2025-02-20',
          avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
          status: 'inactive',
        },
        {
          id: 'pat-4',
          name: 'نورا سعيد',
          age: 17,
          treatmentStart: '2025-05-01',
          avatar: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
          status: 'active',
        },
      ];
      
      const mockAppointments: Appointment[] = [
        {
          id: 'app-1',
          date: '2025-05-15',
          time: '10:00',
          patientName: 'أحمد محمد',
          patientId: 'pat-1',
          status: 'scheduled',
        },
        {
          id: 'app-2',
          date: '2025-05-15',
          time: '14:30',
          patientName: 'سارة أحمد',
          patientId: 'pat-2',
          status: 'scheduled',
        },
        {
          id: 'app-3',
          date: '2025-05-14',
          time: '11:15',
          patientName: 'نورا سعيد',
          patientId: 'pat-4',
          status: 'completed',
        },
        {
          id: 'app-4',
          date: '2025-05-13',
          time: '09:30',
          patientName: 'محمد علي',
          patientId: 'pat-3',
          status: 'completed',
        },
      ];
      
      const mockStatistics: Statistics = {
        totalPatients: mockPatients.length,
        activePatients: mockPatients.filter(p => p.status === 'active').length,
        pendingReports: 2,
        upcomingAppointments: mockAppointments.filter(a => a.status === 'scheduled').length,
      };
      
      setPatients(mockPatients);
      setAppointments(mockAppointments);
      setStatistics(mockStatistics);
      setLoading(false);
    };
    
    fetchDoctorData();
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
          مرحبًا بك في لوحة التحكم الخاصة بك. هنا يمكنك إدارة المرضى والمواعيد والتقارير.
        </p>
      </div>
      
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statistics && (
          <>
            <motion.div variants={itemVariants}>
              <Card className="border-r-4 border-primary-500">
                <div className="flex items-center">
                  <div className="p-3 bg-primary-100 rounded-lg ml-4">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">إجمالي المرضى</p>
                    <h3 className="text-2xl font-bold">{statistics.totalPatients}</h3>
                  </div>
                </div>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="border-r-4 border-green-500">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg ml-4">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">المرضى النشطون</p>
                    <h3 className="text-2xl font-bold">{statistics.activePatients}</h3>
                  </div>
                </div>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="border-r-4 border-amber-500">
                <div className="flex items-center">
                  <div className="p-3 bg-amber-100 rounded-lg ml-4">
                    <FileText className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">تقارير معلقة</p>
                    <h3 className="text-2xl font-bold">{statistics.pendingReports}</h3>
                  </div>
                </div>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="border-r-4 border-blue-500">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg ml-4">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">المواعيد القادمة</p>
                    <h3 className="text-2xl font-bold">{statistics.upcomingAppointments}</h3>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2"
        >
          <Card className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">المواعيد القادمة</h2>
              <Link to="/doctor/appointments" className="text-primary-600 hover:underline">
                عرض الكل
              </Link>
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
                      <div>
                        <Link
                          to={`/doctor/patients/${appointment.patientId}`}
                          className="font-medium text-gray-800 hover:text-primary-600 transition-colors"
                        >
                          {appointment.patientName}
                        </Link>
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <button className="btn btn-outline btn-sm">تأجيل</button>
                        <button className="btn btn-primary btn-sm">تقرير</button>
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
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">المواعيد السابقة</h2>
              <Link to="/doctor/appointments" className="text-primary-600 hover:underline">
                عرض الكل
              </Link>
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
                        <Link
                          to={`/doctor/patients/${appointment.patientId}`}
                          className="font-medium text-gray-800 hover:text-primary-600 transition-colors"
                        >
                          {appointment.patientName}
                        </Link>
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
        </motion.div>
        
        {/* Patients List */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">المرضى النشطون</h2>
              <Link to="/doctor/patients" className="text-primary-600 hover:underline">
                عرض الكل
              </Link>
            </div>
            
            {patients.filter(p => p.status === 'active').length > 0 ? (
              <div className="space-y-4">
                {patients
                  .filter(p => p.status === 'active')
                  .map(patient => (
                    <div
                      key={patient.id}
                      className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={patient.avatar}
                        alt={patient.name}
                        className="w-10 h-10 rounded-full object-cover ml-3"
                      />
                      <div className="flex-1">
                        <Link
                          to={`/doctor/patients/${patient.id}`}
                          className="font-medium text-gray-800 hover:text-primary-600 transition-colors"
                        >
                          {patient.name}
                        </Link>
                        <p className="text-sm text-gray-500">
                          {patient.age} سنة - منذ {formatDate(patient.treatmentStart)}
                        </p>
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors">
                          <MessageCircle className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors">
                          <FileText className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-600">لا يوجد مرضى نشطون حاليًا.</p>
            )}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DoctorDashboard;