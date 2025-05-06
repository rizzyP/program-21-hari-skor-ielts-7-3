
import { useState, useRef } from 'react';

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioQueue = useRef<{src: string, onEnd?: () => void}[]>([]);

  // Create audio element if it doesn't exist
  const ensureAudioElement = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      // Set up event listeners
      audioRef.current.addEventListener('ended', handleAudioEnded);
    }
    return audioRef.current;
  };

  // Play a single audio file
  const playAudio = (src: string): Promise<void> => {
    return new Promise((resolve) => {
      const audio = ensureAudioElement();
      audio.src = src;
      setIsPlaying(true);
      
      const onEndedOnce = () => {
        audio.removeEventListener('ended', onEndedOnce);
        resolve();
      };
      
      audio.addEventListener('ended', onEndedOnce);
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
        resolve(); // Resolve anyway to prevent hanging
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
  };

  return {
    isPlaying,
    playAudio,
    queueAudioWithDelays,
    stopAudio,
    cleanupAudio
  };
};
