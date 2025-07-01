import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { ChatMessage as ChatMessageType, MessageSender } from '../types';
import { getSchemeAdvice } from '../services/geminiService';
import ChatMessage from '../components/ChatMessage';
import { SendIcon } from '../components/icons/SendIcon';
import { UserContext } from '../contexts/UserContext';

const ChatPage: React.FC = () => {
  const { addTokens, language, togglePlayPause, autoPlayEnabled } = useContext(UserContext);

  const getInitialMessage = (lang: 'en' | 'hi') => ({
    id: new Date().toISOString() + Math.random(),
    sender: MessageSender.AI,
    text: lang === 'hi'
      ? 'नमस्ते! मैं भारत मित्र हूँ। आज मैं आपकी मदद कैसे कर सकती हूँ? मुझसे किसी भी सरकारी योजना के बारे में पूछें।'
      : 'Namaste! I am Bharat Mitra. How can I help you today? Ask me about any government scheme.',
    timestamp: new Date().toISOString(),
  });

  const [messages, setMessages] = useState<ChatMessageType[]>([getInitialMessage(language)]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const tokensAddedRef = useRef(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([getInitialMessage(language)]);
  }, [language]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const cleanAIResponse = (text: string): string => {
    const patterns = [
      /^.*?(namaste|hello|hi)[\s,:-]*/gi,
      /^.*?(i am|i'm)\s+bharat\s+mitra[\s,:-]*/gi,
      /^.*?here\s+is\s+(the\s+)?answer[\s,:-]*/gi,
      /^thanks?.*/gi,
      /^धन्यवाद.*$/gi,
      /^नमस्ते.*$/gi,
      /^मैं\s+भारत\s+मित्र.*$/gi,
    ];

    let cleaned = text;
    patterns.forEach(p => { cleaned = cleaned.replace(p, ''); });

    return cleaned.trim().replace(/\s{2,}/g, ' ');
  };

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessageType = {
      id: new Date().toISOString() + Math.random(),
      sender: MessageSender.USER,
      text: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    tokensAddedRef.current = false;

    try {
      const rawResponse = await getSchemeAdvice(input, language);
      const cleanedResponse = cleanAIResponse(rawResponse);

      const aiMessage: ChatMessageType = {
        id: new Date().toISOString() + Math.random(),
        sender: MessageSender.AI,
        text: cleanedResponse,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, aiMessage]);

      if (!tokensAddedRef.current) {
        
        tokensAddedRef.current = true;
      }

      if (autoPlayEnabled) {
        setTimeout(() => {
          togglePlayPause(cleanedResponse, aiMessage.id, language);
        }, 100);
      }
    } catch (error) {
      const fallback = language === 'hi'
        ? 'माफ़ करें, कुछ त्रुटि हुई है। कृपया फिर से कोशिश करें।'
        : 'Sorry, I encountered an error , Please try again.';
      setMessages(prev => [...prev, {
        id: new Date().toISOString() + Math.random(),
        sender: MessageSender.AI,
        text: fallback,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, language, addTokens, togglePlayPause, autoPlayEnabled]);

  return (
    <div className="min-h-screen px-4 py-8 bg-fixed bg-[url('https://www.transparenttextures.com/patterns/flowers.png')] bg-red-50 bg-blend-overlay bg-opacity-90">
      <div className="flex flex-col h-[calc(100vh-10rem)] max-w-3xl mx-auto bg-white rounded-xl shadow-2xl border border-gray-200 backdrop-blur-md">
        <div className="p-4 border-b bg-bharat-blue-50 rounded-t-xl">
          <h2 className="text-lg font-bold text-bharat-blue-900">Chat with Bharat Mitra</h2>
        </div>

        <div className="flex-grow p-6 overflow-y-auto">
          <div className="space-y-6">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        <div className="border-t-2 border-gray-200 p-4 bg-gray-50 rounded-b-xl">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your question here..."
              className="flex-grow px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-bharat-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || input.trim() === ''}
              className="flex-shrink-0 bg-bharat-blue-700 text-white p-3 rounded-full hover:bg-bharat-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform duration-200 hover:scale-110"
              aria-label="Send message"
            >
              <SendIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
