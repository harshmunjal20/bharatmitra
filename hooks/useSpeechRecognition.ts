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
    maxAlternatives: number;
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const stopListening = useCallback(() => {
    isStartingRef.current = false;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
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
    recognition.continuous = false; // Changed to false for better control
    recognition.interimResults = true;
    recognition.lang = lang === 'en' ? 'en-IN' : 'hi-IN';
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      console.log('Speech recognition started');
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
        console.log('Final transcript:', finalTranscript.trim());
        onTranscriptComplete(finalTranscript.trim());
        // Stop listening after getting final result
        setIsEnabled(false);
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
      setIsListening(false);
      
      // If still enabled and no final transcript received, restart
      if (isEnabled && !isStartingRef.current && transcript.trim() === '') {
        timeoutRef.current = setTimeout(() => {
          if (isEnabled && recognitionRef.current && !isStartingRef.current) {
            try {
              console.log('Restarting speech recognition');
              isStartingRef.current = true;
              recognitionRef.current.start();
            } catch (err) {
              console.error('Failed to restart recognition:', err);
              isStartingRef.current = false;
              setError('Failed to restart recognition');
            }
          }
        }, 500);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error, event.message);
      isStartingRef.current = false;
      
      if (event.error === 'no-speech') {
        setError('No speech detected. Please try speaking again.');
        // Don't disable, just stop current session
        setIsListening(false);
      } else if (event.error === 'aborted') {
        setError(null);
        setIsListening(false);
      } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setError('Microphone permission denied. Please allow microphone access and try again.');
        setIsListening(false);
        setIsEnabled(false);
      } else if (event.error === 'network') {
        setError('Network error. Please check your internet connection.');
        setIsListening(false);
      } else {
        setError(`Recognition error: ${event.error}`);
        setIsListening(false);
      }
    };

    return () => {
      isStartingRef.current = false;
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onstart = null;
      }
    };
  }, [lang, onTranscriptComplete, isEnabled, transcript]);
  
  const toggleVoiceInput = useCallback(() => {
    console.log('Toggle voice input called, current isEnabled:', isEnabled);
    
    if (!recognitionRef.current) {
      setError('Speech Recognition is not available.');
      return;
    }
    
    // Stop any ongoing speech synthesis
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    if (isEnabled) {
      console.log('Disabling voice input');
      setIsEnabled(false);
      stopListening();
      setTranscript('');
    } else {
      console.log('Enabling voice input');
      setIsEnabled(true);
      setError(null);
      setTranscript('');
      
      // Request microphone permission and start recognition
      if (!isStartingRef.current && !isListening) {
        isStartingRef.current = true;
        
        try {
          console.log('Starting speech recognition');
          recognitionRef.current.start();
        } catch (err) {
          console.error('Failed to start speech recognition:', err);
          isStartingRef.current = false;
          setError('Failed to start speech recognition. Please try again.');
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
