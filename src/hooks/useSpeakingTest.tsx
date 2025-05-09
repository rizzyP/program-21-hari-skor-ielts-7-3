
import { useEffect, useCallback } from 'react';
import { useTest } from '@/context/TestContext';
import { Phase } from '@/components/test/TestPhases';
import { useExaminerSimulation } from './useExaminerSimulation';
import { useVoiceRecorder } from './useVoiceRecorder';
import { useTestContent } from './useTestContent';
import { useTestNavigation } from './useTestNavigation';
import { useSpeakingTestState } from './useSpeakingTestState';

export const useSpeakingTest = () => {
  // Re-use all of the existing functionality
  const { currentTest, testType } = useTest();
  const { speakingSection, speakingContent } = useTestContent();
  
  // State management
  const {
    currentPhase,
    setCurrentPhase, 
    isStarted, 
    setIsStarted,
    isRecording,
    setIsRecording,
    isTranscribing,
    setIsTranscribing,
    currentPart, 
    setCurrentPart,
    currentQuestion, 
    setCurrentQuestion,
    transcripts,
    setTranscripts,
    partCompleted, 
    setPartCompleted,
    questionNumber,
    setQuestionNumber
  } = useSpeakingTestState();

  // Voice recording functionality
  const {
    startRecording,
    stopRecording
  } = useVoiceRecorder({
    onTranscriptionComplete: (transcript: string) => {
      // Handle transcription with existing code...
      const questionId = `p${currentPart}q${currentQuestion}`;
      setTranscripts(prev => ({
        ...prev,
        [questionId]: transcript
      }));
      setIsTranscribing(false);
    }
  });

  // Examiner simulation with audio capabilities
  const {
    examinerSpeaking,
    examinerMessage,
    fadeIn,
    simulateExaminerSpeaking,
    playExaminerAudioSequence,
    cleanupExaminerTimeout,
    hasUserInteracted,
    audioError,
    simulateUserInteraction
  } = useExaminerSimulation(setIsRecording);

  // Get the available questions for the current part
  const getCurrentPartQuestions = useCallback(() => {
    // This function likely exists in your codebase - keep its implementation
    if (!speakingContent) return [];
    if (!speakingContent.parts) return [];
    return speakingContent.parts.find((p) => p.partNumber === currentPart)?.questions || [];
  }, [speakingContent, currentPart]);

  // Setup test navigation
  const {
    handleStart,
    handleNextQuestion,
    handleComplete,
    handleNavigateResults
  } = useTestNavigation(
    setCurrentPhase,
    setIsStarted,
    setCurrentPart,
    setCurrentQuestion,
    setPartCompleted,
    setQuestionNumber,
    simulateExaminerSpeaking,
    playExaminerAudioSequence,
    getCurrentPartQuestions,
    currentPart,
    currentQuestion,
    currentPhase
  );

  // Handle start recording
  const handleStartRecording = useCallback(() => {
    startRecording();
  }, [startRecording]);

  // Handle stop recording
  const handleStopRecording = useCallback(() => {
    stopRecording();
    handleNextQuestion(); // Move to next question after recording
  }, [stopRecording, handleNextQuestion]);

  // Calculate total questions
  const totalQuestions = useCallback(() => {
    if (!speakingContent) return 0;
    if (!speakingContent.parts) return 0;
    const part1 = speakingContent.parts.find(p => p.partNumber === 1);
    return part1 ? part1.questions.length : 0;
  }, [speakingContent])();

  // Cleanup
  useEffect(() => {
    return () => {
      cleanupExaminerTimeout();
    };
  }, [cleanupExaminerTimeout]);

  return {
    // All the existing properties and functions
    currentPhase,
    isStarted,
    isRecording,
    isTranscribing,
    currentQuestion,
    currentPart,
    transcripts,
    examinerSpeaking,
    partCompleted,
    fadeIn,
    examinerMessage,
    speakingSection,
    speakingContent,
    totalQuestions,
    questionNumber,
    getCurrentPartQuestions,
    handleStart,
    handleStartRecording,
    handleStopRecording,
    handleNavigateResults,
    
    // New properties for audio interaction
    hasUserInteracted,
    audioError,
    simulateUserInteraction
  };
};
