import { useState, useEffect, useRef, useCallback } from 'react';

interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
}

type SpeechRecognitionErrorCode =
  | 'no-speech'
  | 'aborted'
  | 'audio-capture'
  | 'network'
  | 'not-allowed'
  | 'service-not-allowed'
  | 'bad-grammar'
  | 'language-not-supported';

interface SpeechRecognitionErrorEvent extends Event {
    readonly error: SpeechRecognitionErrorCode;
    readonly message: string;
}

interface SpeechRecognitionStatic {
    new(): SpeechRecognition;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    start(): void;
    stop(): void;
}

declare global {
    interface Window {
        SpeechRecognition: SpeechRecognitionStatic;
        webkitSpeechRecognition: SpeechRecognitionStatic;
    }
}

const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

export const useSpeechRecognition = (lang: 'en' | 'hi', onTranscriptComplete?: (transcript: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isStartingRef = useRef(false);
  const lastProcessedLengthRef = useRef(0);

  const clearInactivityTimeout = useCallback(() => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
      inactivityTimeoutRef.current = null;
    }
  }, []);

  const setInactivityTimeout = useCallback(() => {
    clearInactivityTimeout();
    inactivityTimeoutRef.current = setTimeout(() => {
      stopListening();
    }, 2000);
  }, [clearInactivityTimeout]);

  const stopListening = useCallback(() => {
    clearInactivityTimeout();
    isStartingRef.current = false;
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error('Error stopping recognition:', err);
      }
    }
    
    setIsListening(false);
  }, [clearInactivityTimeout]);

  useEffect(() => {
    if (!SpeechRecognitionAPI) {
      setError('Speech Recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = lang === 'en' ? 'en-IN' : 'hi-IN';
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      isStartingRef.current = false;
      lastProcessedLengthRef.current = 0;
      setInactivityTimeout();
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript) {
        setTranscript(finalTranscript.trim());
        clearInactivityTimeout();
        if (onTranscriptComplete) {
          onTranscriptComplete(finalTranscript.trim());
        }
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      clearInactivityTimeout();
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      clearInactivityTimeout();
      isStartingRef.current = false;
      
      if (event.error === 'no-speech') {
        setError(null);
      } else if (event.error === 'aborted') {
        setError(null);
        setIsListening(false);
      } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setError('Microphone permission denied. Please allow microphone access.');
        setIsListening(false);
      } else {
        setError(`Recognition error: ${event.error}`);
        setIsListening(false);
      }
    };

    return () => {
      clearInactivityTimeout();
      isStartingRef.current = false;
      
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onstart = null;
      }
    };
  }, [lang, setInactivityTimeout, clearInactivityTimeout, onTranscriptComplete]);
  
  const startListening = useCallback(() => {
    if (!recognitionRef.current || isStartingRef.current || isListening) {
      return;
    }
    
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    setError(null);
    setTranscript('');
    lastProcessedLengthRef.current = 0;
    
    isStartingRef.current = true;
    
    try {
      recognitionRef.current.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      isStartingRef.current = false;
      setError('Failed to start speech recognition');
    }
  }, [isListening]);

  return { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    error 
  };
};
