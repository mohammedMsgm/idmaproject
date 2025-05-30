import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import Logo from '../common/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Logo className="h-10 w-10 text-white" />
              <span className="mr-3 text-xl font-bold">مركز الأمل</span>
            </div>
            <p className="text-gray-300 mb-4">
              مركز متخصص في علاج إدمان المراهقين، نقدم الدعم والرعاية النفسية والصحية اللازمة للتعافي
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  تواصل معنا
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors">
                  إنشاء حساب
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">معلومات التواصل</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="ml-2 h-5 w-5 text-primary-300" />
                <span className="text-gray-300">+213 657 345 678</span>
              </li>
              <li className="flex items-center">
                <Mail className="ml-2 h-5 w-5 text-primary-300" />
                <span className="text-gray-300">info@alamal-center.com</span>
              </li>
              <li className="flex items-center">
                <MapPin className="ml-2 h-5 w-5 text-primary-300" />
                <span className="text-gray-300">المسيلة، الجزائر</span>
              </li>
            </ul>
          </div>
          
          {/* Working Hours */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">ساعات العمل</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">الأحد - الخميس: 8 صباحًا - 8 مساءً</li>
              <li className="text-gray-300">الجمعة: 10 صباحًا - 6 مساءً</li>
              <li className="text-gray-300">السبت: 10 صباحًا - 4 مساءً</li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        <div className="text-center text-gray-400">
          <p>جميع الحقوق محفوظة &copy; {currentYear} - مركز الأمل لعلاج إدمان المراهقين</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;