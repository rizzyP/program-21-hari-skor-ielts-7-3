
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
    cleanupAudio,
    audioError
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

  // Simulate examiner speaking but don't auto-play audio
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

        // For manual playback only - don't automatically play or move to next phase
      }, 300);
    },
    [setIsRecording]
  );

  // Handle manual audio playback
  const playExaminerAudio = useCallback(async (src: string) => {
    try {
      console.log('Playing audio:', src);
      await playAudio(src);
      
      // Monitor when audio completes and move to next phase
      const audio = new Audio(src);
      audio.addEventListener('ended', () => {
        console.log('Audio completed:', src);
        setExaminerSpeaking(false);
        
        // Enable recording if needed - only after part 1 questions
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
    getCurrentSrc,
    audioError
  };
};
