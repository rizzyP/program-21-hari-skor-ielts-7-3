
import { useState, useRef, useEffect } from 'react';

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioQueue = useRef<{src: string, onEnd?: () => void}[]>([]);

  // Initialize audio element with proper event listeners
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      // Set up event listeners
      audioRef.current.addEventListener('ended', handleAudioEnded);
      audioRef.current.addEventListener('canplaythrough', () => {
        setIsReady(true);
      });
    }
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleAudioEnded);
        audioRef.current.removeEventListener('canplaythrough', () => {
          setIsReady(true);
        });
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Create audio element if it doesn't exist
  const ensureAudioElement = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      // Set up event listeners
      audioRef.current.addEventListener('ended', handleAudioEnded);
      audioRef.current.addEventListener('canplaythrough', () => {
        setIsReady(true);
      });
    }
    return audioRef.current;
  };

  // Play a single audio file with user interaction handling
  const playAudio = (src: string): Promise<void> => {
    return new Promise((resolve) => {
      const audio = ensureAudioElement();
      
      // Reset state
      setIsReady(false);
      
      // Set source
      audio.src = src;
      audio.load();
      
      // Set up one-time end handler for this specific play request
      const onEndedOnce = () => {
        audio.removeEventListener('ended', onEndedOnce);
        resolve();
      };
      
      audio.addEventListener('ended', onEndedOnce);
      
      // Play once ready
      const playWhenReady = () => {
        setIsPlaying(true);
        
        // Try to play with retry logic for autoplay restrictions
        const attemptPlay = () => {
          audio.play().catch(error => {
            console.error('Error playing audio:', error);
            
            // If it's an autoplay restriction, we'll show a toast and retry
            if (error.name === 'NotAllowedError') {
              // We'll handle this in the component
              setIsPlaying(false);
            } else {
              setIsPlaying(false);
            }
            
            resolve(); // Resolve anyway to prevent hanging
          });
        };
        
        attemptPlay();
      };
      
      // Play when canplaythrough event fires or immediately if already loaded
      if (audio.readyState >= 3) { // HAVE_FUTURE_DATA or HAVE_ENOUGH_DATA
        playWhenReady();
      } else {
        audio.addEventListener('canplaythrough', playWhenReady, { once: true });
      }
    });
  };

  // Force play - to be used after user interaction
  const forcePlayAudio = (): Promise<void> => {
    return new Promise((resolve) => {
      if (!audioRef.current || !audioRef.current.src) {
        resolve();
        return;
      }
      
      setIsPlaying(true);
      audioRef.current.play()
        .then(() => resolve())
        .catch(error => {
          console.error('Force play error:', error);
          setIsPlaying(false);
          resolve();
        });
    });
  };

  // Handle audio ended event
  const handleAudioEnded = () => {
    setIsPlaying(false);
    
    // Play next in queue if available
    if (audioQueue.current.length > 0) {
      const nextAudio = audioQueue.current.shift();
      if (nextAudio) {
        const audio = ensureAudioElement();
        audio.src = nextAudio.src;
        setIsPlaying(true);
        audio.play().catch(error => {
          console.error('Error playing queued audio:', error);
          setIsPlaying(false);
          if (nextAudio.onEnd) nextAudio.onEnd();
        });
      }
    }
  };

  // Queue multiple audio files with delays
  const queueAudioWithDelays = (
    audioSequence: {src: string, delayAfter?: number, onEnd?: () => void}[]
  ) => {
    let currentPromise = Promise.resolve();
    
    audioSequence.forEach(item => {
      // Queue playing the audio
      currentPromise = currentPromise.then(() => playAudio(item.src));
      
      // Queue the delay if specified
      if (item.delayAfter && item.delayAfter > 0) {
        currentPromise = currentPromise.then(() => 
          new Promise(resolve => setTimeout(resolve, item.delayAfter))
        );
      }
      
      // Execute callback if provided
      if (item.onEnd) {
        currentPromise = currentPromise.then(() => {
          item.onEnd?.();
        });
      }
    });
    
    return currentPromise;
  };

  // Stop audio playback
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };
  
  // Clean up function
  const cleanupAudio = () => {
    if (audioRef.current) {
      audioRef.current.removeEventListener('ended', handleAudioEnded);
      audioRef.current.pause();
      audioRef.current = null;
    }
    audioQueue.current = [];
    setIsPlaying(false);
    setIsReady(false);
  };

  return {
    isPlaying,
    isReady,
    playAudio,
    forcePlayAudio,
    queueAudioWithDelays,
    stopAudio,
    cleanupAudio,
    audioRef
  };
};
