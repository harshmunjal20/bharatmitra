import React, { createContext, useState, ReactNode, useCallback, useEffect, useRef } from 'react';

// A simple function to generate a mock user ID
const generateUserId = () => `user_${Math.random().toString(36).substr(2, 9)}`;

interface UserContextType {
  userId: string;
  tokenBalance: number;
  addTokens: (amount: number) => void;
  deductTokens: (amount: number) => boolean;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  // TTS Controls
  togglePlayPause: (text: string, id: string, lang: 'en' | 'hi') => void;
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

  // --- TTS State and Logic ---
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeUtteranceId, setActiveUtteranceId] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const englishVoice = voices.find(v => v.lang === 'en-IN' && v.name.includes('Female')) || voices.find(v => v.name === 'Google UK English Female') || voices.find(v => v.lang.startsWith('en-'));
  const hindiVoice = voices.find(v => v.lang === 'hi-IN' && v.name.includes('Female')) || voices.find(v => v.lang === 'hi-IN');

  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
        window.speechSynthesis.onvoiceschanged = null;
        window.speechSynthesis.cancel();
    };
  }, []);

  const togglePlayPause = useCallback((text: string, id: string, lang: 'en' | 'hi') => {
      const synth = window.speechSynthesis;
      const isThisMessageActive = id === activeUtteranceId;

      if (synth.speaking && isThisMessageActive) {
          if (synth.paused) {
              synth.resume();
          } else {
              synth.pause();
          }
      } else {
          synth.cancel();

          const utterance = new SpeechSynthesisUtterance(text);
          utteranceRef.current = utterance;

          const voice = lang === 'hi' ? hindiVoice : englishVoice;
          if (voice) {
              utterance.voice = voice;
              utterance.lang = voice.lang;
          }
          utterance.rate = 0.95;
          utterance.pitch = 1;

          utterance.onstart = () => {
              setIsSpeaking(true);
              setIsPaused(false);
              setActiveUtteranceId(id);
          };
          utterance.onpause = () => setIsPaused(true);
          utterance.onresume = () => setIsPaused(false);
          utterance.onend = () => {
              setIsSpeaking(false);
              setIsPaused(false);
              setActiveUtteranceId(null);
              utteranceRef.current = null;
          };
          utterance.onerror = (e) => {
              console.error("SpeechSynthesis Error", e);
              setIsSpeaking(false);
              setIsPaused(false);
              setActiveUtteranceId(null);
          };
          
          synth.speak(utterance);
      }
  }, [activeUtteranceId, hindiVoice, englishVoice]);
  
  // Stop speech when language changes
  useEffect(() => {
      window.speechSynthesis.cancel();
  }, [language]);


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