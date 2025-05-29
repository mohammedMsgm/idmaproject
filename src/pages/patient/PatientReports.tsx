import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Filter, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';

interface Report {
  id: string;
  title: string;
  date: string;
  doctorName: string;
  type: 'report' | 'prescription';
  content: string;
}

const PatientReports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'report' | 'prescription'>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    // Mock API call to fetch reports
    const fetchReports = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockReports: Report[] = [
        {
          id: 'rep-1',
          title: 'تقرير الجلسة العلاجية الأسبوعية',
          date: '2025-05-10',
          doctorName: 'د. خالد العمري',
          type: 'report',
          content: 'خلال الجلسة العلاجية الأسبوعية، لاحظنا تحسنًا في المزاج العام للمريض وانخفاضًا في مستويات القلق. استمر المريض في الالتزام بخطة العلاج وأظهر تقدمًا جيدًا في التعامل مع التحديات اليومية. ننصح بالاستمرار في ممارسة تمارين الاسترخاء والتأمل اليومية، وكذلك الالتزام بمواعيد الجلسات العلاجية الأسبوعية.',
        },
        {
          id: 'rep-2',
          title: 'وصفة علاجية شهرية',
          date: '2025-05-05',
          doctorName: 'د. خالد العمري',
          type: 'prescription',
          content: 'الدواء الأول: [اسم الدواء] - 10 ملغ - مرة واحدة صباحًا\nالدواء الثاني: [اسم الدواء] - 5 ملغ - مرتين يوميًا بعد الوجبات\n\nملاحظات: يرجى الالتزام بالجرعات المحددة والمواعيد. يجب متابعة أي آثار جانبية وإبلاغ الطبيب فورًا في حالة ظهور أي أعراض غير طبيعية.',
        },
        {
          id: 'rep-3',
          title: 'تقييم التقدم في خطة العلاج',
          date: '2025-04-28',
          doctorName: 'د. خالد العمري',
          type: 'report',
          content: 'بعد مرور شهر على بدء خطة العلاج، نلاحظ تحسنًا ملحوظًا في الحالة العامة للمريض. انخفضت مستويات القلق والتوتر بنسبة 30%، وتحسنت أنماط النوم بشكل ملحوظ. يستمر المريض في الالتزام بجلسات العلاج النفسي وتمارين الاسترخاء اليومية. ننصح بالاستمرار في اتباع الخطة العلاجية الحالية مع تعديلات طفيفة في الجرعات الدوائية كما هو موضح في الوصفة الطبية المرفقة.',
        },
        {
          id: 'rep-4',
          title: 'وصفة علاجية',
          date: '2025-04-15',
          doctorName: 'د. خالد العمري',
          type: 'prescription',
          content: 'الدواء الأول: [اسم الدواء] - 15 ملغ - مرة واحدة صباحًا\nالدواء الثاني: [اسم الدواء] - 7.5 ملغ - مرتين يوميًا بعد الوجبات\n\nملاحظات: يرجى الالتزام بالجرعات المحددة والمواعيد. يجب متابعة أي آثار جانبية وإبلاغ الطبيب فورًا في حالة ظهور أي أعراض غير طبيعية.',
        },
        {
          id: 'rep-5',
          title: 'التقرير الأولي بعد التقييم',
          date: '2025-04-02',
          doctorName: 'د. خالد العمري',
          type: 'report',
          content: 'بعد إجراء التقييم الأولي، تم تشخيص المريض بـ [التشخيص]. تم وضع خطة علاجية تتضمن جلسات العلاج النفسي الأسبوعية، وتمارين الاسترخاء اليومية، بالإضافة إلى العلاج الدوائي. الهدف الرئيسي من الخطة العلاجية هو تحسين نوعية الحياة وتقليل أعراض القلق والتوتر. سيتم إجراء تقييم دوري كل شهر لمتابعة التقدم في الخطة العلاجية وإجراء التعديلات اللازمة.',
        },
      ];
      
      setReports(mockReports);
      setLoading(false);
    };
    
    fetchReports();
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
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const filteredReports = reports.filter(report => {
    if (filterType === 'all') return true;
    return report.type === filterType;
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">التقارير والوصفات</h1>
        <p className="text-gray-600">
          اطلع على التقارير والوصفات الطبية الخاصة بك
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-1"
        >
          <Card>
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
                <h3 className="text-sm font-medium mb-2">نوع التقرير</h3>
                <div className="flex space-x-4 space-x-reverse">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="reportType"
                      checked={filterType === 'all'}
                      onChange={() => setFilterType('all')}
                      className="ml-2"
                    />
                    <span>الكل</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="reportType"
                      checked={filterType === 'report'}
                      onChange={() => setFilterType('report')}
                      className="ml-2"
                    />
                    <span>تقارير</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="reportType"
                      checked={filterType === 'prescription'}
                      onChange={() => setFilterType('prescription')}
                      className="ml-2"
                    />
                    <span>وصفات</span>
                  </label>
                </div>
              </div>
            )}
            
            {sortedReports.length > 0 ? (
              <div className="space-y-2">
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
                        className={`ml-3 h-5 w-5 ${
                          report.type === 'prescription'
                            ? 'text-secondary-600'
                            : 'text-primary-600'
                        }`}
                      />
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-gray-600 text-sm">
                          {formatDate(report.date)} - {report.doctorName}
                        </p>
                        <span
                          className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
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
                  <h2 className="text-xl font-semibold">{selectedReport.title}</h2>
                  <button className="btn btn-outline btn-sm flex items-center">
                    <Download className="ml-2 h-4 w-4" />
                    <span>تحميل</span>
                  </button>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-600">
                    <span className="font-medium">التاريخ:</span> {formatDate(selectedReport.date)}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">الطبيب:</span> {selectedReport.doctorName}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">النوع:</span>{' '}
                    {selectedReport.type === 'prescription' ? 'وصفة طبية' : 'تقرير طبي'}
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-md whitespace-pre-line">
                  {selectedReport.content}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  لم يتم تحديد أي تقرير
                </h3>
                <p className="text-gray-500">
                  يرجى اختيار تقرير من القائمة لعرض التفاصيل
                </p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PatientReports;