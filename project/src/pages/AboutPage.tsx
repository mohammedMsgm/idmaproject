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
  
  const team = [
    {
      name: 'د. خالد العمري',
      role: 'المدير الطبي - طبيب نفسي',
      image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'طبيب نفسي متخصص في علاج إدمان المراهقين مع خبرة أكثر من 15 عامًا في المجال.',
    },
    {
      name: 'د. سارة الأحمد',
      role: 'رئيسة قسم العلاج النفسي',
      image: 'https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'متخصصة في العلاج المعرفي السلوكي وتطوير برامج العلاج المتكاملة لإدمان المراهقين.',
    },
    {
      name: 'د. أحمد محمود',
      role: 'استشاري الطب النفسي',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'خبير في تشخيص وعلاج الاضطرابات المصاحبة للإدمان لدى المراهقين.',
    },
    {
      name: 'أ. نورا حسن',
      role: 'أخصائية علاج نفسي',
      image: 'https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'متخصصة في العلاج الأسري وتقديم الدعم النفسي للمراهقين وعائلاتهم.',
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
                تأسس مركز الأمل في عام 2015 استجابة للحاجة المتزايدة لوجود مركز متخصص في علاج إدمان المراهقين يقدم خدمات شاملة ومتكاملة تناسب احتياجات هذه الفئة العمرية الحساسة.
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
      
      {/* Our Team */}
      <motion.section variants={itemVariants} className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            فريقنا
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            يضم فريقنا نخبة من الأطباء والمعالجين المتخصصين في مجال علاج إدمان المراهقين
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
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