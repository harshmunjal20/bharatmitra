import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { ChatMessage as ChatMessageType, MessageSender } from '../types';
import { getSchemeAdvice } from '../services/geminiService';
import ChatMessage from '../components/ChatMessage';
import { MicIcon } from '../components/icons/MicIcon';
import { SendIcon } from '../components/icons/SendIcon';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { UserContext } from '../contexts/UserContext';

const ChatPage: React.FC = () => {
  const { addTokens, language, stopSpeech } = useContext(UserContext);
  
  const getInitialMessage = (lang: 'en' | 'hi') => ({
    id: new Date().toISOString() + Math.random(),
    sender: MessageSender.AI,
    text: lang === 'hi'
      ? 'नमस्ते! मैं भारत मित्र हूँ। आज मैं आपकी मदद कैसे कर सकता हूँ? मुझसे किसी भी सरकारी योजना के बारे में पूछें।'
      : 'Namaste! I am Bharat Mitra. How can I help you today? Ask me about any government scheme.',
    timestamp: new Date().toISOString(),
  });

  const [messages, setMessages] = useState<ChatMessageType[]>([getInitialMessage(language)]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceInputActive, setIsVoiceInputActive] = useState(false);
  
  const detectInputLanguage = useCallback((text: string): 'en' | 'hi' => {
    const hindiPattern = /[\u0900-\u097F]/;
    const hindiCharCount = (text.match(/[\u0900-\u097F]/g) || []).length;
    const totalChars = text.replace(/\s/g, '').length;
    
    return hindiCharCount / totalChars > 0.2 ? 'hi' : 'en';
  }, []);

  const handleTranscriptComplete = useCallback((finalTranscript: string) => {
    console.log('Transcript completed:', finalTranscript);
    setInput(finalTranscript);
    setIsVoiceInputActive(false);
    
    setTimeout(() => {
      if (finalTranscript.trim()) {
        handleSendMessageWithText(finalTranscript.trim());
      }
    }, 500);
  }, []);

  const { transcript, isListening, startListening, stopListening, error: recognitionError } = useSpeechRecognition(
    language, 
    handleTranscriptComplete
  );
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([getInitialMessage(language)]);
  }, [language]);

  useEffect(() => {
    if (isListening && transcript && !transcript.includes('[FINAL]')) {
      setInput(transcript);
    }
  }, [transcript, isListening]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setIsVoiceInputActive(isListening);
  }, [isListening]);

  const handleSendMessageWithText = useCallback(async (messageText: string) => {
    if (messageText.trim() === '' || isLoading) return;

    stopSpeech();

    const userMessage: ChatMessageType = {
      id: new Date().toISOString() + Math.random(),
      sender: MessageSender.USER,
      text: messageText,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const inputLanguage = detectInputLanguage(messageText);
      
      const responseLanguage = language === 'hi' ? 'hi' : inputLanguage;
      
      console.log(`User input language: ${inputLanguage}, App language: ${language}, Response language: ${responseLanguage}`);

      const aiResponseText = await getSchemeAdvice(messageText, responseLanguage);

      const aiMessage: ChatMessageType = {
        id: new Date().toISOString() + Math.random(),
        sender: MessageSender.AI,
        text: aiResponseText, 
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessageText = language === 'hi' 
        ? 'माफ़ करें, कुछ त्रुटि हुई है। कृपया फिर से कोशिश करें।'
        : 'Sorry, I encountered an error. Please try again.';
      
      const errorMessage: ChatMessageType = {
        id: new Date().toISOString() + Math.random(),
        sender: MessageSender.AI,
        text: errorMessageText,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, addTokens, language, detectInputLanguage, stopSpeech]);
  
  const handleSendMessage = useCallback(async () => {
    await handleSendMessageWithText(input);
  }, [input, handleSendMessageWithText]);

  const handleMicClick = useCallback(() => {
    if (isVoiceInputActive || isListening) {
      stopListening();
      setIsVoiceInputActive(false);
    } else {
      stopSpeech();
      
      setInput('');
      setIsVoiceInputActive(true);
      startListening();
    }
  }, [isVoiceInputActive, isListening, startListening, stopListening, stopSpeech]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isVoiceInputActive) {
      stopListening();
      setIsVoiceInputActive(false);
    }
    setInput(e.target.value);
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-3xl mx-auto bg-white rounded-xl shadow-2xl border border-gray-200">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold text-bharat-blue-900">
          Chat with Bharat Mitra
          {language === 'en' && (
            <span className="text-sm font-normal text-gray-600 ml-2">
              (Smart Language Detection)
            </span>
          )}
        </h2>
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
        {recognitionError && (
            <div className="text-center text-red-600 bg-red-100 p-2 rounded-md mb-2 text-sm">
                {recognitionError}
            </div>
        )}
        {isVoiceInputActive && (
          <div className="text-center text-blue-600 bg-blue-50 p-2 rounded-md mb-2 text-sm animate-pulse">
            🎤 {language === 'hi' ? 'सुन रहा हूँ...' : 'Listening...'} 
            <span className="text-xs text-gray-500 ml-2">
              {language === 'hi' ? '(3 सेकंड निष्क्रियता के बाद स्वतः भेजा जाएगा)' : '(Auto-send after 3 seconds of silence)'}
            </span>
          </div>
        )}
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleMicClick}
            className={`flex-shrink-0 p-3 rounded-full transition-all duration-200 ${
              isVoiceInputActive 
                ? 'bg-red-500 text-white animate-pulse shadow-lg scale-110' 
                : 'bg-bharat-blue-100 text-bharat-blue-700 hover:bg-bharat-blue-200 hover:scale-105'
            }`}
            aria-label={isVoiceInputActive ? 'Stop recording' : 'Start recording'}
            title={isVoiceInputActive ? 'Click to stop recording' : 'Click to start voice input'}
          >
            <MicIcon className="h-6 w-6" />
          </button>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && !isVoiceInputActive && handleSendMessage()}
            placeholder={
              isVoiceInputActive 
                ? (language === 'hi' ? "सुन रहा हूँ..." : "Listening...") 
                : (language === 'hi' ? "यहाँ अपना प्रश्न लिखें..." : "Type your question here...")
            }
            className={`flex-grow w-full px-4 py-3 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-bharat-blue-500 transition ${
              isVoiceInputActive ? 'bg-blue-50 border-blue-300' : ''
            }`}
            disabled={isLoading}
            readOnly={isVoiceInputActive}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || input.trim() === '' || isVoiceInputActive}
            className="flex-shrink-0 bg-bharat-blue-700 text-white p-3 rounded-full hover:bg-bharat-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-110 disabled:scale-100"
            aria-label="Send message"
            title={isVoiceInputActive ? "Voice input active - message will auto-send" : "Send message"}
          >
            <SendIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
