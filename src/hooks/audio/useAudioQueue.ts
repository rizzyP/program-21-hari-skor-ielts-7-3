
import { useRef, useCallback } from 'react';
import { AudioWithDelay } from './types';

export const useAudioQueue = (
  audioRef: React.MutableRefObject<HTMLAudioElement | null>,
  setIsPlaying: (isPlaying: boolean) => void,
  setAudioError: (error: string | null) => void,
  hasUserInteracted: boolean
) => {
  const audioQueueRef = useRef<AudioWithDelay[]>([]);
  const isProcessingQueueRef = useRef<boolean>(false);
  
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
      if (!audioRef.current) return;
      
      const audio = audioRef.current;
      
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
  }, [audioRef, processNextInQueue, hasUserInteracted, setAudioError, setIsPlaying]);

  // Queue and play a sequence of audio files with delays
  const queueAudioWithDelays = useCallback((audioSequence: AudioWithDelay[]) => {
    if (audioSequence.length === 0) return Promise.resolve();
    
    // Add all to queue
    audioQueueRef.current = [...audioSequence];
    
    // Start processing if not already
    if (!isProcessingQueueRef.current) {
      isProcessingQueueRef.current = true;
      
      const firstAudio = audioQueueRef.current[0];
      if (firstAudio && audioRef.current) {
        try {
          const audio = audioRef.current;
          
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
  }, [audioRef, processNextInQueue, hasUserInteracted, setAudioError, setIsPlaying]);

  // Clean up all audio resources
  const cleanupAudio = useCallback(() => {
    audioQueueRef.current = [];
    isProcessingQueueRef.current = false;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      setIsPlaying(false);
    }
  }, [audioRef, setIsPlaying]);

  return {
    processNextInQueue,
    queueAudioWithDelays,
    cleanupAudio
  };
};
