
import { useState, useEffect } from 'react';
import { useTest } from '@/context/TestContext';
import { Phase } from '@/components/test/TestPhases';
import { SpeakingContent } from '@/types/test';

export const useSpeakingTestState = () => {
  // Test flow states
  const [currentPhase, setCurrentPhase] = useState<Phase>(Phase.INSTRUCTIONS);
  const [isStarted, setIsStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [currentPart, setCurrentPart] = useState<number>(1);
  const [transcripts, setTranscripts] = useState<Record<string, string>>({});
  const [partCompleted, setPartCompleted] = useState<Record<string, boolean>>({
    part1: false,
    part2: false,
    part3: false
  });
  
  // New state to track when we should begin recording after audio finishes
  const [waitingForRecording, setWaitingForRecording] = useState(false);
  
  // Animation states
  const [fadeIn, setFadeIn] = useState(false);

  // For tracking overall question number
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    setFadeIn(true);
    const timer = setTimeout(() => setFadeIn(false), 300);
    return () => clearTimeout(timer);
  }, [currentQuestion, currentPart, currentPhase]);

  return {
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
    setTotalQuestions,
    waitingForRecording,
    setWaitingForRecording
  };
};
