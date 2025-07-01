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
  autoPlayEnabled: boolean; // Added this missing property
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
  const voicesLoadedRef = useRef(false);

  const getFemaleVoice = useCallback((lang: 'en' | 'hi') => {
    console.log(`🔍 Looking for ${lang} female voice from ${voices.length} available voices`);
    
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
      console.log('⚠️ No specific female voices found, trying fallback');
      const femaleVoices = voices.filter(voice => {
        const name = voice.name.toLowerCase();
        return (
          !name.includes('male') && 
          !name.includes('man') &&
          (lang === 'hi' ? voice.lang.startsWith('hi') || voice.lang.startsWith('en-') : voice.lang.startsWith('en-'))
        );
      });
      const fallbackVoice = femaleVoices[0] || voices[0] || null;
      console.log('🔄 Using fallback voice:', fallbackVoice?.name);
      return fallbackVoice;
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

    const selectedVoice = preferredVoice || availableVoices[0] || null;
    console.log('✅ Selected voice:', selectedVoice?.name, selectedVoice?.lang);
    return selectedVoice;
  }, [voices]);

  useEffect(() => {
    const loadVoices = () => {
      const loadedVoices = window.speechSynthesis.getVoices();
      console.log('🎤 Voices loaded:', loadedVoices.length);
      setVoices(loadedVoices);
      if (loadedVoices.length > 0) {
        voicesLoadedRef.current = true;
      }
    };
    
    // Initial load
    loadVoices();
    
    // Set up event listener for voice changes
    const handleVoicesChanged = () => {
      console.log('🔄 Voices changed event triggered');
      loadVoices();
    };
    
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    }
    
    // Fallback: Try loading voices after a delay
    setTimeout(loadVoices, 100);
    setTimeout(loadVoices, 500);
    
    return () => {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  const detectLanguage = useCallback((text: string): 'en' | 'hi' => {
    const hindiPattern = /[\u0900-\u097F]/;
    const hindiCharCount = (text.match(/[\u0900-\u097F]/g) || []).length;
    const totalChars = text.replace(/\s/g, '').length;
    
    const detectedLang = hindiCharCount / totalChars > 0.2 ? 'hi' : 'en';
    console.log(`🔤 Language detection: ${detectedLang} (Hindi chars: ${hindiCharCount}/${totalChars})`);
    return detectedLang;
  }, []);

  const stopSpeech = useCallback(() => {
    console.log('🛑 Stopping speech');
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
    console.log('🎵 togglePlayPause called:', {
      textLength: text.length,
      id,
      contextLang,
      isProcessing: isProcessingRef.current,
      currentActiveId: activeUtteranceId,
      isSpeaking,
      isPaused,
      voicesLoaded: voicesLoadedRef.current,
      availableVoices: voices.length
    });

    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      console.error('❌ Speech synthesis not supported');
      alert('Speech synthesis not supported in your browser');
      return;
    }

    if (isProcessingRef.current) {
      console.log('⏳ Already processing, skipping');
      return;
    }
    
    isProcessingRef.current = true;
    const synth = window.speechSynthesis;
    const isThisMessageActive = id === activeUtteranceId;

    try {
      // Handle pause/resume for currently active message
      if (synth.speaking && isThisMessageActive && utteranceRef.current) {
        console.log('🎛️ Handling pause/resume for active message');
        if (synth.paused) {
          console.log('▶️ Resuming speech');
          synth.resume();
          setIsPaused(false);
        } else {
          console.log('⏸️ Pausing speech');
          synth.pause();
          setIsPaused(true);
        }
        isProcessingRef.current = false;
        return;
      }

      // Stop any current speech
      if (synth.speaking || synth.pending) {
        console.log('🛑 Stopping current speech');
        synth.cancel();
      }

      if (!text.trim()) {
        console.log('❌ Empty text, not speaking');
        isProcessingRef.current = false;
        return;
      }

      // Wait for voices if not loaded
      if (!voicesLoadedRef.current && voices.length === 0) {
        console.log('⏳ Waiting for voices to load...');
        isProcessingRef.current = false;
        setTimeout(() => togglePlayPause(text, id, contextLang), 200);
        return;
      }

      console.log('🎤 Creating new utterance');
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
        console.log('⚠️ No voice selected, using default with lang:', utterance.lang);
      }
      
      utterance.rate = 0.9; 
      utterance.pitch = 1.1;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        console.log('🎵 Speech started');
        setIsSpeaking(true);
        setIsPaused(false);
        setActiveUtteranceId(id);
        isProcessingRef.current = false;
      };
      
      utterance.onpause = () => {
        console.log('⏸️ Speech paused');
        setIsPaused(true);
      };
      
      utterance.onresume = () => {
        console.log('▶️ Speech resumed');
        setIsPaused(false);
      };
      
      utterance.onend = () => {
        console.log('🏁 Speech ended');
        setIsSpeaking(false);
        setIsPaused(false);
        setActiveUtteranceId(null);
        utteranceRef.current = null;
        isProcessingRef.current = false;
      };
      
      utterance.onerror = (e) => {
        console.error("❌ SpeechSynthesis Error:", e.error, e);
        setIsSpeaking(false);
        setIsPaused(false);
        setActiveUtteranceId(null);
        utteranceRef.current = null;
        isProcessingRef.current = false;
      };
      
      // Start speaking immediately instead of using setTimeout
      console.log('🚀 Starting speech synthesis');
      synth.speak(utterance);

    } catch (error) {
      console.error('❌ Error in togglePlayPause:', error);
      isProcessingRef.current = false;
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveUtteranceId(null);
    }
  }, [activeUtteranceId, getFemaleVoice, detectLanguage, voices.length, isSpeaking, isPaused]);
  
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
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
