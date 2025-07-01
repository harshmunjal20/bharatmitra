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

export const useSpeechRecognition = (lang: 'en' | 'hi') => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const listeningIntentRef = useRef(false);
  const finalTranscriptRef = useRef('');
  const isStartingRef = useRef(false);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!SpeechRecognitionAPI) {
      console.warn('Speech Recognition is not supported in this browser.');
      setError('Speech Recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognitionRef.current = recognition;
    recognition.continuous = false; 
    recognition.interimResults = true;
    recognition.lang = lang === 'en' ? 'en-IN' : 'hi-IN';
    
    recognition.onstart = () => {
      console.log('Speech recognition started');
      setIsListening(true);
      setError(null);
      isStartingRef.current = false;
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = finalTranscriptRef.current;
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
          finalTranscriptRef.current = finalTranscript;
        } else {
          interimTranscript += transcript;
        }
      }
      
      setTranscript(finalTranscript + interimTranscript);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
      setIsListening(false);
      
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
      
      if (listeningIntentRef.current && !isStartingRef.current) {
        restartTimeoutRef.current = setTimeout(() => {
          if (listeningIntentRef.current && recognitionRef.current && !isStartingRef.current) {
            try {
              isStartingRef.current = true;
              recognitionRef.current.start();
            } catch (err) {
              console.error("Failed to restart speech recognition:", err);
              listeningIntentRef.current = false;
              setIsListening(false);
              isStartingRef.current = false;
            }
          }
        }, 100); 
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.log('Speech recognition error:', event.error);
      
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
      
      isStartingRef.current = false;
      
      if (event.error === 'no-speech') {
        setError(null);
        return;
      }
      
      if (event.error === 'aborted') {
        setError(null);
        listeningIntentRef.current = false;
        setIsListening(false);
        return;
      }
      
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setError('Microphone permission denied. Please allow microphone access.');
        listeningIntentRef.current = false;
        setIsListening(false);
        return;
      }
      
      setError(`Recognition error: ${event.error}`);
    };

    return () => {
      listeningIntentRef.current = false;
      isStartingRef.current = false;
      
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
      
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onstart = null;
      }
    };
  }, [lang]);
  
  const startListening = useCallback(() => {
    if (!recognitionRef.current || isStartingRef.current) {
      console.log('Cannot start: recognition not available or already starting');
      return;
    }
    
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    setError(null);
    setTranscript('');
    finalTranscriptRef.current = '';
    
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
    
    listeningIntentRef.current = true;
    isStartingRef.current = true;
    
    try {
      recognitionRef.current.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      isStartingRef.current = false;
      setError('Failed to start speech recognition');
    }
  }, []);

  const stopListening = useCallback(() => {
    console.log('Stopping speech recognition');
    listeningIntentRef.current = false;
    isStartingRef.current = false;
    
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    setIsListening(false);
  }, []);

  return { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    error 
  };
};
