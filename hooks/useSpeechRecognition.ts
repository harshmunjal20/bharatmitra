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
  const finalTranscriptRef = useRef('');
  const isStartingRef = useRef(false);
  const lastSpeechTimeRef = useRef<number>(0);

  const clearInactivityTimeout = useCallback(() => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
      inactivityTimeoutRef.current = null;
    }
  }, []);

  const setInactivityTimeout = useCallback(() => {
  clearInactivityTimeout();
  inactivityTimeoutRef.current = setTimeout(() => {
    console.log('Inactivity timeout reached, stopping speech recognition');
    const finalText = finalTranscriptRef.current.trim();
    stopListening();
    
    if (finalText && onTranscriptComplete) {
      onTranscriptComplete(finalText);
    }
  }, 3000); 
}, [clearInactivityTimeout, onTranscriptComplete]);

  const stopListening = useCallback(() => {
    console.log('Stopping speech recognition');
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
      console.warn('Speech Recognition is not supported in this browser.');
      setError('Speech Recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognitionRef.current = recognition;
    recognition.continuous = true; 
    recognition.interimResults = true;
    recognition.lang = lang === 'en' ? 'en-IN' : 'hi-IN';
    
    recognition.onstart = () => {
      console.log('Speech recognition started');
      setIsListening(true);
      setError(null);
      isStartingRef.current = false;
      lastSpeechTimeRef.current = Date.now();
      setInactivityTimeout(); 
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = finalTranscriptRef.current;
      let hasNewSpeech = false;
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
          finalTranscriptRef.current = finalTranscript;
          hasNewSpeech = true;
        } else {
          interimTranscript += transcript;
          if (transcript.trim()) {
            hasNewSpeech = true;
          }
        }
      }
      
      if (hasNewSpeech) {
        lastSpeechTimeRef.current = Date.now();
        setInactivityTimeout();
      }
      
      setTranscript(finalTranscript + interimTranscript);
    };

    recognition.onend = () => {
  console.log('Speech recognition ended');
  setIsListening(false);
  clearInactivityTimeout();
  
  const finalText = finalTranscriptRef.current.trim();
  if (finalText && onTranscriptComplete) {
    setTimeout(() => {
      onTranscriptComplete(finalText);
    }, 100);
  }
};

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.log('Speech recognition error:', event.error);
      clearInactivityTimeout();
      isStartingRef.current = false;
      
      if (event.error === 'no-speech') {
        setError(null);
        return;
      }
      
      if (event.error === 'aborted') {
        setError(null);
        setIsListening(false);
        return;
      }
      
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setError('Microphone permission denied. Please allow microphone access.');
        setIsListening(false);
        return;
      }
      
      setError(`Recognition error: ${event.error}`);
      setIsListening(false);
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
      console.log('Cannot start: recognition not available, already starting, or already listening');
      return;
    }
    
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    setError(null);
    setTranscript('');
    finalTranscriptRef.current = '';
    
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
