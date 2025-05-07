
import { useState, useRef } from 'react';
import { Phase } from '@/components/test/TestPhases';
import { useAudioPlayer } from './useAudioPlayer';

export const useExaminerSimulation = (setIsRecording: (value: boolean) => void) => {
  const [examinerSpeaking, setExaminerSpeaking] = useState(false);
  const [examinerMessage, setExaminerMessage] = useState("");
  const examinerAudioTimeout = useRef<NodeJS.Timeout | null>(null);
  const { isPlaying, playAudio, queueAudioWithDelays, stopAudio, cleanupAudio } = useAudioPlayer();

  // Simulate examiner speech with audio
  const simulateExaminerSpeaking = async (
    message: string, 
    audioFile: string | null, 
    duration: number, 
    currentPhase: Phase
  ) => {
    setExaminerMessage(message);
    setExaminerSpeaking(true);
    
    // Clear any existing timeout
    if (examinerAudioTimeout.current) {
      clearTimeout(examinerAudioTimeout.current);
    }
    
    // Play audio if provided
    if (audioFile) {
      try {
        await playAudio(audioFile);
        
        // Add a small delay after audio finishes to make the transition smooth
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error('Error playing audio file:', error);
      }
    }
    
    // Set timeout for when examiner finishes speaking
    examinerAudioTimeout.current = setTimeout(() => {
      setExaminerSpeaking(false);
    }, duration);
  };

  // Play a sequence of audio files with delays
  const playExaminerAudioSequence = async (
    audioSequence: {
      src: string, 
      message: string,
      delayAfter?: number,
      onEnd?: () => void
    }[]
  ): Promise<void> => {
    // Format the sequence for the audio player
    const formattedSequence = audioSequence.map(item => ({
      src: item.src,
      delayAfter: item.delayAfter || 0,
      onEnd: () => {
        setExaminerMessage(item.message);
        if (item.onEnd) item.onEnd();
      }
    }));
    
    setExaminerSpeaking(true);
    
    // Set initial message
    if (audioSequence.length > 0) {
      setExaminerMessage(audioSequence[0].message);
    }
    
    try {
      await queueAudioWithDelays(formattedSequence);
    } finally {
      setExaminerSpeaking(false);
    }
  };

  // Clean up timeout when component unmounts
  const cleanupExaminerTimeout = () => {
    if (examinerAudioTimeout.current) {
      clearTimeout(examinerAudioTimeout.current);
    }
    cleanupAudio();
  };

  return {
    examinerSpeaking: examinerSpeaking || isPlaying,
    examinerMessage,
    simulateExaminerSpeaking,
    playExaminerAudioSequence,
    cleanupExaminerTimeout
  };
};
