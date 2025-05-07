
import { useCallback } from 'react';

interface UseAudioOperationsProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  setIsPlaying: (value: boolean) => void;
  setIsReady: (value: boolean) => void;
  ensureAudioElement: () => HTMLAudioElement;
}

export const useAudioOperations = ({
  audioRef,
  setIsPlaying,
  setIsReady,
  ensureAudioElement
}: UseAudioOperationsProps) => {
  
  // Play a single audio file with user interaction handling
  const playAudio = useCallback((src: string): Promise<void> => {
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
  }, [ensureAudioElement, setIsPlaying, setIsReady]);

  // Force play - to be used after user interaction
  const forcePlayAudio = useCallback((): Promise<void> => {
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
  }, [audioRef, setIsPlaying]);

  return {
    playAudio,
    forcePlayAudio
  };
};
