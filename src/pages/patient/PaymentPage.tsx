import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Smartphone, 
  CheckCircle, 
  ArrowLeft,
  Shield,
  Clock,
  DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

interface PaymentOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  fees: string;
}

interface ServicePackage {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
  popular?: boolean;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<string>('ccp');
  const [ccpNumber, setCcpNumber] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  const servicePackages: ServicePackage[] = [
    {
      id: 'consultation',
      name: 'استشارة واحدة',
      price: 2000,
      currency: 'دج',
      features: [
        'استشارة طبية واحدة مع طبيب مختص',
        'مدة الاستشارة ٣٠ دقيقة',
        'تقرير طبي مكتوب',
        'متابعة لمدة ٤٨ ساعة'
      ]
    },
    {
      id: 'monthly',
      name: 'باقة شهرية',
      price: 5000,
      currency: 'دج',
      features: [
        'استشارات طبية غير محدودة',
        'أولوية في الحجز',
        'تقارير طبية مفصلة',
        'متابعة مستمرة',
        'دعم فني ٢٤/٧'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'باقة سنوية مميزة',
      price: 45000,
      currency: 'دج',
      features: [
        'جميع مميزات الباقة الشهرية',
        'كشف طبي مجاني كل ٣ أشهر',
        'تحاليل طبية مخفضة ٥٠٪',
        'استشارة طوارئ مجانية',
        'برنامج متابعة صحية شخصي'
      ]
    }
  ];

  const paymentOptions: PaymentOption[] = [
    {
      id: 'ccp',
      name: 'حساب جاري بريدي (CCP)',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'ادفع باستخدام رقم حسابك الجاري البريدي',
      fees: 'بدون رسوم إضافية'
    },
    {
      id: 'baridi_mob',
      name: 'بريدي موب',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'ادفع باستخدام تطبيق بريدي موب على هاتفك',
      fees: 'رسوم ٢٠ دج'
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      setTimeout(() => {
        navigate('/patient/dashboard');
      }, 3000);
    }, 2000);
  };

  const selectedPackageData = servicePackages.find(pkg => pkg.id === selectedPackage);

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center" dir="rtl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">تم الدفع بنجاح!</h2>
          <p className="text-gray-600 mb-4">
            تم استلام طلب الدفع وسيتم التحقق منه خلال ٢٤ ساعة
          </p>
          <p className="text-sm text-gray-500">
            سيتم إعادة توجيهك للوحة التحكم خلال ثوانٍ...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            دفع رسوم الخدمات الطبية
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اختر الباقة المناسبة لك وادفع بأمان باستخدام الوسائل المحلية المتاحة
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Service Packages */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="w-6 h-6 ml-2" />
                اختر باقة الخدمة
              </h2>
              
              <div className="space-y-4">
                {servicePackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className="cursor-pointer"
                  >                    <Card className={`relative overflow-visible transition-all duration-200 hover:shadow-lg ${
                      selectedPackage === pkg.id 
                        ? 'ring-2 ring-blue-500 shadow-lg' 
                        : 'hover:ring-1 hover:ring-gray-300'
                    }`}>
                      {pkg.popular && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold z-10 whitespace-nowrap">
                          الأكثر شعبية
                        </div>
                      )}                      
                      <div className={`p-6 ${pkg.popular ? 'pt-8' : ''}`}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {pkg.name}
                            </h3>
                            <div className="flex items-baseline">
                              <span className="text-3xl font-bold text-blue-600">
                                {pkg.price.toLocaleString()}
                              </span>
                              <span className="text-lg text-gray-600 mr-1">
                                {pkg.currency}
                              </span>
                            </div>
                          </div>
                          
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedPackage === pkg.id
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedPackage === pkg.id && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                        </div>
                        
                        <ul className="space-y-2">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 ml-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Payment Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 ml-2" />
                طريقة الدفع
              </h2>

              {/* Payment Methods */}
              <div className="space-y-4 mb-6">
                {paymentOptions.map((option) => (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedPayment(option.id)}
                    className="cursor-pointer"
                  >
                    <Card className={`transition-all duration-200 ${
                      selectedPayment === option.id
                        ? 'ring-2 ring-blue-500 shadow-lg'
                        : 'hover:ring-1 hover:ring-gray-300'
                    }`}>
                      <div className="p-4 flex items-center">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ml-4 ${
                          selectedPayment === option.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedPayment === option.id && (
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            {option.icon}
                            <h3 className="font-semibold text-gray-900 mr-2">
                              {option.name}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {option.description}
                          </p>
                          <p className="text-xs text-green-600 font-medium">
                            {option.fees}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Payment Form */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  معلومات الدفع
                </h3>
                
                <div className="space-y-4">
                  {selectedPayment === 'ccp' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رقم الحساب الجاري البريدي
                      </label>
                      <input
                        type="text"
                        value={ccpNumber}
                        onChange={(e) => setCcpNumber(e.target.value)}
                        placeholder="مثال: 123456789"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                        dir="ltr"
                      />
                    </div>
                  )}
                  
                  {selectedPayment === 'baridi_mob' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رقم الهاتف المسجل في بريدي موب
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="مثال: 0555123456"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                        dir="ltr"
                      />
                    </div>
                  )}

                  {selectedPackageData && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">ملخص الطلب</h4>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">الباقة المختارة:</span>
                        <span className="font-medium">{selectedPackageData.name}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">المبلغ:</span>
                        <span className="font-bold text-lg">
                          {selectedPackageData.price.toLocaleString()} {selectedPackageData.currency}
                        </span>
                      </div>
                      {selectedPayment === 'baridi_mob' && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">رسوم المعاملة:</span>
                          <span>٢٠ دج</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 ml-2" />
                    <span>سيتم التحقق من الدفعة خلال ٢٤ ساعة من تأكيد الدفع</span>
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <Button
                  onClick={handlePayment}
                  disabled={!selectedPackage || isProcessing || 
                    (selectedPayment === 'ccp' && !ccpNumber) ||
                    (selectedPayment === 'baridi_mob' && !phoneNumber)
                  }
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                      جارٍ معالجة الدفع...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 ml-2" />
                      تأكيد الدفع الآمن
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={() => navigate('/patient/dashboard')}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <ArrowLeft className="w-4 h-4 ml-2" />
                  العودة للوحة التحكم
                </Button>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-600 ml-2 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">دفع آمن ومحمي</p>
                    <p>
                      جميع المعاملات محمية بتشفير عالي المستوى. لن نقوم بحفظ معلوماتك المصرفية.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
