
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
    playExaminerAudioSequence,
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
    handlePrepare,
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

  // Automatically start recording when examiner stops speaking
  useEffect(() => {
    if (!examinerSpeaking && 
        (currentPhase === Phase.SPEAKING_PART1 || 
         currentPhase === Phase.SPEAKING_PART2_ANSWER || 
         currentPhase === Phase.SPEAKING_PART3) && 
        !isRecording) {
      
      // Give a small delay to make it feel natural
      const timer = setTimeout(() => {
        handleStartRecording();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [examinerSpeaking, currentPhase, isRecording, handleStartRecording]);

  // Clean up timeouts when component unmounts
  useEffect(() => {
    return () => {
      cleanupExaminerTimeout();
      cleanupRecordingTimeout();
    };
  }, [cleanupExaminerTimeout, cleanupRecordingTimeout]);

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
