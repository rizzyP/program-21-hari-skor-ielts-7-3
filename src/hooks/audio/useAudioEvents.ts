
import { useState, useEffect } from 'react';

export const useAudioEvents = (
  audioElement: HTMLAudioElement | null,
  onEnded: () => void
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!audioElement) return;

    // Setup event listeners
    const onCanPlaythrough = () => setIsReady(true);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = (e: Event) => {
      console.error('Audio playback error:', e);
      setIsPlaying(false);
      onEnded(); // Process next in queue even on error
    };
    
    audioElement.addEventListener('canplaythrough', onCanPlaythrough);
    audioElement.addEventListener('play', onPlay);
    audioElement.addEventListener('pause', onPause);
    audioElement.addEventListener('ended', onEnded);
    audioElement.addEventListener('error', onError);
    
    // Clean up on unmount
    return () => {
      audioElement.removeEventListener('canplaythrough', onCanPlaythrough);
      audioElement.removeEventListener('play', onPlay);
      audioElement.removeEventListener('pause', onPause);
      audioElement.removeEventListener('ended', onEnded);
      audioElement.removeEventListener('error', onError);
    };
  }, [audioElement, onEnded]);

  return { isPlaying, isReady, setIsPlaying };
};
