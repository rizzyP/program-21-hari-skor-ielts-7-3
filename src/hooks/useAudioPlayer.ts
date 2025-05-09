
import { useState, useRef, useEffect, useCallback } from 'react';

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element if it doesn't exist
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();

      // Set up event listeners
      audioRef.current.addEventListener('canplaythrough', () => setIsReady(true));
      audioRef.current.addEventListener('play', () => setIsPlaying(true));
      audioRef.current.addEventListener('pause', () => setIsPlaying(false));
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        setIsPlaying(false);
      });
    }

    return () => {
      // Clean up event listeners on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('canplaythrough', () => setIsReady(true));
        audioRef.current.removeEventListener('play', () => setIsPlaying(true));
        audioRef.current.removeEventListener('pause', () => setIsPlaying(false));
        audioRef.current.removeEventListener('ended', () => setIsPlaying(false));
        audioRef.current.removeEventListener('error', () => setIsPlaying(false));
      }
    };
  }, []);

  // Regular play function that might fail due to autoplay restrictions
  const playAudio = useCallback(async (src?: string) => {
    if (audioRef.current) {
      try {
        if (src) {
          audioRef.current.src = src;
          audioRef.current.load();
          setIsReady(false);
          await new Promise(resolve => {
            if (audioRef.current) {
              audioRef.current.oncanplaythrough = resolve;
            }
          });
        }
        
        await audioRef.current.play();
        setIsPlaying(true);
        return true;
      } catch (error) {
        console.error('Failed to play audio:', error);
        setIsPlaying(false);
        return false;
      }
    }
    return false;
  }, []);

  // Force play after user interaction
  const forcePlayAudio = useCallback(async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        return true;
      } catch (error) {
        console.error('Forced play failed:', error);
        setIsPlaying(false);
        return false;
      }
    }
    return false;
  }, []);

  // Stop audio
  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  // Pause audio
  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  return {
    audioRef,
    isPlaying,
    isReady,
    playAudio,
    forcePlayAudio,
    stopAudio,
    pauseAudio
  };
};
