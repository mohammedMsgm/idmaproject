import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'patient' | 'doctor';
  content: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

const PatientConsultations = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showConversations, setShowConversations] = useState(true);
    useEffect(() => {
    // Mock API call to fetch conversations
    const fetchConversations = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get patient's assigned doctor from user context
      const patientDoctorId = user?.doctorId;
      
      if (!patientDoctorId) {
        setConversations([]);
        setLoading(false);
        return;
      }
      
      // Mock doctor data mapping
      const doctorProfiles: { [key: string]: { name: string; avatar: string; specialization: string } } = {
        '6': { name: 'د. خالد العمري', avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150', specialization: 'طب نفسي' },
        '7': { name: 'د. ليلى حسن', avatar: 'https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg?auto=compress&cs=tinysrgb&w=150', specialization: 'اخصائي اجتماعي' },
        '8': { name: 'د. سيداني منير', avatar: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=150', specialization: 'اخصائي نفساني' },
        '9': { name: 'د. بورزق عائشة', avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150', specialization: 'اخصائي اجتماعي' },
      };
      
      const assignedDoctor = doctorProfiles[patientDoctorId];
      
      if (!assignedDoctor) {
        setConversations([]);
        setLoading(false);
        return;
      }
      
      // Create conversation with assigned doctor only
      const mockConversations: Conversation[] = [
        {
          id: `conv-${patientDoctorId}`,
          doctorId: patientDoctorId,
          doctorName: assignedDoctor.name,
          doctorAvatar: assignedDoctor.avatar,
          lastMessage: 'كيف حالك اليوم؟ أتمنى أن تكون بخير.',
          lastMessageTime: '2025-06-20T10:30:00',
          unreadCount: 2,
          messages: [
            {
              id: `msg-${patientDoctorId}-1`,
              senderId: patientDoctorId,
              senderName: assignedDoctor.name,
              senderType: 'doctor',
              content: 'مرحبًا، كيف يمكنني مساعدتك اليوم؟',
              timestamp: '2025-06-19T09:15:00',
              read: true,
            },
            {
              id: `msg-${patientDoctorId}-2`,
              senderId: user?.id || 'patient-1',
              senderName: user?.name || 'المريض',
              senderType: 'patient',
              content: 'مرحبًا دكتور، أشعر بالقلق الشديد في الأيام الأخيرة وأجد صعوبة في النوم.',
              timestamp: '2025-06-19T09:20:00',
              read: true,
            },
            {
              id: `msg-${patientDoctorId}-3`,
              senderId: patientDoctorId,
              senderName: assignedDoctor.name,
              senderType: 'doctor',
              content: 'أنا آسف لسماع ذلك. هل هناك أي تغييرات حدثت مؤخرًا في حياتك أو روتينك اليومي؟',
              timestamp: '2025-06-19T09:25:00',
              read: true,
            },
            {
              id: `msg-${patientDoctorId}-4`,
              senderId: user?.id || 'patient-1',
              senderName: user?.name || 'المريض',
              senderType: 'patient',
              content: 'نعم، لقد بدأت في الدراسة في مدرسة جديدة الأسبوع الماضي وأشعر بالتوتر حيال ذلك.',
              timestamp: '2025-06-19T09:30:00',
              read: true,
            },
            {
              id: `msg-${patientDoctorId}-5`,
              senderId: patientDoctorId,
              senderName: assignedDoctor.name,
              senderType: 'doctor',
              content: 'أفهم الآن. التغييرات الكبيرة يمكن أن تسبب التوتر والقلق. دعني أقترح بعض تقنيات الاسترخاء التي يمكنك تجربتها قبل النوم.',
              timestamp: '2025-06-19T09:35:00',
              read: true,
            },
            {
              id: `msg-${patientDoctorId}-6`,
              senderId: patientDoctorId,
              senderName: assignedDoctor.name,
              senderType: 'doctor',
              content: 'كيف حالك اليوم؟ أتمنى أن تكون بخير.',
              timestamp: '2025-06-20T10:30:00',
              read: false,
            },
          ],
        },
      ];      
      setConversations(mockConversations);
      setLoading(false);
    };
    
    fetchConversations();
  }, [user?.name, user?.doctorId, user?.id]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
      const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: user?.id || 'patient-1',
      senderName: user?.name || 'المريض',
      senderType: 'patient',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    // Update the selected conversation with the new message
    const updatedConversation = {
      ...selectedConversation,
      lastMessage: newMessage,
      lastMessageTime: new Date().toISOString(),
      messages: [...selectedConversation.messages, newMsg],
    };
    
    // Update the conversations array
    const updatedConversations = conversations.map(conv =>
      conv.id === selectedConversation.id ? updatedConversation : conv
    );
    
    setSelectedConversation(updatedConversation);
    setConversations(updatedConversations);
    setNewMessage('');
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'اليوم';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'الأمس';
    } else {
      return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  };
  
  const handleSelectConversation = (conversation: Conversation) => {
    // Mark all unread messages as read
    const updatedMessages = conversation.messages.map(msg => ({
      ...msg,
      read: true,
    }));
    
    const updatedConversation = {
      ...conversation,
      unreadCount: 0,
      messages: updatedMessages,
    };
    
    setSelectedConversation(updatedConversation);
    
    // Update the conversations array
    const updatedConversations = conversations.map(conv =>
      conv.id === conversation.id ? updatedConversation : conv
    );
    
    setConversations(updatedConversations);
    setShowConversations(false);
  };
  
  const handleBackToConversations = () => {
    setShowConversations(true);
  };
    const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">الاستشارات</h1>
        <p className="text-gray-600">
          تواصل مع الأطباء المعالجين واطلب الاستشارات الطبية
        </p>
      </div>
      
      <Card className="overflow-hidden">
        <div className="h-[600px] flex flex-col md:flex-row">
          {/* Conversations List */}
          <div
            className={`w-full md:w-1/3 border-l border-gray-200 ${
              showConversations ? 'block' : 'hidden md:block'
            }`}
          >
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">المحادثات</h2>
            </div>
            
            <div className="overflow-y-auto h-[calc(600px-65px)]">
              {conversations.length > 0 ? (
                <div>
                  {conversations.map(conversation => (
                    <div
                      key={conversation.id}
                      className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedConversation?.id === conversation.id ? 'bg-primary-50' : ''
                      }`}
                      onClick={() => handleSelectConversation(conversation)}
                    >
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={conversation.doctorAvatar}
                            alt={conversation.doctorName}
                            className="w-12 h-12 rounded-full object-cover ml-3"
                          />
                          {conversation.unreadCount > 0 && (
                            <span className="absolute top-0 left-0 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <h3 className="font-medium truncate">
                              {conversation.doctorName}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {formatTime(conversation.lastMessageTime)}
                            </span>
                          </div>
                          <p
                            className={`text-sm truncate ${
                              conversation.unreadCount > 0
                                ? 'font-medium text-gray-900'
                                : 'text-gray-500'
                            }`}
                          >
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>              ) : (
                <div className="p-4 text-center text-gray-500">
                  {!user?.doctorId ? 
                    'لم يتم تعيين طبيب لك بعد. يرجى التواصل مع الإدارة.' :
                    'لا توجد محادثات مع طبيبك المعالج بعد.'
                  }
                </div>
              )}
            </div>
          </div>
          
          {/* Conversation */}
          <div
            className={`w-full md:w-2/3 flex flex-col ${
              showConversations ? 'hidden md:flex' : 'flex'
            }`}
          >
            {selectedConversation ? (
              <>
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex items-center">
                  <button
                    className="md:hidden ml-2 p-1 hover:bg-gray-100 rounded-full"
                    onClick={handleBackToConversations}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <img
                    src={selectedConversation.doctorAvatar}
                    alt={selectedConversation.doctorName}
                    className="w-10 h-10 rounded-full object-cover ml-3"
                  />
                  <div>
                    <h2 className="font-semibold">{selectedConversation.doctorName}</h2>
                    <p className="text-xs text-gray-500">متصل</p>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  {selectedConversation.messages.map((message, index) => {
                    // Check if we need to show date separator
                    const showDate =
                      index === 0 ||
                      formatDate(message.timestamp) !==
                        formatDate(selectedConversation.messages[index - 1].timestamp);
                    
                    return (
                      <div key={message.id}>
                        {showDate && (
                          <div className="text-center my-3">
                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                              {formatDate(message.timestamp)}
                            </span>
                          </div>
                        )}
                        
                        <div
                          className={`mb-4 flex ${
                            message.senderType === 'patient' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.senderType === 'patient'
                                ? 'bg-primary-600 text-white'
                                : 'bg-white text-gray-800 border border-gray-200'
                            }`}
                          >
                            <p>{message.content}</p>
                            <div
                              className={`text-xs mt-1 flex justify-end ${
                                message.senderType === 'patient'
                                  ? 'text-primary-100'
                                  : 'text-gray-500'
                              }`}
                            >
                              {formatTime(message.timestamp)}
                              {message.senderType === 'patient' && (
                                <span className="mr-2">
                                  {message.read ? 'تم القراءة' : 'تم الإرسال'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      placeholder="اكتب رسالتك هنا..."
                      className="flex-1 border border-gray-300 rounded-r-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    <button
                      className="bg-primary-600 text-white px-4 py-2 rounded-l-md hover:bg-primary-700 transition-colors"
                      onClick={handleSendMessage}
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <MessageCircle className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  لم يتم تحديد محادثة
                </h3>                <p className="text-gray-500 max-w-md">
                  {!user?.doctorId ? 
                    'لم يتم تعيين طبيب لك بعد. يرجى التواصل مع الإدارة لتعيين طبيب معالج.' :
                    'اختر محادثة من القائمة أو ابدأ محادثة جديدة مع طبيبك المعالج'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PatientConsultations;