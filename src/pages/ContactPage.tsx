import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is updated
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'الموضوع مطلوب';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'الرسالة مطلوبة';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1500);
    }
  };
  
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-primary-500" />,
      title: 'الهاتف',
      info: '0558383523',
      action: 'اتصل بنا',
      link: 'tel:0558383523',
    },
    {
      icon: <Mail className="h-6 w-6 text-primary-500" />,
      title: 'البريد الإلكتروني',
      info: 'kariemaaicha@gmail.com',
      action: 'راسلنا',
      link: 'mailto:kariemaaicha@gmail.com',
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary-500" />,
      title: 'العنوان',
      info: '  المسيلة - الجزائر',
      action: 'احصل على الاتجاهات',
      link: 'https://maps.google.com',
    },
    {
      icon: <Clock className="h-6 w-6 text-primary-500" />,
      title: 'ساعات العمل',
      info: 'الأحد - الخميس: 8 صباحًا - 8 مساءً',
      secondaryInfo: 'الجمعة - السبت: 10 صباحًا - 6 مساءً',
      action: 'احجز موعدًا',
      link: '/register',
    },
  ];
  
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
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          تواصل معنا
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          نحن هنا للإجابة على استفساراتك وتقديم المساعدة. لا تتردد في التواصل معنا.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Contact Form */}
        <motion.div variants={itemVariants}>
          <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              أرسل لنا رسالة
            </h2>
            
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                <p>تم إرسال رسالتك بنجاح. سنتواصل معك قريبًا.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block mb-1 text-gray-700">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-1 text-gray-700">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="phone" className="block mb-1 text-gray-700">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-1 text-gray-700">
                    الموضوع
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-red-500 text-sm">{errors.subject}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block mb-1 text-gray-700">
                  الرسالة
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-red-500 text-sm">{errors.message}</p>
                )}
              </div>
              
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                icon={<Send className="ml-2 h-5 w-5" />}
                isLoading={isSubmitting}
              >
                إرسال الرسالة
              </Button>
            </form>
          </Card>
        </motion.div>
        
        {/* Contact Info */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="bg-primary-50 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              معلومات التواصل
            </h2>
            <p className="text-gray-600 mb-4">
              يمكنك التواصل معنا من خلال وسائل الاتصال التالية، أو زيارتنا في مقر المركز.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactInfo.map((item, index) => (
              <Card key={index} className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary-50 rounded-full ml-3">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                </div>
                <div className="mb-4 flex-grow">
                  <p className="text-gray-600">{item.info}</p>
                  {item.secondaryInfo && (
                    <p className="text-gray-600">{item.secondaryInfo}</p>
                  )}
                </div>
                <a
                  href={item.link}
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  {item.action}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </Card>
            ))}
          </div>
          
          {/* Map */}
          <Card className="h-80">
            <div className="h-full rounded-md overflow-hidden">
              <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103863.98728379533!2d4.429349470500377!3d35.70727229099433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128b53ad7a74e91f%3A0x36de4fc0d1ac9e61!2sM&#39;sila%2C%20Alg%C3%A9rie!5e0!3m2!1sfr!2sdz!4v1718119640000!5m2!1sfr!2sdz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع المركز"
              ></iframe>
            </div>
          </Card>
        </motion.div>
      </div>
      
      {/* FAQ Section */}
      <motion.div variants={itemVariants} className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            الأسئلة الشائعة
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            إجابات على الأسئلة الأكثر شيوعًا حول خدماتنا وعملية العلاج
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              كيف يمكنني تسجيل مراهق في برنامج العلاج؟
            </h3>
            <p className="text-gray-600">
              يمكنك تسجيل المراهق من خلال إنشاء حساب على موقعنا، أو الاتصال بنا مباشرة لتحديد موعد للتقييم الأولي. سيقوم الفريق الطبي بتقييم الحالة ووضع خطة علاجية مناسبة.
            </p>
          </Card>
          
          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ما هي مدة برنامج العلاج؟
            </h3>
            <p className="text-gray-600">
              تختلف مدة البرنامج العلاجي حسب حالة كل مراهق واحتياجاته. عادة ما تتراوح المدة بين 3 إلى 6 أشهر، تليها فترة متابعة ودعم مستمر لضمان استمرارية التعافي.
            </p>
          </Card>
          
          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              هل تقدمون خدمات العلاج عن بُعد؟
            </h3>
            <p className="text-gray-600">
              نعم، نقدم خدمات الاستشارة والمتابعة عن بُعد من خلال منصتنا الإلكترونية. يمكن للمرضى التواصل مع الأطباء المعالجين وحضور بعض الجلسات العلاجية عبر الإنترنت.
            </p>
          </Card>
          
          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              هل يتم إشراك العائلة في عملية العلاج؟
            </h3>
            <p className="text-gray-600">
              نعم، نؤمن بأهمية دور العائلة في عملية التعافي. نقدم جلسات علاج أسري وورش عمل للعائلات لمساعدتهم على فهم الإدمان ودعم المراهق في رحلة التعافي.
            </p>
          </Card>
          
          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              هل خدماتكم مشمولة بالتأمين الصحي؟
            </h3>
            <p className="text-gray-600">
              نتعاون مع العديد من شركات التأمين الصحي. يمكنك التواصل معنا للتحقق من تغطية التأمين الخاص بك لخدماتنا العلاجية.
            </p>
          </Card>
          
          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ما هي الخطوات الأولى في رحلة العلاج؟
            </h3>
            <p className="text-gray-600">
              تبدأ رحلة العلاج بتقييم شامل يجريه فريق متخصص، يليه وضع خطة علاجية مخصصة تناسب احتياجات المراهق. ثم تبدأ جلسات العلاج الفردية والجماعية حسب الخطة الموضوعة.
            </p>
          </Card>
        </div>
      </motion.div>
      
      {/* CTA */}
      <motion.div variants={itemVariants}>
        <div className="bg-primary-900 text-white rounded-lg shadow-xl p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            مستعدون للمساعدة
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            لا تتردد في التواصل معنا إذا كنت بحاجة إلى معلومات إضافية أو ترغب في تحديد موعد.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
            <a
              href="tel:+966123456789"
              className="btn bg-white text-primary-900 hover:bg-gray-100"
            >
              اتصل بنا الآن
            </a>
            <a
              href="/register"
              className="btn border border-white text-white hover:bg-primary-800"
            >
              إنشاء حساب
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactPage;