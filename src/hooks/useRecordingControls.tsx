
import { useRef } from 'react';
import { toast } from 'sonner';
import { useTest } from '@/context/TestContext';

// Define time limits for each part
const TIME_LIMITS = {
  part1: 20, // 20 seconds per question
  part2: 60, // 1 minute per question
  part3: 40  // 40 seconds per question
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

  // Set timer based on current part
  const setAnswerTimer = () => {
    // Clear any existing timer
    if (answerTimerTimeout.current) {
      clearTimeout(answerTimerTimeout.current);
    }
    
    let timeLimit: number;
    
    // Select time limit based on current part
    switch(currentPart) {
      case 1:
        timeLimit = TIME_LIMITS.part1;
        break;
      case 2:
        timeLimit = TIME_LIMITS.part2;
        break;
      case 3:
        timeLimit = TIME_LIMITS.part3;
        break;
      default:
        timeLimit = 30; // Default fallback
    }
    
    // Update the timer in the UI
    setTimeRemaining(timeLimit);
    
    // Set a timeout to automatically stop recording when time is up
    answerTimerTimeout.current = setTimeout(() => {
      if (true) { // Always execute since this is called only when recording
        handleStopRecording();
      }
    }, timeLimit * 1000);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    
    // Set timer for the current part
    setAnswerTimer();
    
    toast.info(`Recording started (${currentPart === 1 ? '20 sec' : currentPart === 2 ? '60 sec' : '40 sec'})`, {
      description: 'Speak clearly and answer the question.'
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    
    // Clear the answer timer
    if (answerTimerTimeout.current) {
      clearTimeout(answerTimerTimeout.current);
    }
    
    // Mock transcripts for demo purposes with different responses for each question
    const mockResponses = {
      part1: [
        "My name is Sarah Johnson. I'm from Melbourne, Australia.",
        "I'm currently studying computer science at the University of Melbourne.",
        "Yes, I enjoy listening to music, particularly indie rock and classical music when I'm studying.",
        "My hometown is known for its cultural diversity and great coffee scene.",
        "It has changed quite a bit since I was a child, with more high-rise buildings now."
      ],
      part2: [
        "The teacher who influenced me the most was my high school mathematics teacher, Mr. Richards. He taught advanced mathematics and was known for his unique teaching style. What made him special was his passion for the subject and his ability to explain complex concepts in simple ways. He never just gave us the answers; he taught us how to think. He influenced me greatly because he showed me that mathematics wasn't just about numbers, but about logical thinking and problem-solving. His encouragement led me to pursue a degree in a field that requires strong analytical skills. Even today, I apply the thinking strategies he taught me."
      ],
      part3: [
        "I believe the qualities of a good teacher include patience, deep knowledge of their subject, and the ability to inspire students.",
        "Yes, the role of teachers has definitely changed in recent years with the integration of technology in education.",
        "Both teachers and parents play crucial roles in educating children, but in different ways.",
        "I don't think computers will completely replace teachers because the human aspects of teaching—inspiration, mentorship, emotional support—cannot be replicated."
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
    
    // Immediately proceed to next question after stopping recording
    handleNextQuestion();
  };

  // Clean up timeout when component unmounts
  const cleanupRecordingTimeout = () => {
    if (answerTimerTimeout.current) {
      clearTimeout(answerTimerTimeout.current);
    }
  };

  return {
    handleStartRecording,
    handleStopRecording,
    cleanupRecordingTimeout
  };
};
