
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
  const { currentTest } = useTest();
  const { speakingSection, speakingContent, getCurrentPartQuestions } = useTestContent();
  
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
    setQuestionNumber,
    totalQuestions,
    setTotalQuestions
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
    audioSrc,
    isPlayingAudio,
    simulateExaminerSpeaking,
    playExaminerAudio,
    pauseExaminerAudio,
    cleanupExaminerTimeout,
    getCurrentSrc,
    audioError
  } = useExaminerSimulation(setIsRecording);

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
    
    // New properties for audio player
    audioSrc,
    isPlayingAudio,
    playExaminerAudio,
    pauseExaminerAudio,
    getCurrentSrc,
    audioError
  };
};
