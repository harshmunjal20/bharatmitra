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
    // More comprehensive cleaning patterns
    const phrasesToRemove = [
      // Common AI response prefixes
      /here\s+is\s+your\s+answer[:\s]*/gi,
      /here's\s+your\s+answer[:\s]*/gi,
      /your\s+answer\s+is[:\s]*/gi,
      /the\s+answer\s+is[:\s]*/gi,
      /here\s+is\s+the\s+answer\s+to\s+your\s+question[:\s.]*/gi,
      
      // Bot introductions and greetings
      /hello[,\s]*i\s+am\s+bharat\s+mitra[,\s.]*/gi,
      /hi[,\s]*i'm\s+bharat\s+mitra[,\s.]*/gi,
      /greetings[,\s]*i\s+am\s+bharat\s+mitra[,\s.]*/gi,
      /namaste[,\s]*i\s+am\s+bharat\s+mitra[,\s.]*/gi,
      /i\s+am\s+bharat\s+mitra[,\s.]*/gi,
      /namaste[,\s]+i\s+am\s+bharat\s+mitra[,\s.]*/gi,
      
      // Thank you and acknowledgment phrases
      /thank\s+you\s+for\s+asking[,\s.]*/gi,
      /thank\s+you\s+for\s+your\s+question[,\s.]*/gi,
      /thanks\s+for\s+asking[,\s.]*/gi,
      /that's\s+a\s+great\s+question[,\s.]*/gi,
      
      // Markdown formatting
      /\*\*[^*]*\*\*/g, // Bold text
      /\*[^*]*\*/g,     // Italic text
      /#{1,6}\s/g,      // Headers
      /```[\s\S]*?```/g, // Code blocks
      /`[^`]*`/g,       // Inline code
      /\[[^\]]*\]\([^)]*\)/g, // Links
      
      // Common filler phrases
      /let\s+me\s+help\s+you[,\s.]*/gi,
      /sure[,\s]*here\s+is[,\s.]*/gi,
      /of\s+course[,\s.]*/gi,
      /absolutely[,\s.]*/gi,
      /certainly[,\s.]*/gi,
      
      // Hindi equivalents
      /धन्यवाद\s+पूछने\s+के\s+लिए[,\s.]*/gi,
      /आपका\s+स्वागत\s+है[,\s.]*/gi,
      /यहाँ\s+आपके\s+सवाल\s+का\s+जवाब\s+है[:\s.]*/gi,
      /आपके\s+प्रश्न\s+का\s+उत्तर\s+यहाँ\s+है[:\s.]*/gi,
    ];

    let cleanedText = text;
    
    // Apply all cleaning patterns
    phrasesToRemove.forEach(pattern => {
      cleanedText = cleanedText.replace(pattern, '');
    });

    // Additional cleaning
    cleanedText = cleanedText
      .replace(/\s+/g, ' ')  // Multiple spaces to single space
      .replace(/^\s*[,.\-:;।]\s*/, '') // Remove leading punctuation (including Hindi danda)
      .replace(/\s*[,.\-:;।]\s*$/, '') // Remove trailing punctuation
      .replace(/^[.\s]+/, '') // Remove leading dots and spaces
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
    // Prevent multiple simultaneous calls
    if (isProcessingRef.current) {
      console.log('Already processing, ignoring call');
      return;
    }
    
    isProcessingRef.current = true;
    const synth = window.speechSynthesis;
    const isThisMessageActive = id === activeUtteranceId;

    try {
      // If currently speaking this message, toggle pause/resume
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

      // Stop any current speech before starting new one
      if (synth.speaking || synth.pending) {
        synth.cancel();
      }

      // Clean the text thoroughly
      const cleanedText = cleanTextForTTS(text);
      
      if (!cleanedText.trim()) {
        console.warn('No content to speak after cleaning');
        isProcessingRef.current = false;
        return;
      }

      console.log('Speaking cleaned text:', cleanedText.substring(0, 100) + '...');

      // Create new utterance
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utteranceRef.current = utterance;

      // Set voice based on language
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

      // Set up event handlers
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
      
      // Small delay to ensure clean state before speaking
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
  
  // Stop speech when language changes
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
