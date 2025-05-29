import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Shield, Clock, Award } from 'lucide-react';
import Card from '../components/common/Card';

const HomePage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: 'أحمد علي',
      role: 'متعافي',
      content:
        'كنت أعاني من الإدمان لسنوات، ولكن بفضل الرعاية المتميزة في مركز الأمل، تمكنت من التغلب على إدماني والعودة إلى حياتي الطبيعية. أنا ممتن جدًا للدعم الذي تلقيته من الأطباء والمعالجين في المركز.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: 2,
      name: 'سارة محمد',
      role: 'والدة متعافي',
      content:
        'بعد معاناة ابني مع الإدمان، وجدنا في مركز الأمل الملاذ الآمن والبيئة الداعمة التي ساعدته على التعافي. الرعاية المهنية والاهتمام الشخصي بكل حالة كان له أثر كبير في نجاح رحلة التعافي.',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: 3,
      name: 'خالد أحمد',
      role: 'متعافي',
      content:
        'مركز الأمل غير حياتي للأفضل. فريق العمل المحترف والمتفاني، والبرامج العلاجية المتكاملة، والدعم المستمر، كل ذلك ساهم في نجاح رحلة تعافي. أنصح بشدة أي شخص يعاني من الإدمان بالتواصل مع المركز.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  ];
  
  const features = [
    {
      icon: <Heart className="h-10 w-10 text-primary-500" />,
      title: 'رعاية شخصية',
      description: 'نقدم رعاية مخصصة تناسب احتياجات كل مريض ووضعه الخاص',
    },
    {
      icon: <Shield className="h-10 w-10 text-primary-500" />,
      title: 'بيئة آمنة',
      description: 'بيئة علاجية آمنة وداعمة تساعد على التعافي والشفاء',
    },
    {
      icon: <Clock className="h-10 w-10 text-primary-500" />,
      title: 'دعم مستمر',
      description: 'نقدم الدعم على مدار الساعة لضمان استمرارية التعافي',
    },
    {
      icon: <Award className="h-10 w-10 text-primary-500" />,
      title: 'فريق متخصص',
      description: 'فريق من الأطباء والمعالجين المتخصصين في علاج الإدمان',
    },
  ];
  
  const stepsToRecovery = [
    {
      number: '1',
      title: 'التسجيل',
      description: 'إنشاء حساب وتعبئة المعلومات الأساسية اللازمة',
    },
    {
      number: '2',
      title: 'التقييم',
      description: 'تقييم شامل للحالة من قبل فريق متخصص',
    },
    {
      number: '3',
      title: 'خطة العلاج',
      description: 'وضع خطة علاجية مخصصة تناسب احتياجات المريض',
    },
    {
      number: '4',
      title: 'المتابعة',
      description: 'متابعة مستمرة وتقييم التقدم في رحلة التعافي',
    },
  ];
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:ml-8 mb-8 md:mb-0">
              <motion.h1
                className="text-3xl md:text-5xl font-bold text-primary-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                مركز الأمل لعلاج إدمان المراهقين
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                نقدم رعاية متخصصة وفعالة لمساعدة المراهقين على التغلب على الإدمان والعودة لحياة صحية ومنتجة
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link to="/register" className="btn btn-primary text-center sm:text-right">
                  إنشاء حساب
                </Link>
                <Link to="/about" className="btn btn-outline text-center sm:text-right">
                  معرفة المزيد
                </Link>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.img
                src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                alt="مركز الأمل لعلاج الإدمان"
                className="rounded-lg shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">ما يميزنا</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نقدم خدمات علاجية متكاملة لمساعدة المراهقين على التغلب على الإدمان والعودة إلى حياتهم الطبيعية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Recovery Steps Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">خطوات العلاج</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              رحلة التعافي تبدأ بخطوات بسيطة، ونحن هنا لمساعدتك في كل خطوة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stepsToRecovery.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-lg shadow-md p-6 relative z-10">
                  <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </div>
                
                {index < stepsToRecovery.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-full h-1 bg-primary-200 transform translate-x-1/2 z-0"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">قصص نجاح</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              استمع إلى تجارب بعض المتعافين وعائلاتهم مع مركز الأمل
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className={`bg-white rounded-lg shadow-md p-8 transition-opacity ${
                    activeTestimonial === index ? 'block' : 'hidden'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center mb-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mb-4 md:mb-0 md:ml-4"
                    />
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">{testimonial.content}</p>
                </motion.div>
              ))}
              
              <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      activeTestimonial === index ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                    aria-label={`شهادة ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">ابدأ رحلة التعافي اليوم</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              الخطوة الأولى نحو التعافي هي طلب المساعدة. نحن هنا لمساعدتك في كل خطوة من رحلتك نحو حياة صحية خالية من الإدمان.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
              <Link
                to="/register"
                className="btn bg-white text-primary-900 hover:bg-gray-100 text-center"
              >
                إنشاء حساب
              </Link>
              <Link
                to="/contact"
                className="btn border border-white text-white hover:bg-primary-800 text-center"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;