import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Pill, 
  Search, 
  Filter, 
  ChevronDown, 
  User, 
  Plus, 
  Edit, 
  Trash,
  Send
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

interface Patient {
  id: string;
  name: string;
  avatar: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
}

interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  date: string;
  status: 'draft' | 'sent';
  medications: Medication[];
  notes: string;
}

const DoctorPrescriptions = () => {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'sent'>('all');
  const [patientFilter, setPatientFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editNotes, setEditNotes] = useState('');
  const [editMedications, setEditMedications] = useState<Medication[]>([]);
  
  useEffect(() => {
    // Mock API call to fetch prescriptions and patients
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
      
      // Mock prescriptions data
      const mockPrescriptions: Prescription[] = [
        {
          id: 'presc-1',
          patientId: 'pat-1',
          patientName: 'أحمد محمد',
          patientAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
          date: '2025-05-10',
          status: 'sent',
          medications: [
            {
              id: 'med-1',
              name: 'سيرترالين',
              dosage: '50 ملغ',
              frequency: 'مرة واحدة يوميًا',
              instructions: 'يؤخذ في الصباح مع الطعام',
            },
            {
              id: 'med-2',
              name: 'ألبرازولام',
              dosage: '0.5 ملغ',
              frequency: 'عند الحاجة',
              instructions: 'يؤخذ عند الشعور بالقلق الشديد، بحد أقصى 3 مرات في اليوم',
            },
          ],
          notes: 'يرجى الالتزام بالجرعات المحددة ومراقبة أي آثار جانبية. في حالة ظهور أعراض جانبية شديدة، يرجى التواصل مع الطبيب فورًا.',
        },
        {
          id: 'presc-2',
          patientId: 'pat-2',
          patientName: 'سارة أحمد',
          patientAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
          date: '2025-05-05',
          status: 'sent',
          medications: [
            {
              id: 'med-3',
              name: 'فلوكستين',
              dosage: '20 ملغ',
              frequency: 'مرة واحدة يوميًا',
              instructions: 'يؤخذ في الصباح',
            },
            {
              id: 'med-4',
              name: 'ميلاتونين',
              dosage: '3 ملغ',
              frequency: 'مرة واحدة يوميًا',
              instructions: 'يؤخذ قبل النوم بساعة',
            },
          ],
          notes: 'قد تظهر بعض الآثار الجانبية مثل الغثيان أو الصداع في الأيام الأولى من العلاج وعادة ما تختفي خلال أسبوع. يرجى المتابعة بعد أسبوعين لتقييم فعالية العلاج.',
        },
        {
          id: 'presc-3',
          patientId: 'pat-3',
          patientName: 'محمد علي',
          patientAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
          date: '2025-04-20',
          status: 'sent',
          medications: [
            {
              id: 'med-5',
              name: 'بوبروبيون',
              dosage: '150 ملغ',
              frequency: 'مرتين يوميًا',
              instructions: 'يؤخذ في الصباح والمساء',
            },
          ],
          notes: 'يستخدم هذا الدواء للمساعدة في التوقف عن التدخين وتقليل الرغبة الشديدة. قد يسبب جفاف الفم والأرق في بداية العلاج.',
        },
        {
          id: 'presc-4',
          patientId: 'pat-4',
          patientName: 'نورا سعيد',
          patientAvatar: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
          date: '2025-05-11',
          status: 'draft',
          medications: [
            {
              id: 'med-6',
              name: 'إسيتالوبرام',
              dosage: '10 ملغ',
              frequency: 'مرة واحدة يوميًا',
              instructions: 'يؤخذ في المساء قبل النوم',
            },
            {
              id: 'med-7',
              name: 'بروبرانولول',
              dosage: '10 ملغ',
              frequency: 'عند الحاجة',
              instructions: 'يؤخذ قبل المواقف التي تسبب القلق بـ 30 دقيقة',
            },
          ],
          notes: 'وصفة مقترحة للعلاج، سيتم مناقشتها في الجلسة القادمة. يرجى إبلاغي بأي استفسارات قبل الجلسة.',
        },
      ];
      
      setPatients(mockPatients);
      setPrescriptions(mockPrescriptions);
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
  
  const handlePrescriptionClick = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setIsEditing(false);
    setEditNotes(prescription.notes);
    setEditMedications([...prescription.medications]);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleEditClick = () => {
    if (!selectedPrescription) return;
    setIsEditing(true);
    setEditNotes(selectedPrescription.notes);
    setEditMedications([...selectedPrescription.medications]);
  };
  
  const handleSaveEdit = () => {
    if (!selectedPrescription) return;
    
    const updatedPrescription = {
      ...selectedPrescription,
      notes: editNotes,
      medications: editMedications,
    };
    
    // Update the prescriptions array
    const updatedPrescriptions = prescriptions.map(prescription =>
      prescription.id === selectedPrescription.id ? updatedPrescription : prescription
    );
    
    setPrescriptions(updatedPrescriptions);
    setSelectedPrescription(updatedPrescription);
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  
  const handleAddMedication = () => {
    const newMedication: Medication = {
      id: `med-${Date.now()}`,
      name: '',
      dosage: '',
      frequency: '',
      instructions: '',
    };
    
    setEditMedications([...editMedications, newMedication]);
  };
  
  const handleRemoveMedication = (id: string) => {
    setEditMedications(editMedications.filter(med => med.id !== id));
  };
  
  const handleMedicationChange = (id: string, field: keyof Medication, value: string) => {
    setEditMedications(
      editMedications.map(med =>
        med.id === id ? { ...med, [field]: value } : med
      )
    );
  };
  
  const handleSendPrescription = () => {
    if (!selectedPrescription) return;
    
    const updatedPrescription = {
      ...selectedPrescription,
      status: 'sent' as const,
    };
    
    // Update the prescriptions array
    const updatedPrescriptions = prescriptions.map(prescription =>
      prescription.id === selectedPrescription.id ? updatedPrescription : prescription
    );
    
    setPrescriptions(updatedPrescriptions);
    setSelectedPrescription(updatedPrescription);
  };
  
  const filteredPrescriptions = prescriptions.filter(prescription => {
    // Filter by search term
    const matchesSearch =
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medications.some(med =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      prescription.notes.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || prescription.status === statusFilter;
    
    // Filter by patient
    const matchesPatient = patientFilter === 'all' || prescription.patientId === patientFilter;
    
    return matchesSearch && matchesStatus && matchesPatient;
  });
  
  const sortedPrescriptions = [...filteredPrescriptions].sort(
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">الوصفات الطبية</h1>
          <p className="text-gray-600">
            إدارة وإنشاء الوصفات الطبية للمرضى
          </p>
        </div>
        
        <Button variant="primary" icon={<Plus className="h-5 w-5" />}>
          إنشاء وصفة جديدة
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prescriptions List */}
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
                  placeholder="البحث في الوصفات..."
                  className="w-full pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">قائمة الوصفات</h2>
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
                  <h3 className="text-sm font-medium mb-2">الحالة</h3>
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
                        checked={statusFilter === 'sent'}
                        onChange={() => setStatusFilter('sent')}
                        className="ml-2"
                      />
                      <span>مرسلة</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        checked={statusFilter === 'draft'}
                        onChange={() => setStatusFilter('draft')}
                        className="ml-2"
                      />
                      <span>مسودة</span>
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
            
            {sortedPrescriptions.length > 0 ? (
              <div className="space-y-2 overflow-y-auto max-h-[600px]">
                {sortedPrescriptions.map(prescription => (
                  <div
                    key={prescription.id}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      selectedPrescription?.id === prescription.id
                        ? 'bg-primary-50 border border-primary-200'
                        : 'hover:bg-gray-50 border border-gray-200'
                    }`}
                    onClick={() => handlePrescriptionClick(prescription)}
                  >
                    <div className="flex items-start">
                      <Pill
                        className="ml-3 h-5 w-5 mt-1 text-secondary-600"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <User className="ml-1 h-4 w-4 text-gray-500" />
                          <h3 className="font-medium truncate">{prescription.patientName}</h3>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {prescription.medications.map(med => med.name).join(', ')}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-gray-500 text-xs">
                            {formatDate(prescription.date)}
                          </span>
                          <span
                            className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                              prescription.status === 'sent'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {prescription.status === 'sent' ? 'مرسلة' : 'مسودة'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">لا توجد وصفات متاحة.</p>
            )}
          </Card>
        </motion.div>
        
        {/* Prescription Details */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2"
        >
          <Card>
            {selectedPrescription ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <img
                      src={selectedPrescription.patientAvatar}
                      alt={selectedPrescription.patientName}
                      className="w-10 h-10 rounded-full object-cover ml-3"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">{selectedPrescription.patientName}</h2>
                      <p className="text-sm text-gray-500">
                        {formatDate(selectedPrescription.date)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 space-x-reverse">
                    {!isEditing ? (
                      <>
                        {selectedPrescription.status === 'draft' && (
                          <Button
                            variant="primary"
                            size="small"
                            icon={<Send className="h-4 w-4" />}
                            onClick={handleSendPrescription}
                          >
                            إرسال
                          </Button>
                        )}
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
                  <span
                    className={`inline-block px-2 py-1 text-sm rounded-full mb-4 ${
                      selectedPrescription.status === 'sent'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {selectedPrescription.status === 'sent' ? 'مرسلة' : 'مسودة'}
                  </span>
                  
                  <h3 className="text-lg font-semibold mb-3">الأدوية</h3>
                  
                  {!isEditing ? (
                    <div className="space-y-4">
                      {selectedPrescription.medications.map(medication => (
                        <div
                          key={medication.id}
                          className="p-4 border border-gray-200 rounded-md"
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium">{medication.name}</h4>
                            <p className="text-gray-600">{medication.dosage}</p>
                          </div>
                          <p className="text-gray-600 mt-1">{medication.frequency}</p>
                          <p className="text-gray-600 mt-1">{medication.instructions}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {editMedications.map(medication => (
                        <div
                          key={medication.id}
                          className="p-4 border border-gray-200 rounded-md"
                        >
                          <div className="flex justify-between items-start">
                            <div className="w-full">
                              <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  اسم الدواء
                                </label>
                                <input
                                  type="text"
                                  value={medication.name}
                                  onChange={e =>
                                    handleMedicationChange(medication.id, 'name', e.target.value)
                                  }
                                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                                />
                              </div>
                              
                              <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  الجرعة
                                </label>
                                <input
                                  type="text"
                                  value={medication.dosage}
                                  onChange={e =>
                                    handleMedicationChange(medication.id, 'dosage', e.target.value)
                                  }
                                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                                />
                              </div>
                              
                              <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  التكرار
                                </label>
                                <input
                                  type="text"
                                  value={medication.frequency}
                                  onChange={e =>
                                    handleMedicationChange(
                                      medication.id,
                                      'frequency',
                                      e.target.value
                                    )
                                  }
                                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  تعليمات
                                </label>
                                <input
                                  type="text"
                                  value={medication.instructions}
                                  onChange={e =>
                                    handleMedicationChange(
                                      medication.id,
                                      'instructions',
                                      e.target.value
                                    )
                                  }
                                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                                />
                              </div>
                            </div>
                            
                            <button
                              onClick={() => handleRemoveMedication(medication.id)}
                              className="text-red-600 hover:text-red-800 p-1 transition-colors mr-2"
                            >
                              <Trash className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <button
                        onClick={handleAddMedication}
                        className="w-full py-2 border border-dashed border-gray-300 rounded-md text-gray-600 hover:text-primary-600 hover:border-primary-300 transition-colors"
                      >
                        <Plus className="h-5 w-5 mx-auto" />
                        <span>إضافة دواء</span>
                      </button>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">ملاحظات</h3>
                  
                  {!isEditing ? (
                    <div className="p-4 bg-gray-50 rounded-md whitespace-pre-line">
                      {selectedPrescription.notes}
                    </div>
                  ) : (
                    <textarea
                      value={editNotes}
                      onChange={e => setEditNotes(e.target.value)}
                      className="w-full p-4 min-h-[150px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                      placeholder="أضف ملاحظات حول الوصفة الطبية..."
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Pill className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  لم يتم تحديد أي وصفة
                </h3>
                <p className="text-gray-500">
                  يرجى اختيار وصفة من القائمة لعرض التفاصيل أو إنشاء وصفة جديدة
                </p>
                <Button
                  variant="primary"
                  className="mt-4"
                  icon={<Plus className="h-5 w-5" />}
                >
                  إنشاء وصفة جديدة
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DoctorPrescriptions;