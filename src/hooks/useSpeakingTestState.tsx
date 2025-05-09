
import { useState, useEffect } from 'react';
import { Phase } from '@/components/test/TestPhases';

export const useSpeakingTestState = () => {
  // Test flow states
  const [currentPhase, setCurrentPhase] = useState<Phase>(Phase.INSTRUCTIONS);
  const [isStarted, setIsStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [currentPart, setCurrentPart] = useState<number>(1);
  const [transcripts, setTranscripts] = useState<Record<string, string>>({});
  const [partCompleted, setPartCompleted] = useState<Record<string, boolean>>({
    part1: false
  });
  
  // Animation states
  const [fadeIn, setFadeIn] = useState(false);

  // For tracking overall question number
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Fade in effect when changing questions/parts
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
    setTotalQuestions
  };
};
