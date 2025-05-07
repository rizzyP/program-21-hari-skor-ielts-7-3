
import { useState, useRef, useEffect } from 'react';

export const useAudioPlayback = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element with proper event listeners
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      // Set up event listeners
      audioRef.current.addEventListener('canplaythrough', () => {
        setIsReady(true);
      });
    }
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
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
      audioRef.current.addEventListener('canplaythrough', () => {
        setIsReady(true);
      });
    }
    return audioRef.current;
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
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setIsReady(false);
  };

  return {
    isPlaying,
    setIsPlaying,
    isReady,
    setIsReady,
    audioRef,
    ensureAudioElement,
    stopAudio,
    cleanupAudio
  };
};
