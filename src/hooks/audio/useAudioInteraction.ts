
import { useState, useEffect, useCallback } from 'react';
import { unlockAudioContext, silentPlayToUnlock } from './audioUtils';

export const useAudioInteraction = (audioRef: React.MutableRefObject<HTMLAudioElement | null>) => {
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Listen for user interaction at the document level
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasUserInteracted(true);
    };

    // These events indicate user interaction with the page
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  // Simulate a user interaction to try to unlock audio playback
  const simulateUserInteraction = useCallback(() => {
    setHasUserInteracted(true);
    
    // Try to unlock audio context if available
    unlockAudioContext();
    
    // Try to play and immediately pause to unlock audio
    if (audioRef.current) {
      silentPlayToUnlock(audioRef.current);
    }
  }, [audioRef]);
  
  return {
    hasUserInteracted,
    audioError,
    setAudioError,
    simulateUserInteraction
  };
};
