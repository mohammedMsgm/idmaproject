import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <motion.div 
      className="min-h-[60vh] flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-bold text-primary-200">404</h1>
      </motion.div>
      
      <h2 className="text-3xl font-bold text-gray-800 mt-6 mb-3">
        الصفحة غير موجودة
      </h2>
      
      <p className="text-gray-600 max-w-md mb-8">
        عذرًا، الصفحة التي تبحث عنها غير موجودة أو تم نقلها أو حذفها.
      </p>
      
      <Link
        to="/"
        className="btn btn-primary flex items-center"
      >
        <Home className="ml-2 h-5 w-5" />
        <span>العودة إلى الصفحة الرئيسية</span>
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;