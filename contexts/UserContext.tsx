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
  autoPlayEnabled: boolean;
  setAutoPlayEnabled: (enabled: boolean) => void;
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
  autoPlayEnabled: false,
  setAutoPlayEnabled: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId] = useState<string>(generateUserId());
  const [tokenBalance, setTokenBalance] = useState<number>(100);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [autoPlayEnabled, setAutoPlayEnabled] = useState<boolean>(false);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeUtteranceId, setActiveUtteranceId] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const isProcessingRef = useRef(false);

  const getFemaleVoice = useCallback((lang: 'en' | 'hi') => {
    const availableVoices = voices.filter(voice => {
      const name = voice.name.toLowerCase();
      const voiceLang = voice.lang.toLowerCase();
      
      const isFemale = (
        name.includes('female') || 
        name.includes('woman') || 
        name.includes('girl') ||
        (!name.includes('male') && !name.includes('man'))
      );
      
      if (lang === 'hi') {
        return (
          isFemale && (
            voiceLang.startsWith('hi') || 
            voiceLang === 'en-in' ||
            name.includes('indian')
          )
        );
      } else {
        return (
          isFemale && (
            voiceLang === 'en-in' || 
            voiceLang.startsWith('en-') ||
            name.includes('indian')
          )
        );
      }
    });

    if (availableVoices.length === 0) {
      const femaleVoices = voices.filter(voice => {
        const name = voice.name.toLowerCase();
        return (
          !name.includes('male') && 
          !name.includes('man') &&
          (lang === 'hi' ? voice.lang.startsWith('hi') || voice.lang.startsWith('en-') : voice.lang.startsWith('en-'))
        );
      });
      return femaleVoices[0] || null;
    }

    const preferredVoice = availableVoices.find(voice => {
      const name = voice.name.toLowerCase();
      return (
        name.includes('google') || 
        name.includes('microsoft') || 
        name.includes('premium') ||
        name.includes('neural')
      );
    });

    return preferredVoice || availableVoices[0] || null;
  }, [voices]);

  useEffect(() => {
    const loadVoices = () => {
      const loadedVoices = window.speechSynthesis.getVoices();
      setVoices(loadedVoices);
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
        window.speechSynthesis.onvoiceschanged = null;
        window.speechSynthesis.cancel();
    };
  }, []);

  const detectLanguage = useCallback((text: string): 'en' | 'hi' => {
    const hindiPattern = /[\u0900-\u097F]/;
    const hindiCharCount = (text.match(/[\u0900-\u097F]/g) || []).length;
    const totalChars = text.replace(/\s/g, '').length;
    
    return hindiCharCount / totalChars > 0.2 ? 'hi' : 'en';
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

  const togglePlayPause = useCallback((text: string, id: string, contextLang: 'en' | 'hi') => {
    if (isProcessingRef.current) {
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

      if (!text.trim()) {
        isProcessingRef.current = false;
        return;
      }

      const detectedLang = detectLanguage(text);
      const voiceLang = contextLang === 'hi' ? 'hi' : detectedLang;

      const utterance = new SpeechSynthesisUtterance(text.trim());
      utteranceRef.current = utterance;

      const voice = getFemaleVoice(voiceLang);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = voiceLang === 'hi' ? 'hi-IN' : 'en-IN';
      }
      
      utterance.rate = 0.9; 
      utterance.pitch = 1.1;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
        setActiveUtteranceId(id);
        isProcessingRef.current = false;
      };
      
      utterance.onpause = () => {
        setIsPaused(true);
      };
      
      utterance.onresume = () => {
        setIsPaused(false);
      };
      
      utterance.onend = () => {
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
  }, [activeUtteranceId, getFemaleVoice, detectLanguage]);
  
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
    autoPlayEnabled,
    setAutoPlayEnabled,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
