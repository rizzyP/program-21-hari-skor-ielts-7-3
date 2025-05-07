
import { useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { useTest } from '@/context/TestContext';

// Define time limits for each part according to requirements
const TIME_LIMITS = {
  part1: 20, // 20 seconds for each part 1 question
  part2: 120, // 2 minutes (120 seconds) for part 2
  part3: 40  // 40 seconds for each part 3 question
};

export const useRecordingControls = (
  currentPart: number, 
  currentQuestion: number,
  setIsRecording: (value: boolean) => void,
  setTranscripts: (value: React.SetStateAction<Record<string, string>>) => void,
  handleNextQuestion: () => void
) => {
  const { setTimeRemaining, saveAnswer } = useTest();
  const answerTimerTimeout = useRef<NodeJS.Timeout | null>(null);
  const recordingDuration = useRef<number>(0);
  
  // Clean up on unmount or currentPart/question change
  useEffect(() => {
    return () => {
      if (answerTimerTimeout.current) {
        clearTimeout(answerTimerTimeout.current);
        answerTimerTimeout.current = null;
      }
    };
  }, [currentPart, currentQuestion]);

  // Set timer based on current part precisely as specified
  const setAnswerTimer = () => {
    // Clear any existing timer
    if (answerTimerTimeout.current) {
      clearTimeout(answerTimerTimeout.current);
    }
    
    let timeLimit: number;
    
    // Select time limit based on current part
    switch(currentPart) {
      case 1:
        timeLimit = TIME_LIMITS.part1; // 20 seconds for Part 1
        break;
      case 2:
        timeLimit = TIME_LIMITS.part2; // 120 seconds (2 minutes) for Part 2
        break;
      case 3:
        timeLimit = TIME_LIMITS.part3; // 40 seconds for Part 3
        break;
      default:
        timeLimit = 30; // Default fallback
    }
    
    recordingDuration.current = timeLimit;
    
    // Update the timer in the UI
    setTimeRemaining(timeLimit);
    
    // Set a timeout to automatically stop recording when time is up
    answerTimerTimeout.current = setTimeout(() => {
      console.log(`Timer completed (${timeLimit}s), stopping recording automatically`);
      handleStopRecording();
    }, timeLimit * 1000);
    
    return timeLimit;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    
    // Set timer for the current part
    const timeLimit = setAnswerTimer();
    
    const timeLimitText = currentPart === 1 ? '20 sec' : 
                          currentPart === 2 ? '2 min' : '40 sec';
    
    toast.info(`Recording started (${timeLimitText})`, {
      description: 'Speak clearly and answer the question.'
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    
    // Clear the answer timer
    if (answerTimerTimeout.current) {
      clearTimeout(answerTimerTimeout.current);
      answerTimerTimeout.current = null;
    }
    
    // Mock transcripts for demo purposes with different responses for each question
    const mockResponses = {
      part1: [
        "My name is Sarah Johnson. I'm from Melbourne, Australia.",
        "I enjoy painting and drawing in my free time. It helps me relax and express my creativity.",
        "We had drawing, painting, and pottery classes at my school. They were quite comprehensive.",
        "They were a mix of traditional techniques and more modern approaches, with digital art being introduced in later years.",
        "I think art is very important in education as it develops creativity and gives students a different way to express themselves."
      ],
      part2: [
        "The teacher who influenced me the most was my high school mathematics teacher, Mr. Richards. He taught advanced mathematics and was known for his unique teaching style. What made him special was his passion for the subject and his ability to explain complex concepts in simple ways. He never just gave us the answers; he taught us how to think. He influenced me greatly because he showed me that mathematics wasn't just about numbers, but about logical thinking and problem-solving. His encouragement led me to pursue a degree in a field that requires strong analytical skills. Even today, I apply the thinking strategies he taught me."
      ],
      part3: [
        "I believe the qualities of a good teacher include patience, deep subject knowledge, and the ability to inspire students. They need to adapt to different learning styles and create an inclusive classroom environment.",
        "Education in my country has become more technology-focused and student-centered over recent decades. There's been a shift from rote learning to critical thinking and practical applications.",
        "While technology provides valuable tools for education, I don't think it will completely replace teachers. The human connection, mentorship, and emotional support teachers provide cannot be replicated by technology."
      ]
    };

    const partKey = `part${currentPart}` as keyof typeof mockResponses;
    const responseIndex = Math.min(currentQuestion, (mockResponses[partKey]?.length || 1) - 1);
    const response = mockResponses[partKey]?.[responseIndex] || "Your answer has been recorded.";

    // Save transcript
    const questionKey = `p${currentPart}q${currentQuestion}`;
    setTranscripts(prev => ({ ...prev, [questionKey]: response }));
    
    // Save answer to the context
    saveAnswer(`part${currentPart}-q${currentQuestion}`, response);
    
    toast.success('Response recorded', {
      description: 'Your answer has been saved.'
    });
    
    // Proceed to next question after stopping recording
    handleNextQuestion();
  };

  // Clean up timeout when component unmounts
  const cleanupRecordingTimeout = () => {
    if (answerTimerTimeout.current) {
      clearTimeout(answerTimerTimeout.current);
      answerTimerTimeout.current = null;
    }
  };

  return {
    handleStartRecording,
    handleStopRecording,
    cleanupRecordingTimeout,
    recordingDuration: recordingDuration.current
  };
};
