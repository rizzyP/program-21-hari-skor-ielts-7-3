
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
  const [audioCompleted, setAudioCompleted] = useState(false);
  const [audioAction, setAudioAction] = useState<string | null>(null);
  
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

  // Simulate examiner speaking - manual playback only
  const simulateExaminerSpeaking = useCallback(
    async (message: string, audioFile: string | null, duration: number = 3000, currentPhase: Phase) => {
      // Reset audio completion state
      setAudioCompleted(false);
      
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
          
          // Determine the appropriate action based on the audio file
          if (audioFile.includes('speaking-section-opening-1')) {
            setAudioAction('startPart1');
          } else if (audioFile.includes('speaking-section-1a') || 
                    audioFile.includes('speaking-section-1b') || 
                    audioFile.includes('speaking-section-1c') || 
                    audioFile.includes('speaking-section-1d')) {
            setAudioAction('startRecording');
          } else if (audioFile.includes('speaking-section-1-end')) {
            setAudioAction('startPart2');
          } else if (audioFile.includes('speaking-section-2.wav')) {
            setAudioAction('startPreparation');
          } else if (audioFile.includes('speaking-section-2-mid')) {
            setAudioAction('startLongRecording');
          } else if (audioFile.includes('speaking-section-2-end')) {
            setAudioAction('startPart3');
          } else if (audioFile.includes('speaking-section-3a') || 
                    audioFile.includes('speaking-section-3b') || 
                    audioFile.includes('speaking-section-3c')) {
            setAudioAction('startRecording');
          } else if (audioFile.includes('speaking-section-3-end')) {
            setAudioAction('endTest');
          } else {
            setAudioAction(null);
          }
        } else {
          setAudioSrc(null);
          setAudioAction(null);
        }
      }, 300);
    },
    [setIsRecording]
  );

  // Handle manual audio playback
  const playExaminerAudio = useCallback(async (src: string) => {
    try {
      await playAudio(src);
      
      // Set up the audio completion listener
      const audio = new Audio(src);
      audio.addEventListener('ended', () => {
        console.log('Audio completed:', src);
        setAudioCompleted(true);
        setExaminerSpeaking(false);
        
        // Enable recording based on the audio action
        if (audioAction === 'startRecording') {
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
  }, [playAudio, setIsRecording, audioAction]);

  // Get the audio action that should happen after audio completes
  const getAudioAction = useCallback(() => {
    const action = audioAction;
    // Clear the action after it's retrieved to avoid repeat executions
    setAudioAction(null);
    return action;
  }, [audioAction]);

  // Reset audio completion status
  const resetAudioCompleted = useCallback(() => {
    setAudioCompleted(false);
  }, []);

  return {
    examinerSpeaking,
    examinerMessage,
    fadeIn,
    audioSrc,
    audioCompleted,
    isPlayingAudio: isPlaying,
    simulateExaminerSpeaking,
    playExaminerAudio,
    pauseExaminerAudio: pauseAudio,
    cleanupExaminerTimeout,
    getCurrentSrc,
    getAudioAction,
    resetAudioCompleted,
    audioError
  };
};
