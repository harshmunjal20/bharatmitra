import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';

const generateUserId = () => `user_${Math.random().toString(36).substr(2, 9)}`;

interface UserContextType {
  userId: string;
  tokenBalance: number;
  addTokens: (amount: number) => void;
  deductTokens: (amount: number) => boolean;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
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

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeUtteranceId, setActiveUtteranceId] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load available voices (delayed for async support)
  useEffect(() => {
    const loadVoices = () => {
      setTimeout(() => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      }, 100);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
    };
  }, []);

  // Cancel ongoing speech on language change
  useEffect(() => {
    window.speechSynthesis.cancel();
  }, [language]);

  const togglePlayPause = useCallback(
    (text: string, id: string, lang: 'en' | 'hi') => {
      const synth = window.speechSynthesis;
      const isThisMessageActive = id === activeUtteranceId;

      const voice =
        voices.find(
          (v) =>
            (lang === 'hi' && v.lang === 'hi-IN' && v.name.includes('Female')) ||
            (lang === 'hi' && v.lang === 'hi-IN')
        ) ||
        voices.find(
          (v) =>
            (lang === 'en' && v.lang === 'en-IN' && v.name.includes('Female')) ||
            (lang === 'en' && v.name === 'Google UK English Female') ||
            (lang === 'en' && v.lang.startsWith('en-'))
        );

      if (!voice) {
        console.warn(`No voice found for language: ${lang}`);
      }

      if (synth.speaking && isThisMessageActive) {
        synth.paused ? synth.resume() : synth.pause();
      } else {
        synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utteranceRef.current = utterance;

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
          console.error('SpeechSynthesis Error', e);
          setIsSpeaking(false);
          setIsPaused(false);
          setActiveUtteranceId(null);
        };

        synth.speak(utterance);
      }
    },
    [activeUtteranceId, voices]
  );

  const addTokens = useCallback((amount: number) => {
    setTokenBalance((prev) => prev + amount);
  }, []);

  const deductTokens = useCallback((amount: number): boolean => {
    if (tokenBalance >= amount) {
      setTokenBalance((prev) => prev - amount);
      return true;
    }
    return false;
  }, [tokenBalance]);

  const value: UserContextType = {
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

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
