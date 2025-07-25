import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useChatbotResponses } from '../hooks/useDatabase';
import { useLanguage } from '../contexts/LanguageContext';

const Chatbot = () => {
  const { language } = useLanguage();
  const { responses } = useChatbotResponses();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: language === 'ar' ? 
        "مرحباً! أنا هنا لمساعدتك بمعلومات حول خدماتنا في الاستشارات الفنية والقانونية المتخصصة في الحماية المدنية والأدلة الجنائية. كيف يمكنني مساعدتك اليوم؟" :
        "Hello! I'm here to help you with information about our specialized technical and legal consulting services in civil protection and forensic evidence. How can I assist you today?", 
      sender: 'bot' 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const findResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    return responses.find(response => 
      response.trigger_keywords.some(keyword => 
        lowerMessage.includes(keyword.toLowerCase())
      )
    );
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user' as const
      };
      
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const matchedResponse = findResponse(inputMessage);
        const responseText = matchedResponse ? 
          matchedResponse.response_text :
          (language === 'ar' ? 
            "شكراً لك على رسالتك. سيقوم أحد المختصين بمراجعة استفسارك والعودة إليك قريباً. للمساعدة الفورية، يرجى الاتصال بنا على +966 XX XXX XXXX." :
            "Thank you for your message. A specialist will review your inquiry and get back to you shortly. For immediate assistance, please call us at +966 XX XXX XXXX."
          );

        const botResponse = {
          id: messages.length + 2,
          text: responseText,
          sender: 'bot' as const
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col border border-gray-200">
          <div className="bg-blue-800 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat Support</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-blue-800 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-800 text-white px-3 py-2 rounded-lg hover:bg-blue-900 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-800 text-white p-3 rounded-full shadow-lg hover:bg-blue-900 transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Chatbot;