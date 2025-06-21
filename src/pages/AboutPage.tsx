import { motion } from 'framer-motion';
import { Heart, Shield, Award, Users } from 'lucide-react';

const AboutPage = () => {
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
  
  const values = [
    {
      icon: <Heart className="h-10 w-10 text-primary-500" />,
      title: 'الرعاية',
      description:
        'نقدم رعاية شاملة ومتكاملة تركز على احتياجات كل مريض وظروفه الخاصة',
    },
    {
      icon: <Shield className="h-10 w-10 text-primary-500" />,
      title: 'الأمان',
      description:
        'نوفر بيئة آمنة وداعمة تساعد المراهقين على التعافي والتغلب على الإدمان',
    },
    {
      icon: <Award className="h-10 w-10 text-primary-500" />,
      title: 'التميز',
      description:
        'نلتزم بأعلى معايير الجودة في جميع خدماتنا العلاجية والاستشارية',
    },
    {
      icon: <Users className="h-10 w-10 text-primary-500" />,
      title: 'الشراكة',
      description:
        'نؤمن بأهمية العمل المشترك بين المريض والأسرة والفريق العلاجي لتحقيق أفضل النتائج',
    },
  ];
  
  
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="mb-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            من نحن
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            مركز الأمل هو مركز متخصص في علاج إدمان المراهقين، نقدم خدمات علاجية متكاملة ونوفر بيئة داعمة للتعافي
          </p>
        </div>
        
        <div className="relative overflow-hidden rounded-lg shadow-xl">
          <img
            src="https://images.pexels.com/photos/263194/pexels-photo-263194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
            alt="مركز الأمل"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-primary-900 bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                رؤيتنا
              </h2>
              <p className="text-xl max-w-2xl mx-auto">
                أن نكون المركز الرائد في تقديم الرعاية المتخصصة والمتكاملة لعلاج إدمان المراهقين، ودعمهم في رحلتهم نحو حياة صحية ومنتجة
              </p>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Our Story */}
      <motion.section variants={itemVariants} className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              قصتنا
            </h2>
            <div className="prose prose-lg max-w-none">
              <p>
                تأسس مركز الأمل في عام 2025 استجابة للحاجة المتزايدة لوجود مركز متخصص في علاج إدمان المراهقين يقدم خدمات شاملة ومتكاملة تناسب احتياجات هذه الفئة العمرية الحساسة.
              </p>
              <p>
                بدأنا بفريق صغير من الأطباء والمعالجين المتخصصين، ومع مرور السنوات توسعنا وطورنا خدماتنا لتشمل مجموعة متكاملة من برامج العلاج والتأهيل التي تهدف إلى مساعدة المراهقين على التغلب على الإدمان والعودة إلى حياتهم الطبيعية.
              </p>
              <p>
                اليوم، أصبح مركز الأمل واحدًا من المراكز الرائدة في مجال علاج إدمان المراهقين، حيث ساعدنا المئات من المراهقين وعائلاتهم في رحلتهم نحو التعافي والشفاء.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              مهمتنا
            </h2>
            <div className="prose prose-lg max-w-none">
              <p>
                تتمثل مهمتنا في توفير بيئة آمنة وداعمة للمراهقين المتأثرين بالإدمان، وتقديم خدمات علاجية متكاملة تساعدهم على:
              </p>
              <ul>
                <li>التغلب على الإدمان وتحقيق التعافي المستدام</li>
                <li>تطوير مهارات التأقلم الصحية وبناء الثقة بالنفس</li>
                <li>إعادة بناء العلاقات الأسرية والاجتماعية</li>
                <li>العودة إلى الحياة الطبيعية والمساهمة الإيجابية في المجتمع</li>
              </ul>
              <p>
                نؤمن بأن كل مراهق يستحق فرصة للتعافي والنمو، ونلتزم بتوفير الدعم والرعاية اللازمة لتحقيق ذلك.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Our Values */}
      <motion.section variants={itemVariants} className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            قيمنا
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            تعكس قيمنا التزامنا بتقديم أفضل رعاية ممكنة للمراهقين وعائلاتهم
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {value.title}
              </h3>
              <p className="text-gray-600 text-center">{value.description}</p>
            </div>
          ))}
        </div>
      </motion.section>
      
      
      
      {/* CTA */}
      <motion.section variants={itemVariants}>
        <div className="bg-primary-900 text-white rounded-lg shadow-xl p-8 md:p-10">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              انضم إلينا في رحلة التعافي
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              نحن هنا لمساعدتك. خطوتك الأولى نحو التعافي تبدأ بالتواصل معنا.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
              <a
                href="/contact"
                className="btn bg-white text-primary-900 hover:bg-gray-100 text-center sm:text-right"
              >
                تواصل معنا
              </a>
              <a
                href="/register"
                className="btn border border-white text-white hover:bg-primary-800 text-center sm:text-right"
              >
                إنشاء حساب
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default AboutPage;