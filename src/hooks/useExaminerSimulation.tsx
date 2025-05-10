
import { useCallback, useRef, useState } from 'react';
import { Phase } from '@/components/test/TestPhases';
import { useAudioPlayer } from '@/hooks/audio';
import { toast } from 'sonner';

export const useExaminerSimulation = (
  setIsRecording: (isRecording: boolean) => void
) => {
  const [examinerSpeaking, setExaminerSpeaking] = useState(false);
  const [examinerMessage, setExaminerMessage] = useState('');
  const [fadeIn, setFadeIn] = useState(true);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  
  const { 
    playAudio,
    isPlaying,
    pauseAudio,
    getCurrentSrc,
    cleanupAudio
  } = useAudioPlayer();
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timeout to prevent memory leaks
  const cleanupExaminerTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    cleanupAudio();
  }, [cleanupAudio]);

  // Simulate examiner speaking with audio that can be manually played
  const simulateExaminerSpeaking = useCallback(
    async (message: string, audioFile: string | null, duration: number = 3000, currentPhase: Phase) => {
      // Set examiner state
      setFadeIn(false);
      
      // Short timeout for fade out/in effect
      timeoutRef.current = setTimeout(() => {
        setExaminerMessage(message);
        setExaminerSpeaking(true);
        setFadeIn(true);
        
        // Set the audio source for manual playback
        if (audioFile) {
          setAudioSrc(audioFile);
        }

        // No automatic playback, just set up for manual play
        // After a duration, move to the next phase if no audio playback
        if (!audioFile) {
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
    [setIsRecording]
  );

  // Handle manual audio playback
  const playExaminerAudio = useCallback(async (src: string) => {
    try {
      await playAudio(src);
      
      // Once audio has completed, move to next phase
      const audio = new Audio(src);
      audio.addEventListener('ended', () => {
        setExaminerSpeaking(false);
        // Enable recording if needed
        if (audioSrc && audioSrc.includes('speaking-section-1')) {
          setIsRecording(true);
        }
      });
      
      return true;
    } catch (error) {
      console.error('Error playing examiner audio:', error);
      toast.error('Audio playback failed', {
        description: 'Please try again'
      });
      return false;
    }
  }, [playAudio, setIsRecording, audioSrc]);

  return {
    examinerSpeaking,
    examinerMessage,
    fadeIn,
    audioSrc,
    isPlayingAudio: isPlaying,
    simulateExaminerSpeaking,
    playExaminerAudio,
    pauseExaminerAudio: pauseAudio,
    cleanupExaminerTimeout,
    getCurrentSrc
  };
};
