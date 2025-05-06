
import { useEffect } from 'react';
import { useTest } from '@/context/TestContext';
import { useSpeakingTestState } from './useSpeakingTestState';
import { useExaminerSimulation } from './useExaminerSimulation';
import { useRecordingControls } from './useRecordingControls';
import { useTestContent } from './useTestContent';
import { useTestNavigation } from './useTestNavigation';
import { SpeakingContent } from '@/types/test';

export const useSpeakingTest = () => {
  const { 
    currentTest, 
    startSection,
  } = useTest();
  
  // Compose all the hooks
  const {
    currentPhase,
    setCurrentPhase,
    isStarted,
    setIsStarted,
    isRecording,
    setIsRecording,
    currentQuestion,
    setCurrentQuestion,
    currentPart,
    setCurrentPart,
    transcripts,
    setTranscripts,
    partCompleted,
    setPartCompleted,
    fadeIn,
    questionNumber,
    setQuestionNumber,
    totalQuestions,
    setTotalQuestions
  } = useSpeakingTestState();

  const {
    examinerSpeaking,
    examinerMessage,
    simulateExaminerSpeaking,
    cleanupExaminerTimeout
  } = useExaminerSimulation(setIsRecording);

  const {
    speakingSection,
    speakingContent,
    getCurrentPartQuestions,
    getCurrentQuestion
  } = useTestContent(currentPart, currentQuestion);

  // Create a navigation hook that gets the live state
  // We need to declare this after test content hook to have access to getCurrentPartQuestions
  const {
    handleStart,
    handlePrepare: handleNavPrepare, // Rename to avoid name collision
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

  // Set up recording controls after navigation is set up
  // because it depends on handleNextQuestion
  const {
    handleStartRecording,
    handleStopRecording,
    cleanupRecordingTimeout
  } = useRecordingControls(
    currentPart,
    currentQuestion,
    setIsRecording,
    setTranscripts,
    handleNextQuestion
  );

  // Initialize the test when component mounts
  useEffect(() => {
    if (currentTest) {
      const speakingSection = currentTest.sections.find(section => section.type === 'speaking');
      if (speakingSection) {
        startSection(speakingSection.id);
        
        // Calculate total questions across all parts - with proper type casting
        const speakingContent = speakingSection.content as SpeakingContent;
        if (speakingContent && speakingContent.parts) {
          const total = speakingContent.parts.reduce((sum, part) => {
            return sum + (part.questions ? part.questions.length : 0);
          }, 0);
          setTotalQuestions(total);
        }
      }
    }
  }, [currentTest, startSection, setTotalQuestions]);

  // Clean up timeouts when component unmounts
  useEffect(() => {
    return () => {
      cleanupExaminerTimeout();
      cleanupRecordingTimeout();
    };
  }, []);

  return {
    currentPhase,
    isStarted,
    isRecording,
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
    getCurrentQuestion,
    handleStart,
    handleStopRecording,
    handleNavigateResults
  };
};
