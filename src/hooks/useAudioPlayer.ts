
import { useState, useRef, useEffect, useCallback } from 'react';

interface AudioWithDelay {
  src: string;
  delayAfter?: number;
  onEnd?: () => void;
}

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioQueueRef = useRef<AudioWithDelay[]>([]);
  const isProcessingQueueRef = useRef<boolean>(false);

  // Create audio element if it doesn't exist
  const ensureAudioElement = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = 1.0; // Ensure volume is at maximum
    }
    return audioRef.current;
  }, []);

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

  // Play next audio in queue with proper promise handling
  const playNextAudio = useCallback((src: string) => {
    try {
      const audio = ensureAudioElement();
      
      // Reset audio element before setting new source
      audio.pause();
      audio.currentTime = 0;
      setAudioError(null);
      
      // Set source and load
      audio.src = src;
      audio.load();
      
      // Check if user has interacted with the page
      if (!hasUserInteracted) {
        console.warn('Audio playback attempted before user interaction. Autoplay may not work.');
      }
      
      // Create a promise to better handle the play() method
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(e => {
            console.error('Failed to play audio:', e);
            setAudioError('Audio playback failed. User interaction may be required before audio can play.');
            
            // Continue to next audio if this one fails
            processNextInQueue();
          });
      }
    } catch (error) {
      console.error('Error in playNextAudio:', error);
      setAudioError('Error preparing audio playback.');
      processNextInQueue(); // Continue to next audio even if this one fails
    }
  }, [ensureAudioElement, processNextInQueue, hasUserInteracted]);

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
          
          // Reset audio element
          audio.pause();
          audio.currentTime = 0;
          setAudioError(null);
          
          // Set source and load
          audio.src = firstAudio.src;
          audio.load();
          
          // Check if user has interacted with the page
          if (!hasUserInteracted) {
            console.warn('Audio playback attempted before user interaction. Autoplay may not work.');
            // Notify caller that user interaction might be required
            return Promise.reject(new Error('User interaction required before audio can play automatically.'));
          }
          
          // Create a promise to handle playback properly
          const playPromise = audio.play();
          
          if (playPromise !== undefined) {
            return playPromise
              .then(() => {
                setIsPlaying(true);
                return Promise.resolve();
              })
              .catch(e => {
                console.error('Failed to start audio sequence:', e);
                setAudioError('Audio playback failed. User interaction may be required.');
                isProcessingQueueRef.current = false;
                processNextInQueue();
                return Promise.reject(e);
              });
          }
        } catch (error) {
          console.error('Error starting audio sequence:', error);
          setAudioError('Error preparing audio playback.');
          isProcessingQueueRef.current = false;
          processNextInQueue();
          return Promise.reject(error);
        }
      }
    }
    
    return Promise.resolve();
  }, [ensureAudioElement, processNextInQueue, hasUserInteracted]);

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
      
      // Check if user has interacted with the page
      if (!hasUserInteracted) {
        console.warn('Audio playback attempted before user interaction. Autoplay may not work.');
        setAudioError('User interaction required before audio can play automatically.');
        return Promise.reject(new Error('User interaction required'));
      }
      
      // Use play() with promise handling as shown in the example
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        return playPromise
          .then(() => {
            setIsPlaying(true);
            return true;
          })
          .catch(error => {
            console.error('Failed to play audio:', error);
            setAudioError('Audio playback failed. Please interact with the page first.');
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
  }, [ensureAudioElement, hasUserInteracted]);

  // Clean up all audio resources
  const cleanupAudio = useCallback(() => {
    audioQueueRef.current = [];
    isProcessingQueueRef.current = false;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      setIsPlaying(false);
    }
  }, []);

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
      setAudioError('Audio error occurred. Please check audio files and browser permissions.');
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
      }
      audioQueueRef.current = [];
      isProcessingQueueRef.current = false;
    };
  }, [ensureAudioElement, processNextInQueue]);

  // Simulate a user interaction to try to unlock audio playback
  const simulateUserInteraction = useCallback(() => {
    setHasUserInteracted(true);
    // Try to unlock audio context if available
    const audio = ensureAudioElement();
    const context = window.AudioContext || (window as any).webkitAudioContext;
    if (context) {
      const audioContext = new context();
      audioContext.resume().then(() => {
        console.log('AudioContext unlocked');
      });
    }
    
    // Try to play and immediately pause to unlock audio
    try {
      audio.volume = 0; // Silent
      audio.play().then(() => {
        setTimeout(() => {
          audio.pause();
          audio.volume = 1.0; // Reset volume
        }, 1);
      }).catch(e => {
        // Expected error, browser still requires real user interaction
        console.log('Manual unlock still required:', e);
      });
    } catch (error) {
      console.error('Error during audio unlock attempt:', error);
    }
  }, [ensureAudioElement]);

  return {
    isPlaying,
    isReady,
    hasUserInteracted,
    audioError,
    playAudio,
    queueAudioWithDelays,
    stopAudio: cleanupAudio,
    pauseAudio: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    },
    simulateUserInteraction,
    cleanupAudio
  };
};
