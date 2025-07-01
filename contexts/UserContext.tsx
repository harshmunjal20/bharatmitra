import React, { createContext, useState, ReactNode, useCallback, useEffect, useRef } from 'react';

const generateUserId = () => `user_${Math.random().toString(36).substr(2, 9)}`;

interface UserContextType {
  userId: string;
  tokenBalance: number;
  addTokens: (amount: number) => void;
  deductTokens: (amount: number) => boolean;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  togglePlayPause: (text: string, id: string, lang: 'en' | 'hi') => void;
  stopSpeech: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  activeUtteranceId: string | null;
}

export const UserContext = createContext<UserContextType>({
  userId: '',
  tokenBalance: 0,
  addTokens: () => {},
  deductTokens: () => false,
  language: 'en',
  setLanguage: () => {},
  togglePlayPause: () => {},
  stopSpeech: () => {},
  isSpeaking: false,
  isPaused: false,
  activeUtteranceId: null,
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId] = useState<string>(generateUserId());
  const [tokenBalance, setTokenBalance] = useState<number>(100);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeUtteranceId, setActiveUtteranceId] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const isProcessingRef = useRef(false);

  const englishVoice = voices.find(v => v.lang === 'en-IN' && v.name.includes('Female')) || 
                     voices.find(v => v.name === 'Google UK English Female') || 
                     voices.find(v => v.lang.startsWith('en-'));
  const hindiVoice = voices.find(v => v.lang === 'hi-IN' && v.name.includes('Female')) || 
                    voices.find(v => v.lang === 'hi-IN');

  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
        window.speechSynthesis.onvoiceschanged = null;
        window.speechSynthesis.cancel();
    };
  }, []);

  const cleanTextForTTS = useCallback((text: string): string => {
    const phrasesToRemove = [
      /here\s+is\s+your\s+answer[:\s]*/gi,
      /here's\s+your\s+answer[:\s]*/gi,
      /your\s+answer\s+is[:\s]*/gi,
      /the\s+answer\s+is[:\s]*/gi,
      
      /hello[,\s]*i\s+am\s+bharat\s+mitra[,\s]*/gi,
      /hi[,\s]*i'm\s+bharat\s+mitra[,\s]*/gi,
      /greetings[,\s]*i\s+am\s+bharat\s+mitra[,\s]*/gi,
      /namaste[,\s]*i\s+am\s+bharat\s+mitra[,\s]*/gi,
      /i\s+am\s+bharat\s+mitra[,\s]*/gi,
      
      /\*\*[^*]*\*\*/g, 
      /\*[^*]*\*/g,     
      /#{1,6}\s/g,      
      /```[\s\S]*?```/g, 
      /`[^`]*`/g,       
      /\[[^\]]*\]\([^)]*\)/g, 
      
      /let\s+me\s+help\s+you[,\s]*/gi,
      /sure[,\s]*here\s+is[,\s]*/gi,
      /of\s+course[,\s]*/gi,
    ];

    let cleanedText = text;
    
    phrasesToRemove.forEach(pattern => {
      cleanedText = cleanedText.replace(pattern, '');
    });

    cleanedText = cleanedText
      .replace(/\s+/g, ' ')  
      .replace(/^\s*[,.\-:;]\s*/, '')
      .replace(/\s*[,.\-:;]\s*$/, '') 
      .trim();

    return cleanedText;
  }, []);

  const stopSpeech = useCallback(() => {
    const synth = window.speechSynthesis;
    if (synth.speaking || synth.pending) {
      synth.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setActiveUtteranceId(null);
    utteranceRef.current = null;
    isProcessingRef.current = false;
  }, []);

  const togglePlayPause = useCallback((text: string, id: string, lang: 'en' | 'hi') => {
    if (isProcessingRef.current) {
      console.log('Already processing, ignoring call');
      return;
    }
    
    isProcessingRef.current = true;
    const synth = window.speechSynthesis;
    const isThisMessageActive = id === activeUtteranceId;

    try {
      if (synth.speaking && isThisMessageActive && utteranceRef.current) {
        if (synth.paused) {
          synth.resume();
          setIsPaused(false);
        } else {
          synth.pause();
          setIsPaused(true);
        }
        isProcessingRef.current = false;
        return;
      }

      if (synth.speaking || synth.pending) {
        synth.cancel();
      }

      const cleanedText = cleanTextForTTS(text);
      
      if (!cleanedText.trim()) {
        console.warn('No content to speak after cleaning');
        isProcessingRef.current = false;
        return;
      }

      console.log('Speaking cleaned text:', cleanedText.substring(0, 100) + '...');

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utteranceRef.current = utterance;

      const voice = lang === 'hi' ? hindiVoice : englishVoice;
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      }
      
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        console.log('Speech started for:', id);
        setIsSpeaking(true);
        setIsPaused(false);
        setActiveUtteranceId(id);
        isProcessingRef.current = false;
      };
      
      utterance.onpause = () => {
        console.log('Speech paused');
        setIsPaused(true);
      };
      
      utterance.onresume = () => {
        console.log('Speech resumed');
        setIsPaused(false);
      };
      
      utterance.onend = () => {
        console.log('Speech ended for:', id);
        setIsSpeaking(false);
        setIsPaused(false);
        setActiveUtteranceId(null);
        utteranceRef.current = null;
        isProcessingRef.current = false;
      };
      
      utterance.onerror = (e) => {
        console.error("SpeechSynthesis Error:", e);
        setIsSpeaking(false);
        setIsPaused(false);
        setActiveUtteranceId(null);
        utteranceRef.current = null;
        isProcessingRef.current = false;
      };
      
      setTimeout(() => {
        if (utteranceRef.current === utterance && !synth.speaking) {
          synth.speak(utterance);
        } else {
          isProcessingRef.current = false;
        }
      }, 100);

    } catch (error) {
      console.error('Error in togglePlayPause:', error);
      isProcessingRef.current = false;
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveUtteranceId(null);
    }
  }, [activeUtteranceId, hindiVoice, englishVoice, cleanTextForTTS]);
  
  useEffect(() => {
    stopSpeech();
  }, [language, stopSpeech]);

  const addTokens = (amount: number) => {
    setTokenBalance(prevBalance => prevBalance + amount);
  };

  const deductTokens = (amount: number): boolean => {
    if (tokenBalance >= amount) {
      setTokenBalance(prevBalance => prevBalance - amount);
      return true;
    }
    return false;
  };

  const value = {
    userId,
    tokenBalance,
    addTokens,
    deductTokens,
    language,
    setLanguage,
    togglePlayPause,
    stopSpeech,
    isSpeaking,
    isPaused,
    activeUtteranceId,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
