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
  const [isEnabled, setIsEnabled] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isStartingRef = useRef(false);

  const stopListening = useCallback(() => {
    isStartingRef.current = false;
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error('Error stopping recognition:', err);
      }
    }
    
    setIsListening(false);
  }, []);

  const disableVoiceInput = useCallback(() => {
    stopListening();
    setIsEnabled(false);
  }, [stopListening]);

  useEffect(() => {
    if (!SpeechRecognitionAPI) {
      setError('Speech Recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang === 'en' ? 'en-IN' : 'hi-IN';
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      isStartingRef.current = false;
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      
      const currentTranscript = finalTranscript || interimTranscript;
      setTranscript(currentTranscript.trim());
      
      if (finalTranscript && onTranscriptComplete) {
        onTranscriptComplete(currentTranscript.trim());
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      if (isEnabled && !isStartingRef.current) {
        setTimeout(() => {
          if (isEnabled && recognitionRef.current && !isStartingRef.current) {
            try {
              isStartingRef.current = true;
              recognitionRef.current.start();
            } catch (err) {
              console.error('Failed to restart recognition:', err);
              isStartingRef.current = false;
            }
          }
        }, 100);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      isStartingRef.current = false;
      
      if (event.error === 'no-speech') {
        setError(null);
      } else if (event.error === 'aborted') {
        setError(null);
        setIsListening(false);
      } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setError('Microphone permission denied. Please allow microphone access.');
        setIsListening(false);
        setIsEnabled(false);
      } else {
        setError(`Recognition error: ${event.error}`);
        setIsListening(false);
      }
    };

    return () => {
      isStartingRef.current = false;
      
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onstart = null;
      }
    };
  }, [lang, onTranscriptComplete, isEnabled]);
  
  const toggleVoiceInput = useCallback(() => {
    if (!recognitionRef.current) {
      return;
    }
    
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    if (isEnabled) {
      setIsEnabled(false);
      stopListening();
    } else {
      setIsEnabled(true);
      setError(null);
      setTranscript('');
      
      if (!isStartingRef.current && !isListening) {
        isStartingRef.current = true;
        
        try {
          recognitionRef.current.start();
        } catch (err) {
          console.error('Failed to start speech recognition:', err);
          isStartingRef.current = false;
          setError('Failed to start speech recognition');
          setIsEnabled(false);
        }
      }
    }
  }, [isEnabled, isListening, stopListening]);

  return { 
    isListening, 
    transcript, 
    toggleVoiceInput,
    disableVoiceInput,
    isEnabled,
    error 
  };
};
