
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
      audioRef.current.volume = 1.0; // Ensure volume is at maximum
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

  // Play next audio in queue with proper promise handling
  const playNextAudio = useCallback((src: string) => {
    try {
      const audio = ensureAudioElement();
      
      // Reset audio element before setting new source
      audio.pause();
      audio.currentTime = 0;
      
      // Set source and load
      audio.src = src;
      audio.load();
      
      // Create a promise to better handle the play() method
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(e => {
            console.error('Failed to play audio:', e);
            // Continue to next audio if this one fails
            processNextInQueue();
          });
      }
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
          
          // Reset audio element
          audio.pause();
          audio.currentTime = 0;
          
          // Set source and load
          audio.src = firstAudio.src;
          audio.load();
          
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
                isProcessingQueueRef.current = false;
                processNextInQueue();
                return Promise.reject(e);
              });
          }
        } catch (error) {
          console.error('Error starting audio sequence:', error);
          isProcessingQueueRef.current = false;
          processNextInQueue();
          return Promise.reject(error);
        }
      }
    }
    
    return Promise.resolve();
  }, [ensureAudioElement, processNextInQueue]);

  // Regular play function with proper promise handling
  const playAudio = useCallback(async (src?: string) => {
    try {
      const audio = ensureAudioElement();
      
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
            setIsPlaying(false);
            return Promise.reject(error);
          });
      }
      
      return Promise.resolve(true);
    } catch (error) {
      console.error('Error in playAudio:', error);
      setIsPlaying(false);
      return Promise.reject(error);
    }
  }, [ensureAudioElement]);

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

  return {
    isPlaying,
    isReady,
    playAudio,
    queueAudioWithDelays,
    stopAudio: cleanupAudio,
    pauseAudio: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    },
    cleanupAudio
  };
};
