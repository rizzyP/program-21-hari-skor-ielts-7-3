
import { useRef, useCallback } from 'react';
import { createAudioElement } from './audioUtils';
import { useAudioInteraction } from './useAudioInteraction';
import { useAudioEvents } from './useAudioEvents';
import { useAudioQueue } from './useAudioQueue';
import { AudioWithDelay, UseAudioPlayerReturn } from './types';

export const useAudioPlayer = (): UseAudioPlayerReturn => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Ensure audio element exists
  const ensureAudioElement = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = createAudioElement();
      audioRef.current.volume = 1.0;
    }
    return audioRef.current;
  }, []);

  // Initialize audio element
  ensureAudioElement();

  // Set up audio interaction detection
  const {
    hasUserInteracted,
    audioError,
    setAudioError,
    simulateUserInteraction
  } = useAudioInteraction(audioRef);

  // Initialize processNextInQueue as a function to avoid the forward reference issue
  // We'll properly assign it after setting up audio queue
  const processNextInQueueRef = useRef<() => void>(() => {});
  
  // Set up audio events handling using the reference to processNextInQueue
  const { isPlaying, isReady, setIsPlaying } = useAudioEvents(
    audioRef.current,
    () => processNextInQueueRef.current()
  );

  // Set up audio queue processing
  const {
    processNextInQueue,
    queueAudioWithDelays,
    cleanupAudio
  } = useAudioQueue(audioRef, setIsPlaying, setAudioError, hasUserInteracted);
  
  // Now assign the real function to our reference
  processNextInQueueRef.current = processNextInQueue;

  // Regular play function with proper promise handling
  const playAudio = useCallback(async (src?: string) => {
    try {
      const audio = ensureAudioElement();
      setAudioError(null);
      
      if (src) {
        // Reset audio element
        audio.pause();
        audio.currentTime = 0;
        
        // Set source and load
        audio.src = src;
        audio.load();
      }
      
      if (!audio.src) {
        return Promise.reject(new Error("No audio source set"));
      }
      
      // Use play() with promise handling
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        return playPromise
          .then(() => {
            setIsPlaying(true);
            return true;
          })
          .catch(error => {
            console.error('Failed to play audio:', error);
            setAudioError('Audio playback failed.');
            setIsPlaying(false);
            return Promise.reject(error);
          });
      }
      
      return Promise.resolve(true);
    } catch (error) {
      console.error('Error in playAudio:', error);
      setAudioError('Error preparing audio playback.');
      setIsPlaying(false);
      return Promise.reject(error);
    }
  }, [ensureAudioElement, setAudioError, setIsPlaying]);

  // Pause audio playback
  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [setIsPlaying]);

  // Get current audio source
  const getCurrentSrc = useCallback(() => {
    return audioRef.current?.src || '';
  }, []);

  return {
    isPlaying,
    isReady,
    hasUserInteracted,
    audioError,
    playAudio,
    queueAudioWithDelays,
    stopAudio: cleanupAudio,
    pauseAudio,
    simulateUserInteraction,
    cleanupAudio,
    getCurrentSrc
  };
};
