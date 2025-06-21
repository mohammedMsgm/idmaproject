// Mock data fallback when database is not available
export const mockUsersData = [
  // المرضى
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    password: '123456',
    user_type: 'patient' as const,
    doctor_id: '1'
  },
  {
    id: '2',
    name: 'فاطمة علي',
    email: 'fatima@example.com',
    password: '123456',
    user_type: 'patient' as const,
    doctor_id: '1'
  },
  {
    id: '3',
    name: 'محمد سالم',
    email: 'mohamed@example.com',
    password: '123456',
    user_type: 'patient' as const,
    doctor_id: '2'
  },
  {
    id: '4',
    name: 'نور الهدى',
    email: 'nour@example.com',
    password: '123456',
    user_type: 'patient' as const,
    doctor_id: '3'
  },
  {
    id: '5',
    name: 'يوسف أحمد',
    email: 'youssef@example.com',
    password: '123456',
    user_type: 'patient' as const,
    doctor_id: '4'
  },
  // الأطباء
  {
    id: '6',
    name: 'د. خالد العمري',
    email: 'khalid@example.com',
    password: '123456',
    user_type: 'doctor' as const
  },
  {
    id: '7',
    name: 'د. ليلى حسن',
    email: 'layla@example.com',
    password: '123456',
    user_type: 'doctor' as const
  },
  {
    id: '8',
    name: 'د. سيداني منير',
    email: 'sidani@example.com',
    password: '123456',
    user_type: 'doctor' as const
  },
  {
    id: '9',
    name: 'د. بورزق عائشة',
    email: 'aicha@example.com',
    password: '123456',
    user_type: 'doctor' as const
  }
];

export const mockDoctorsData = [
  { id: '6', name: 'د. خالد العمري', specialization: 'طب نفسي' },
  { id: '7', name: 'د. ليلى حسن', specialization: 'اخصائي اجتماعي'},
  { id: '8', name: 'د. سيداني منير', specialization: 'اخصائي نفساني' },
  { id: '9', name: 'د. بورزق عائشة', specialization: 'اخصائي اجتماعي' },
];
