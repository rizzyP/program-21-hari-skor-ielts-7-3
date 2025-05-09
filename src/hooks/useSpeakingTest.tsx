
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
    saveAnswer,
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

  // Get the current question text for transcription
  const currentQuestionText = examinerMessage || '';

  // Set up recording controls after navigation is set up
  // because it depends on handleNextQuestion
  const {
    isRecording: voiceRecordingActive,
    isTranscribing,
    audioURL,
    handleStartRecording,
    handleStopRecording,
    cleanupRecordingTimeout
  } = useRecordingControls(
    currentPart,
    currentQuestion,
    setIsRecording,
    setTranscripts,
    handleNextQuestion,
    currentQuestionText
  );

  // Initialize the test when component mounts
  useEffect(() => {
    if (currentTest) {
      const speakingSection = currentTest.sections.find(section => section.type === 'speaking');
      if (speakingSection) {
        startSection(speakingSection.id);
        
        // Set total questions - since we're only doing part 1, hardcode to 4
        setTotalQuestions(4);
      }
    }

    // Clean up audio resources when component unmounts
    return () => {
      cleanupExaminerTimeout();
      cleanupRecordingTimeout();
    };
  }, [currentTest, startSection, setTotalQuestions, cleanupExaminerTimeout, cleanupRecordingTimeout]);

  // Save transcripts to test context when they change
  useEffect(() => {
    Object.entries(transcripts).forEach(([key, value]) => {
      saveAnswer(key, value);
    });
  }, [transcripts, saveAnswer]);

  return {
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
    getCurrentQuestion,
    handleStart,
    handleStartRecording,
    handleStopRecording,
    handleNavigateResults
  };
};
