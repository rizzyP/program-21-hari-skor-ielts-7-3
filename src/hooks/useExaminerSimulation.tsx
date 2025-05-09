
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

  // Simulate examiner speaking with audio
  const simulateExaminerSpeaking = useCallback(
    (message: string, audioFile: string | null, duration: number = 3000, currentPhase: Phase) => {
      // Set examiner state
      setFadeIn(false);

      // Short timeout for fade out/in effect
      timeoutRef.current = setTimeout(() => {
        setExaminerMessage(message);
        setExaminerSpeaking(true);
        setFadeIn(true);

        // If audio file provided, play it
        if (audioFile) {
          try {
            // Queue the audio
            queueAudioWithDelays([
              {
                src: audioFile,
                onEnd: () => {
                  // After audio ends, set examiner to not speaking
                  // and enable recording if needed
                  setExaminerSpeaking(false);

                  // If in Part 1, 2 or 3 of speaking, enable recording
                  if (
                    currentPhase === Phase.SPEAKING_PART1 ||
                    currentPhase === Phase.SPEAKING_PART2 ||
                    currentPhase === Phase.SPEAKING_PART3
                  ) {
                    // Don't auto-enable recording for first question
                    setIsRecording(true);
                  }
                },
              },
            ]);
          } catch (error) {
            console.error('Error playing examiner audio:', error);
            // Still continue with the simulation even if audio fails
            timeoutRef.current = setTimeout(() => {
              setExaminerSpeaking(false);
              
              // Enable recording if in speaking part
              if (
                currentPhase === Phase.SPEAKING_PART1 ||
                currentPhase === Phase.SPEAKING_PART2 ||
                currentPhase === Phase.SPEAKING_PART3
              ) {
                setIsRecording(true);
              }
            }, duration);
          }
        } else {
          // No audio, just use timeout
          timeoutRef.current = setTimeout(() => {
            setExaminerSpeaking(false);
            
            // Enable recording if in speaking part
            if (
              currentPhase === Phase.SPEAKING_PART1 ||
              currentPhase === Phase.SPEAKING_PART2 ||
              currentPhase === Phase.SPEAKING_PART3
            ) {
              setIsRecording(true);
            }
          }, duration);
        }
      }, 300);
    },
    [queueAudioWithDelays, setIsRecording]
  );

  // Play a sequence of examiner audio files with messages
  const playExaminerAudioSequence = useCallback(
    async (audioSequence: { src: string; message: string; delayAfter?: number; onEnd?: () => void }[]) => {
      setExaminerSpeaking(true);
      
      // Convert audio sequence to the format needed by queueAudioWithDelays
      const formattedSequence = audioSequence.map((item, index) => {
        return {
          src: item.src,
          delayAfter: item.delayAfter || 0,
          onEnd: () => {
            // Update examiner message before playing
            setExaminerMessage(item.message);
            
            // If it's the last item, stop examiner speaking
            if (index === audioSequence.length - 1) {
              setExaminerSpeaking(false);
            }
            
            // Call original onEnd if provided
            if (item.onEnd) {
              item.onEnd();
            }
          }
        };
      });
      
      try {
        // Set the initial examiner message
        if (audioSequence.length > 0) {
          setExaminerMessage(audioSequence[0].message);
        }
        
        // Queue and play all audio files
        await queueAudioWithDelays(formattedSequence);
      } catch (error) {
        console.error('Error playing examiner audio sequence:', error);
        setExaminerSpeaking(false);
      }
    },
    [queueAudioWithDelays]
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
