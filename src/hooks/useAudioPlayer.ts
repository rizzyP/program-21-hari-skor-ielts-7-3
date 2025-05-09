
import { useState, useRef, useEffect, useCallback } from 'react';

interface AudioWithDelay {
  src: string;
  delayAfter?: number;
  onEnd?: () => void;
}

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioQueueRef = useRef<AudioWithDelay[]>([]);
  const isProcessingQueueRef = useRef<boolean>(false);

  // Create audio element if it doesn't exist
  const ensureAudioElement = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      audioRef.current.addEventListener('canplaythrough', () => setIsReady(true));
      audioRef.current.addEventListener('play', () => setIsPlaying(true));
      audioRef.current.addEventListener('pause', () => setIsPlaying(false));
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        processNextInQueue();
      });
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio playback error:', e);
        setIsPlaying(false);
        processNextInQueue();
      });
    }
    return audioRef.current;
  }, []);

  // Process next item in queue
  const processNextInQueue = useCallback(() => {
    if (isProcessingQueueRef.current && audioQueueRef.current.length > 0) {
      const nextAudio = audioQueueRef.current.shift();
      
      if (nextAudio) {
        // Execute onEnd callback from the previous audio if it exists
        if (nextAudio.onEnd) {
          nextAudio.onEnd();
        }
        
        // If there's a delay specified, wait before playing the next audio
        if (nextAudio.delayAfter && nextAudio.delayAfter > 0) {
          setTimeout(() => {
            // Play the next audio if there is one
            if (audioQueueRef.current.length > 0) {
              const newAudio = audioQueueRef.current[0];
              if (newAudio) playNextAudio(newAudio.src);
            } else {
              // Queue is empty, stop processing
              isProcessingQueueRef.current = false;
            }
          }, nextAudio.delayAfter);
        } else {
          // Play the next audio if there is one
          if (audioQueueRef.current.length > 0) {
            const newAudio = audioQueueRef.current[0];
            if (newAudio) playNextAudio(newAudio.src);
          } else {
            // Queue is empty, stop processing
            isProcessingQueueRef.current = false;
          }
        }
      }
    }
  }, []);

  // Play next audio in queue
  const playNextAudio = useCallback((src: string) => {
    try {
      const audio = ensureAudioElement();
      audio.src = src;
      audio.load();
      
      // Use a promise to handle play() better
      audio.play().catch(e => {
        console.error('Failed to play audio:', e);
        processNextInQueue(); // Continue to next audio even if this one fails
      });
    } catch (error) {
      console.error('Error in playNextAudio:', error);
      processNextInQueue(); // Continue to next audio even if this one fails
    }
  }, [ensureAudioElement, processNextInQueue]);

  // Queue and play a sequence of audio files with delays
  const queueAudioWithDelays = useCallback((audioSequence: AudioWithDelay[]) => {
    if (audioSequence.length === 0) return Promise.resolve();
    
    // Add all to queue
    audioQueueRef.current = [...audioSequence];
    
    // Start processing if not already
    if (!isProcessingQueueRef.current) {
      isProcessingQueueRef.current = true;
      
      const firstAudio = audioQueueRef.current[0];
      if (firstAudio) {
        try {
          const audio = ensureAudioElement();
          audio.src = firstAudio.src;
          audio.load();
          
          audio.play().catch(e => {
            console.error('Failed to start audio sequence:', e);
            isProcessingQueueRef.current = false;
            processNextInQueue(); // Try next audio in queue
          });
        } catch (error) {
          console.error('Error starting audio sequence:', error);
          isProcessingQueueRef.current = false;
          processNextInQueue();
        }
      }
    }
    
    // Return a promise that resolves when the queue is empty
    return new Promise<void>((resolve) => {
      const checkQueueInterval = setInterval(() => {
        if (!isProcessingQueueRef.current) {
          clearInterval(checkQueueInterval);
          resolve();
        }
      }, 200);
    });
  }, [ensureAudioElement, processNextInQueue]);

  // Regular play function with better error handling
  const playAudio = useCallback(async (src?: string) => {
    try {
      const audio = ensureAudioElement();
      
      if (src) {
        audio.src = src;
        audio.load();
      }
      
      if (!audio.src) {
        return false; // No source to play
      }
      
      await audio.play().catch(error => {
        console.error('Play audio failed:', error);
        throw error; // Re-throw to be caught by the outer try/catch
      });
      
      setIsPlaying(true);
      return true;
    } catch (error) {
      console.error('Failed to play audio:', error);
      setIsPlaying(false);
      return false;
    }
  }, [ensureAudioElement]);

  // Force play after user interaction
  const forcePlayAudio = useCallback(async () => {
    try {
      const audio = ensureAudioElement();
      if (!audio.src) return false;
      
      await audio.play();
      setIsPlaying(true);
      return true;
    } catch (error) {
      console.error('Forced play failed:', error);
      setIsPlaying(false);
      return false;
    }
  }, [ensureAudioElement]);

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

  // Clear queue and stop playing
  const clearAudioQueue = useCallback(() => {
    audioQueueRef.current = [];
    isProcessingQueueRef.current = false;
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Clean up all audio resources
  const cleanupAudio = useCallback(() => {
    clearAudioQueue();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current.load(); // Load empty source
      setIsPlaying(false);
    }
  }, [clearAudioQueue]);

  // Initialize event listeners
  useEffect(() => {
    const audio = ensureAudioElement();
    
    // Setup event listeners
    const onCanPlaythrough = () => setIsReady(true);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      processNextInQueue();
    };
    const onError = (e: Event) => {
      console.error('Audio playback error:', e);
      setIsPlaying(false);
      processNextInQueue();
    };
    
    audio.addEventListener('canplaythrough', onCanPlaythrough);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    
    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplaythrough', onCanPlaythrough);
        audioRef.current.removeEventListener('play', onPlay);
        audioRef.current.removeEventListener('pause', onPause);
        audioRef.current.removeEventListener('ended', onEnded);
        audioRef.current.removeEventListener('error', onError);
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current.load(); // Load empty source
      }
      clearAudioQueue();
    };
  }, [ensureAudioElement, processNextInQueue, clearAudioQueue]);

  return {
    audioRef,
    isPlaying,
    isReady,
    playAudio,
    queueAudioWithDelays,
    forcePlayAudio,
    stopAudio,
    pauseAudio,
    clearAudioQueue,
    cleanupAudio
  };
};
