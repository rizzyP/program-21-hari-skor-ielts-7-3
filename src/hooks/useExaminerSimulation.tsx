
import { useCallback, useRef, useState } from 'react';
import { Phase } from '@/components/test/TestPhases';
import { useAudioPlayer } from './useAudioPlayer';

export const useExaminerSimulation = (
  setIsRecording: (isRecording: boolean) => void
) => {
  const [examinerSpeaking, setExaminerSpeaking] = useState(false);
  const [examinerMessage, setExaminerMessage] = useState('');
  const [fadeIn, setFadeIn] = useState(true);
  const { queueAudioWithDelays, cleanupAudio } = useAudioPlayer();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timeout to prevent memory leaks
  const cleanupExaminerTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    cleanupAudio();
  }, [cleanupAudio]);

  // Check if audio file exists before playing
  const checkAudioExists = useCallback(async (src: string): Promise<boolean> => {
    try {
      const response = await fetch(src, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error(`Error checking audio file ${src}:`, error);
      return false;
    }
  }, []);

  // Simulate examiner speaking with audio
  const simulateExaminerSpeaking = useCallback(
    async (message: string, audioFile: string | null, duration: number = 3000, currentPhase: Phase) => {
      // Set examiner state
      setFadeIn(false);
      
      // Short timeout for fade out/in effect
      timeoutRef.current = setTimeout(async () => {
        setExaminerMessage(message);
        setExaminerSpeaking(true);
        setFadeIn(true);
        
        // Check if audio file exists and is accessible
        let audioExists = false;
        if (audioFile) {
          audioExists = await checkAudioExists(audioFile);
          if (!audioExists) {
            console.warn(`Audio file not found: ${audioFile}, using timeout instead`);
          }
        }

        // If audio file provided and exists, play it
        if (audioFile && audioExists) {
          try {
            // Queue the audio with proper promise handling
            queueAudioWithDelays([
              {
                src: audioFile,
                onEnd: () => {
                  // After audio ends, set examiner to not speaking
                  // and enable recording if needed
                  setExaminerSpeaking(false);

                  // If in Part 1 of speaking, enable recording
                  if (currentPhase === Phase.SPEAKING_PART1) {
                    setIsRecording(true);
                  }
                },
              },
            ]).catch(error => {
              console.error('Audio playback error:', error);
              // Still continue with the simulation even if audio fails
              setExaminerSpeaking(false);
              
              // Enable recording if in speaking part
              if (currentPhase === Phase.SPEAKING_PART1) {
                setIsRecording(true);
              }
            });
          } catch (error) {
            console.error('Error playing examiner audio:', error);
            // Still continue with the simulation even if audio fails
            timeoutRef.current = setTimeout(() => {
              setExaminerSpeaking(false);
              
              // Enable recording if in speaking part
              if (currentPhase === Phase.SPEAKING_PART1) {
                setIsRecording(true);
              }
            }, duration);
          }
        } else {
          // No audio or audio file doesn't exist, just use timeout
          console.log('Using timeout instead of audio playback');
          timeoutRef.current = setTimeout(() => {
            setExaminerSpeaking(false);
            
            // Enable recording if in speaking part
            if (currentPhase === Phase.SPEAKING_PART1) {
              setIsRecording(true);
            }
          }, duration);
        }
      }, 300);
    },
    [checkAudioExists, queueAudioWithDelays, setIsRecording]
  );

  // Play a sequence of examiner audio files with messages
  const playExaminerAudioSequence = useCallback(
    async (audioSequence: { src: string; message: string; delayAfter?: number; onEnd?: () => void }[]) => {
      setExaminerSpeaking(true);
      
      // Check and filter out non-existent audio files
      const validatedSequence = [];
      for (const item of audioSequence) {
        const exists = await checkAudioExists(item.src);
        if (exists) {
          validatedSequence.push(item);
        } else {
          console.warn(`Audio file not found: ${item.src}`);
          // Add the item without src so the message still shows
          validatedSequence.push({...item, src: ''});
        }
      }
      
      if (validatedSequence.length === 0) {
        console.error('No valid audio files in sequence');
        setExaminerSpeaking(false);
        return;
      }
      
      // Convert audio sequence to the format needed by queueAudioWithDelays
      const formattedSequence = validatedSequence.map((item, index) => {
        // Skip empty src items
        if (!item.src) {
          // For items without audio, just show message and move on
          setExaminerMessage(item.message);
          if (item.onEnd) item.onEnd();
          return null;
        }
        
        return {
          src: item.src,
          delayAfter: item.delayAfter || 0,
          onEnd: () => {
            // Update examiner message before playing
            setExaminerMessage(item.message);
            
            // If it's the last item, stop examiner speaking
            if (index === validatedSequence.length - 1) {
              setExaminerSpeaking(false);
            }
            
            // Call original onEnd if provided
            if (item.onEnd) {
              item.onEnd();
            }
          }
        };
      }).filter(Boolean); // Remove null items
      
      try {
        // Set the initial examiner message
        if (validatedSequence.length > 0) {
          setExaminerMessage(validatedSequence[0].message);
        }
        
        // Queue and play all audio files if there are any valid ones
        if (formattedSequence.length > 0) {
          await queueAudioWithDelays(formattedSequence);
        } else {
          // No valid audio files, just end examiner speaking after a delay
          setTimeout(() => {
            setExaminerSpeaking(false);
          }, 3000);
        }
      } catch (error) {
        console.error('Error playing examiner audio sequence:', error);
        setExaminerSpeaking(false);
      }
    },
    [checkAudioExists, queueAudioWithDelays]
  );

  return {
    examinerSpeaking,
    examinerMessage,
    fadeIn,
    simulateExaminerSpeaking,
    playExaminerAudioSequence,
    cleanupExaminerTimeout,
  };
};
