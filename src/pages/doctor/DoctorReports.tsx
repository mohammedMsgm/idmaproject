import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Filter, 
  ChevronDown, 
  User, 
  Plus, 
  Edit, 
  Trash 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

interface Patient {
  id: string;
  name: string;
  avatar: string;
}

interface Report {
  id: string;
  title: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  date: string;
  content: string;
  type: 'report' | 'prescription';
}

const DoctorReports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [typeFilter, setTypeFilter] = useState<'all' | 'report' | 'prescription'>('all');
  const [patientFilter, setPatientFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  
  useEffect(() => {
    // Mock API call to fetch reports and patients
    const fetchData = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock patients data
      const mockPatients: Patient[] = [
        {
          id: 'pat-1',
          name: 'أحمد محمد',
          avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
        },
        {
          id: 'pat-2',
          name: 'سارة أحمد',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        },
        {
          id: 'pat-3',
          name: 'محمد علي',
          avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
        },
        {
          id: 'pat-4',
          name: 'نورا سعيد',
          avatar: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
        },
      ];
      
      // Mock reports data
      const mockReports: Report[] = [
        {
          id: 'rep-1',
          title: 'تقرير الجلسة العلاجية الأسبوعية',
          patientId: 'pat-1',
          patientName: 'أحمد محمد',
          patientAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
          date: '2025-05-10',
          type: 'report',
          content: 'خلال الجلسة العلاجية الأسبوعية، لاحظنا تحسنًا في المزاج العام للمريض وانخفاضًا في مستويات القلق. استمر المريض في الالتزام بخطة العلاج وأظهر تقدمًا جيدًا في التعامل مع التحديات اليومية. ننصح بالاستمرار في ممارسة تمارين الاسترخاء والتأمل اليومية، وكذلك الالتزام بمواعيد الجلسات العلاجية الأسبوعية.',
        },
        {
          id: 'rep-2',
          title: 'وصفة علاجية شهرية',
          patientId: 'pat-1',
          patientName: 'أحمد محمد',
          patientAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
          date: '2025-05-05',
          type: 'prescription',
          content: 'الدواء الأول: [اسم الدواء] - 10 ملغ - مرة واحدة صباحًا\nالدواء الثاني: [اسم الدواء] - 5 ملغ - مرتين يوميًا بعد الوجبات\n\nملاحظات: يرجى الالتزام بالجرعات المحددة والمواعيد. يجب متابعة أي آثار جانبية وإبلاغ الطبيب فورًا في حالة ظهور أي أعراض غير طبيعية.',
        },
        {
          id: 'rep-3',
          title: 'تقييم التقدم في خطة العلاج',
          patientId: 'pat-2',
          patientName: 'سارة أحمد',
          patientAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
          date: '2025-04-28',
          type: 'report',
          content: 'بعد مرور شهر على بدء خطة العلاج، نلاحظ تحسنًا ملحوظًا في الحالة العامة للمريضة. انخفضت مستويات القلق والتوتر بنسبة 30%، وتحسنت أنماط النوم بشكل ملحوظ. تستمر المريضة في الالتزام بجلسات العلاج النفسي وتمارين الاسترخاء اليومية. ننصح بالاستمرار في اتباع الخطة العلاجية الحالية مع تعديلات طفيفة في الجرعات الدوائية كما هو موضح في الوصفة الطبية المرفقة.',
        },
        {
          id: 'rep-4',
          title: 'وصفة علاجية',
          patientId: 'pat-3',
          patientName: 'محمد علي',
          patientAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
          date: '2025-04-15',
          type: 'prescription',
          content: 'الدواء الأول: [اسم الدواء] - 15 ملغ - مرة واحدة صباحًا\nالدواء الثاني: [اسم الدواء] - 7.5 ملغ - مرتين يوميًا بعد الوجبات\n\nملاحظات: يرجى الالتزام بالجرعات المحددة والمواعيد. يجب متابعة أي آثار جانبية وإبلاغ الطبيب فورًا في حالة ظهور أي أعراض غير طبيعية.',
        },
        {
          id: 'rep-5',
          title: 'التقرير الأولي بعد التقييم',
          patientId: 'pat-4',
          patientName: 'نورا سعيد',
          patientAvatar: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
          date: '2025-04-02',
          type: 'report',
          content: 'بعد إجراء التقييم الأولي، تم تشخيص المريضة بـ [التشخيص]. تم وضع خطة علاجية تتضمن جلسات العلاج النفسي الأسبوعية، وتمارين الاسترخاء اليومية، بالإضافة إلى العلاج الدوائي. الهدف الرئيسي من الخطة العلاجية هو تحسين نوعية الحياة وتقليل أعراض القلق والتوتر. سيتم إجراء تقييم دوري كل شهر لمتابعة التقدم في الخطة العلاجية وإجراء التعديلات اللازمة.',
        },
      ];
      
      setPatients(mockPatients);
      setReports(mockReports);
      setLoading(false);
    };
    
    fetchData();
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
  
  const handleReportClick = (report: Report) => {
    setSelectedReport(report);
    setIsEditing(false);
    setEditTitle(report.title);
    setEditContent(report.content);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleEditClick = () => {
    if (!selectedReport) return;
    setIsEditing(true);
    setEditTitle(selectedReport.title);
    setEditContent(selectedReport.content);
  };
  
  const handleSaveEdit = () => {
    if (!selectedReport) return;
    
    const updatedReport = {
      ...selectedReport,
      title: editTitle,
      content: editContent,
    };
    
    // Update the reports array
    const updatedReports = reports.map(report =>
      report.id === selectedReport.id ? updatedReport : report
    );
    
    setReports(updatedReports);
    setSelectedReport(updatedReport);
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  
  const filteredReports = reports.filter(report => {
    // Filter by search term
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by type
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    
    // Filter by patient
    const matchesPatient = patientFilter === 'all' || report.patientId === patientFilter;
    
    return matchesSearch && matchesType && matchesPatient;
  });
  
  const sortedReports = [...filteredReports].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">التقارير والوصفات</h1>
          <p className="text-gray-600">
            إدارة وإنشاء التقارير والوصفات الطبية للمرضى
          </p>
        </div>
        
        <Button variant="primary" icon={<Plus className="h-5 w-5" />}>
          إنشاء تقرير جديد
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-1"
        >
          <Card>
            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="البحث في التقارير..."
                  className="w-full pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">قائمة التقارير</h2>
              <button
                onClick={toggleFilters}
                className="flex items-center text-gray-600 hover:text-primary-600"
              >
                <Filter className="ml-1 h-4 w-4" />
                <span>تصفية</span>
                <ChevronDown className="mr-1 h-4 w-4" />
              </button>
            </div>
            
            {showFilters && (
              <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <div className="mb-3">
                  <h3 className="text-sm font-medium mb-2">نوع التقرير</h3>
                  <div className="flex space-x-4 space-x-reverse">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="reportType"
                        checked={typeFilter === 'all'}
                        onChange={() => setTypeFilter('all')}
                        className="ml-2"
                      />
                      <span>الكل</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="reportType"
                        checked={typeFilter === 'report'}
                        onChange={() => setTypeFilter('report')}
                        className="ml-2"
                      />
                      <span>تقارير</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="reportType"
                        checked={typeFilter === 'prescription'}
                        onChange={() => setTypeFilter('prescription')}
                        className="ml-2"
                      />
                      <span>وصفات</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">المريض</h3>
                  <select
                    value={patientFilter}
                    onChange={e => setPatientFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                  >
                    <option value="all">جميع المرضى</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            
            {sortedReports.length > 0 ? (
              <div className="space-y-2 overflow-y-auto max-h-[600px]">
                {sortedReports.map(report => (
                  <div
                    key={report.id}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      selectedReport?.id === report.id
                        ? 'bg-primary-50 border border-primary-200'
                        : 'hover:bg-gray-50 border border-gray-200'
                    }`}
                    onClick={() => handleReportClick(report)}
                  >
                    <div className="flex items-start">
                      <FileText
                        className={`ml-3 h-5 w-5 mt-1 ${
                          report.type === 'prescription'
                            ? 'text-secondary-600'
                            : 'text-primary-600'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{report.title}</h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <User className="ml-1 h-4 w-4" />
                          <span className="truncate">{report.patientName}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-gray-500 text-xs">
                            {formatDate(report.date)}
                          </span>
                          <span
                            className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                              report.type === 'prescription'
                                ? 'bg-secondary-100 text-secondary-800'
                                : 'bg-primary-100 text-primary-800'
                            }`}
                          >
                            {report.type === 'prescription' ? 'وصفة طبية' : 'تقرير'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">لا توجد تقارير متاحة.</p>
            )}
          </Card>
        </motion.div>
        
        {/* Report Details */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2"
        >
          <Card>
            {selectedReport ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  {!isEditing ? (
                    <h2 className="text-xl font-semibold">{selectedReport.title}</h2>
                  ) : (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent text-xl font-semibold"
                    />
                  )}
                  
                  <div className="flex space-x-2 space-x-reverse">
                    {!isEditing ? (
                      <>
                        <Button
                          variant="outline"
                          size="small"
                          icon={<Edit className="h-4 w-4" />}
                          onClick={handleEditClick}
                        >
                          تعديل
                        </Button>
                        <Button
                          variant="outline"
                          size="small"
                          icon={<Trash className="h-4 w-4" />}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          حذف
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="primary"
                          size="small"
                          onClick={handleSaveEdit}
                        >
                          حفظ
                        </Button>
                        <Button
                          variant="outline"
                          size="small"
                          onClick={handleCancelEdit}
                        >
                          إلغاء
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={selectedReport.patientAvatar}
                      alt={selectedReport.patientName}
                      className="w-10 h-10 rounded-full object-cover ml-3"
                    />
                    <div>
                      <p className="font-medium">{selectedReport.patientName}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(selectedReport.date)}
                      </p>
                    </div>
                  </div>
                  
                  <div
                    className={`inline-block px-2 py-1 text-sm rounded-full mb-4 ${
                      selectedReport.type === 'prescription'
                        ? 'bg-secondary-100 text-secondary-800'
                        : 'bg-primary-100 text-primary-800'
                    }`}
                  >
                    {selectedReport.type === 'prescription' ? 'وصفة طبية' : 'تقرير طبي'}
                  </div>
                </div>
                
                {!isEditing ? (
                  <div className="p-4 bg-gray-50 rounded-md whitespace-pre-line">
                    {selectedReport.content}
                  </div>
                ) : (
                  <textarea
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    className="w-full p-4 min-h-[300px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                  />
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  لم يتم تحديد أي تقرير
                </h3>
                <p className="text-gray-500">
                  يرجى اختيار تقرير من القائمة لعرض التفاصيل أو إنشاء تقرير جديد
                </p>
                <Button
                  variant="primary"
                  className="mt-4"
                  icon={<Plus className="h-5 w-5" />}
                >
                  إنشاء تقرير جديد
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DoctorReports;