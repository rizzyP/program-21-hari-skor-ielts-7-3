
import { useCallback, useRef, useState, useEffect } from 'react';
import { Phase } from '@/components/test/TestPhases';
import { useAudioPlayer } from '@/hooks/audio';
import { useExaminerSimulation } from './useExaminerSimulation';
import { useVoiceRecorder } from './useVoiceRecorder';
import { useTestContent } from './useTestContent';
import { useTestNavigation } from './useTestNavigation';
import { useSpeakingTestState } from './useSpeakingTestState';
import { toast } from 'sonner';

export const useSpeakingTest = () => {
  // Re-use all of the existing functionality
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
    isPreparing,
    setIsPreparing,
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

  // Timer for preparation time in part 2
  const [prepTime, setPrepTime] = useState(60); // 1 minute
  const prepTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Recording times for different parts
  const getRecordingTime = useCallback(() => {
    if (currentPart === 1) return 20; // 20 seconds for part 1
    if (currentPart === 2) return 120; // 2 minutes for part 2
    if (currentPart === 3) return 40; // 40 seconds for part 3
    return 30; // default
  }, [currentPart]);

  // Voice recording functionality
  const {
    startRecording,
    stopRecording
  } = useVoiceRecorder({
    onTranscriptionComplete: (transcript: string) => {
      // Handle transcription
      const questionId = `p${currentPart}q${currentQuestion}`;
      setTranscripts(prev => ({
        ...prev,
        [questionId]: transcript
      }));
      setIsTranscribing(false);
    },
    maxDuration: getRecordingTime()
  });

  // Examiner simulation with audio capabilities
  const {
    examinerSpeaking,
    examinerMessage,
    fadeIn,
    audioSrc,
    audioCompleted,
    isPlayingAudio,
    simulateExaminerSpeaking,
    playExaminerAudio,
    pauseExaminerAudio,
    cleanupExaminerTimeout,
    getCurrentSrc,
    getAudioAction,
    resetAudioCompleted,
    audioError
  } = useExaminerSimulation(setIsRecording);

  // Setup test navigation
  const {
    handleStart,
    handleNextQuestion,
    startPart1,
    startPart2,
    startPart3,
    showCueCardAndStartPreparation,
    startPart2Speaking,
    completePart2,
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
    () => getCurrentPartQuestions(currentPart),
    currentPart,
    currentQuestion,
    currentPhase
  );

  // Handle start preparation timer for part 2
  const handleStartPreparation = useCallback(() => {
    setIsPreparing(true);
    setPrepTime(60);
    
    // Start countdown
    prepTimerRef.current = setInterval(() => {
      setPrepTime(prev => {
        if (prev <= 1) {
          clearInterval(prepTimerRef.current!);
          setIsPreparing(false);
          
          // Play next audio when prep time ends
          startPart2Speaking();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [startPart2Speaking]);

  // Handle start recording
  const handleStartRecording = useCallback(() => {
    startRecording();
  }, [startRecording]);

  // Handle stop recording
  const handleStopRecording = useCallback(() => {
    stopRecording();
    setIsRecording(false);
    
    // For Part 2 speaking, go to completion
    if (currentPhase === Phase.SPEAKING_PART2 && !isPreparing) {
      completePart2();
      return;
    }
    
    // For other parts, go to next question
    handleNextQuestion();
  }, [stopRecording, handleNextQuestion, completePart2, currentPhase, isPreparing]);

  // Check for audio completion and execute next actions
  useEffect(() => {
    if (audioCompleted) {
      const action = getAudioAction();
      resetAudioCompleted();
      
      // Execute the appropriate action based on audio completion
      switch (action) {
        case 'startPart1':
          startPart1();
          break;
        case 'startRecording':
          setIsRecording(true);
          break;
        case 'startPart2':
          startPart2();
          break;
        case 'startPreparation':
          showCueCardAndStartPreparation();
          // Start preparation timer after a small delay
          setTimeout(() => {
            handleStartPreparation();
          }, 1000);
          break;
        case 'startLongRecording':
          setIsRecording(true);
          break;
        case 'startPart3':
          startPart3();
          break;
        case 'endTest':
          handleComplete();
          break;
      }
    }
  }, [audioCompleted, getAudioAction, resetAudioCompleted, startPart1, startPart2, startPart3, showCueCardAndStartPreparation, handleStartPreparation, handleComplete]);

  // Cleanup
  useEffect(() => {
    return () => {
      cleanupExaminerTimeout();
      if (prepTimerRef.current) {
        clearInterval(prepTimerRef.current);
      }
    };
  }, [cleanupExaminerTimeout]);

  return {
    // All the existing properties and functions
    currentPhase,
    isStarted,
    isRecording,
    isTranscribing,
    isPreparing,
    prepTime,
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
