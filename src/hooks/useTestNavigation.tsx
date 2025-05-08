
import { Phase } from '@/components/test/TestPhases';
import { useSpeakingHandlers } from './useSpeakingHandlers';
import { useQuestionNavigation } from './useQuestionNavigation';

export const useTestNavigation = (
  setCurrentPhase: (value: Phase) => void,
  setIsStarted: (value: boolean) => void,
  setCurrentPart: (value: number) => void,
  setCurrentQuestion: (value: number) => void,
  setPartCompleted: (value: React.SetStateAction<Record<string, boolean>>) => void,
  setQuestionNumber: (value: React.SetStateAction<number>) => void,
  simulateExaminerSpeaking: (message: string, audioFile: string | null, duration: number, currentPhase: Phase) => Promise<void> | void,
  playExaminerAudioSequence: (audioSequence: {src: string, message: string, delayAfter?: number, onEnd?: () => void}[]) => Promise<void>,
  getCurrentPartQuestions: () => string[],
  currentPart: number,
  currentQuestion: number,
  currentPhase: Phase,
  setWaitingForRecording: (value: boolean) => void
) => {
  const { setTimeRemaining } = useTest();

  // Initialize part handlers
  const {
    handleStart,
    handlePrepare,
    startPart1,
    startPart3, 
    handleComplete,
    handleNavigateResults
  } = useSpeakingHandlers(
    setCurrentPhase,
    setIsStarted,
    setCurrentPart,
    setCurrentQuestion,
    setPartCompleted,
    setWaitingForRecording,
    simulateExaminerSpeaking,
    playExaminerAudioSequence,
    setTimeRemaining
  );

  // Initialize question navigation
  const { handleNextQuestion } = useQuestionNavigation(
    currentPart,
    currentQuestion,
    setCurrentQuestion,
    setQuestionNumber,
    setPartCompleted,
    setWaitingForRecording,
    simulateExaminerSpeaking,
    handlePrepare,
    startPart3,
    handleComplete
  );

  return {
    handleStart,
    handlePrepare,
    handleNextQuestion,
    handleComplete,
    handleNavigateResults
  };
};

// Import missing dependency
import { useTest } from '@/context/TestContext';
