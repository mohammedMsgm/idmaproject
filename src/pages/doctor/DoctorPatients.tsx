import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  FileText, 
  MessageCircle, 
  Calendar,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  treatmentStart: string;
  lastVisit: string;
  diagnosis: string;
  status: 'active' | 'inactive';
  avatar: string;
}

const DoctorPatients = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    // Mock API call to fetch patients
    const fetchPatients = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockPatients: Patient[] = [
        {
          id: 'pat-1',
          name: 'أحمد محمد',
          age: 17,
          gender: 'male',
          treatmentStart: '2025-03-15',
          lastVisit: '2025-05-10',
          diagnosis: 'اضطراب القلق العام',
          status: 'active',
          avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
        },
        {
          id: 'pat-3',
          name: 'محمد علي',
          age: 15,
          gender: 'male',
          treatmentStart: '2025-02-20',
          lastVisit: '2025-04-25',
          diagnosis: 'إدمان الألعاب الإلكترونية',
          status: 'inactive',
          avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
        },
        {
          id: 'pat-4',
          name: 'نورا سعيد',
          age: 17,
          gender: 'female',
          treatmentStart: '2025-05-01',
          lastVisit: '2025-05-11',
          diagnosis: 'اضطراب ما بعد الصدمة',
          status: 'active',
          avatar: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
        },
        {
          id: 'pat-5',
          name: 'عمر خالد',
          age: 16,
          gender: 'male',
          treatmentStart: '2025-01-10',
          lastVisit: '2025-04-15',
          diagnosis: 'إدمان المخدرات',
          status: 'active',
          avatar: 'https://images.pexels.com/photos/2531553/pexels-photo-2531553.jpeg?auto=compress&cs=tinysrgb&w=150',
        },
        {
          id: 'pat-6',
          name: 'ريم محمود',
          age: 15,
          gender: 'female',
          treatmentStart: '2025-02-05',
          lastVisit: '2025-03-30',
          diagnosis: 'اضطراب الأكل',
          status: 'inactive',
          avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
        },
      ];
      
      setPatients(mockPatients);
      setLoading(false);
    };
    
    fetchPatients();
  }, []);
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const filteredPatients = patients.filter(patient => {
    // Filter by search term
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">المرضى</h1>
          <p className="text-gray-600">
            إدارة ومتابعة المرضى المسجلين لديك
          </p>
        </div>
        
        <Button variant="primary" icon={<UserPlus className="h-5 w-5" />}>
          إضافة مريض جديد
        </Button>
      </div>
      
      <motion.div variants={itemVariants}>
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="البحث عن مريض..."
                className="w-full pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={toggleFilters}
              className="flex items-center text-gray-600 hover:text-primary-600"
            >
              <Filter className="ml-1 h-5 w-5" />
              <span>تصفية</span>
              <ChevronDown className="mr-1 h-4 w-4" />
            </button>
          </div>
          
          {showFilters && (
            <div className="mb-4 p-4 bg-gray-50 rounded-md">
              <h3 className="text-sm font-medium mb-2">حالة المريض</h3>
              <div className="flex space-x-4 space-x-reverse">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    checked={statusFilter === 'all'}
                    onChange={() => setStatusFilter('all')}
                    className="ml-2"
                  />
                  <span>الكل</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    checked={statusFilter === 'active'}
                    onChange={() => setStatusFilter('active')}
                    className="ml-2"
                  />
                  <span>نشط</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    checked={statusFilter === 'inactive'}
                    onChange={() => setStatusFilter('inactive')}
                    className="ml-2"
                  />
                  <span>غير نشط</span>
                </label>
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    المريض
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    العمر
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    التشخيص
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    بداية العلاج
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    آخر زيارة
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    الحالة
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    إجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map(patient => (
                    <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={patient.avatar}
                              alt={patient.name}
                            />
                          </div>
                          <div className="mr-4">
                            <div className="text-sm font-medium text-gray-900">
                              <Link
                                to={`/doctor/patients/${patient.id}`}
                                className="hover:text-primary-600 transition-colors"
                              >
                                {patient.name}
                              </Link>
                            </div>
                            <div className="text-sm text-gray-500">
                              {patient.gender === 'male' ? 'ذكر' : 'أنثى'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{patient.age} سنة</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{patient.diagnosis}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(patient.treatmentStart)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(patient.lastVisit)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            patient.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {patient.status === 'active' ? 'نشط' : 'غير نشط'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2 space-x-reverse">
                          <button className="text-gray-500 hover:text-primary-600 transition-colors">
                            <FileText className="h-5 w-5" />
                          </button>
                          <button className="text-gray-500 hover:text-primary-600 transition-colors">
                            <MessageCircle className="h-5 w-5" />
                          </button>
                          <button className="text-gray-500 hover:text-primary-600 transition-colors">
                            <Calendar className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      لا توجد نتائج مطابقة للبحث
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default DoctorPatients;