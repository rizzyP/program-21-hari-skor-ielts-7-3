
import { useRef, useCallback } from 'react';

interface UseAudioQueueProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  setIsPlaying: (value: boolean) => void;
  ensureAudioElement: () => HTMLAudioElement;
  playAudio: (src: string) => Promise<void>;
}

export const useAudioQueue = ({
  audioRef,
  setIsPlaying,
  ensureAudioElement,
  playAudio
}: UseAudioQueueProps) => {
  const audioQueue = useRef<{src: string, onEnd?: () => void}[]>([]);

  // Handle audio ended event
  const handleAudioEnded = useCallback(() => {
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
  }, [ensureAudioElement, setIsPlaying]);

  // Setup event listener for audio ended
  const setupAudioEndedListener = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      // Remove any existing listener to prevent duplicates
      audio.removeEventListener('ended', handleAudioEnded);
      // Add the listener
      audio.addEventListener('ended', handleAudioEnded);
    }
    
    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, [audioRef, handleAudioEnded]);

  // Queue multiple audio files with delays
  const queueAudioWithDelays = useCallback(
    (audioSequence: {src: string, delayAfter?: number, onEnd?: () => void}[]) => {
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
    },
    [playAudio]
  );

  return {
    audioQueue,
    handleAudioEnded,
    setupAudioEndedListener,
    queueAudioWithDelays
  };
};
