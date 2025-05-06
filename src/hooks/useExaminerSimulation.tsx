
import { useState, useRef } from 'react';
import { Phase } from '@/components/test/TestPhases';

export const useExaminerSimulation = (setIsRecording: (value: boolean) => void) => {
  const [examinerSpeaking, setExaminerSpeaking] = useState(false);
  const [examinerMessage, setExaminerMessage] = useState("");
  const examinerAudioTimeout = useRef<NodeJS.Timeout | null>(null);

  // Simulate examiner speech
  const simulateExaminerSpeaking = (message: string, duration: number, currentPhase: Phase) => {
    setExaminerMessage(message);
    setExaminerSpeaking(true);
    
    // Clear any existing timeout
    if (examinerAudioTimeout.current) {
      clearTimeout(examinerAudioTimeout.current);
    }
    
    // Set timeout for when examiner finishes speaking
    examinerAudioTimeout.current = setTimeout(() => {
      setExaminerSpeaking(false);
      
      // Auto-start recording when examiner finishes speaking
      if (currentPhase !== Phase.INSTRUCTIONS && 
          currentPhase !== Phase.SPEAKING_INTRO && 
          currentPhase !== Phase.COMPLETED &&
          currentPhase !== Phase.SPEAKING_PART2_PREP) {
        setIsRecording(true);
      }
    }, duration);
  };

  // Clean up timeout when component unmounts
  const cleanupExaminerTimeout = () => {
    if (examinerAudioTimeout.current) {
      clearTimeout(examinerAudioTimeout.current);
    }
  };

  return {
    examinerSpeaking,
    examinerMessage,
    simulateExaminerSpeaking,
    cleanupExaminerTimeout
  };
};
