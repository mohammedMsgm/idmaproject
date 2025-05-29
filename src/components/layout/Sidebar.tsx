import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  MessageCircle, 
  Users, 
  Pill, 
  Settings 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  const isPatient = user?.type === 'patient';
  const isDoctor = user?.type === 'doctor';
  
  const patientLinks = [
    {
      name: 'لوحة التحكم',
      path: '/patient/dashboard',
      icon: <LayoutDashboard className="ml-2 h-5 w-5" />,
    },
    {
      name: 'التقارير والوصفات',
      path: '/patient/reports',
      icon: <FileText className="ml-2 h-5 w-5" />,
    },
    {
      name: 'الاستشارات',
      path: '/patient/consultations',
      icon: <MessageCircle className="ml-2 h-5 w-5" />,
    },
    {
      name: 'الإعدادات',
      path: '/patient/settings',
      icon: <Settings className="ml-2 h-5 w-5" />,
    },
  ];
  
  const doctorLinks = [
    {
      name: 'لوحة التحكم',
      path: '/doctor/dashboard',
      icon: <LayoutDashboard className="ml-2 h-5 w-5" />,
    },
    {
      name: 'المرضى',
      path: '/doctor/patients',
      icon: <Users className="ml-2 h-5 w-5" />,
    },
    {
      name: 'التقارير',
      path: '/doctor/reports',
      icon: <FileText className="ml-2 h-5 w-5" />,
    },
    {
      name: 'الوصفات العلاجية',
      path: '/doctor/prescriptions',
      icon: <Pill className="ml-2 h-5 w-5" />,
    },
    {
      name: 'الإعدادات',
      path: '/doctor/settings',
      icon: <Settings className="ml-2 h-5 w-5" />,
    },
  ];
  
  const links = isPatient ? patientLinks : isDoctor ? doctorLinks : [];
  
  return (
    <div className="h-full py-6 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-3xl text-gray-400">{user?.name.charAt(0)}</span>
            )}
          </div>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-gray-800">{user?.name}</h3>
          <p className="text-sm text-gray-500">{isPatient ? 'مريض' : 'طبيب'}</p>
        </div>
      </div>
      
      <nav className="space-y-1">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center py-3 px-4 rounded-md transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;