
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

  // Initialize audio element if it doesn't exist
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();

      // Set up event listeners
      audioRef.current.addEventListener('canplaythrough', () => setIsReady(true));
      audioRef.current.addEventListener('play', () => setIsPlaying(true));
      audioRef.current.addEventListener('pause', () => setIsPlaying(false));
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        processNextInQueue();
      });
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        setIsPlaying(false);
        processNextInQueue();
      });
    }

    return () => {
      cleanupAudio();
    };
  }, []);

  // Process next item in queue
  const processNextInQueue = useCallback(async () => {
    if (isProcessingQueueRef.current && audioQueueRef.current.length > 0) {
      const nextAudio = audioQueueRef.current.shift();
      
      if (nextAudio) {
        // Execute onEnd callback from the previous audio if it exists
        if (nextAudio.onEnd) {
          nextAudio.onEnd();
        }
        
        // If there's a delay specified, wait before playing the next audio
        if (nextAudio.delayAfter && nextAudio.delayAfter > 0) {
          await new Promise(resolve => setTimeout(resolve, nextAudio.delayAfter));
        }
        
        // Play the next audio if there is one
        if (audioQueueRef.current.length > 0) {
          const newAudio = audioQueueRef.current[0];
          if (audioRef.current && newAudio) {
            audioRef.current.src = newAudio.src;
            audioRef.current.load();
            await audioRef.current.play().catch(e => console.error('Failed to play next in queue:', e));
          }
        } else {
          // Queue is empty, stop processing
          isProcessingQueueRef.current = false;
        }
      }
    }
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

  // Queue and play a sequence of audio files with delays
  const queueAudioWithDelays = useCallback(async (audioSequence: AudioWithDelay[]) => {
    if (audioSequence.length === 0) return;
    
    // Add all to queue
    audioQueueRef.current = [...audioSequence];
    
    // Start processing if not already
    if (!isProcessingQueueRef.current) {
      isProcessingQueueRef.current = true;
      
      const firstAudio = audioQueueRef.current[0];
      if (audioRef.current && firstAudio) {
        audioRef.current.src = firstAudio.src;
        audioRef.current.load();
        try {
          await audioRef.current.play();
        } catch (error) {
          console.error('Failed to start audio sequence:', error);
          isProcessingQueueRef.current = false;
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
      setIsPlaying(false);
    }
  }, [clearAudioQueue]);

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
