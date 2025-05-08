
import { Phase } from '@/components/test/TestPhases';
import { AUDIO_FILES, FIXED_PART1_QUESTIONS, FIXED_PART3_QUESTIONS } from '@/constants/speakingTestData';

// Custom hook for navigating between questions
export const useQuestionNavigation = (
  currentPart: number,
  currentQuestion: number,
  setCurrentQuestion: (value: number) => void,
  setQuestionNumber: (prev: React.SetStateAction<number>) => void,
  setPartCompleted: (value: React.SetStateAction<Record<string, boolean>>) => void,
  setWaitingForRecording: (value: boolean) => void,
  simulateExaminerSpeaking: (message: string, audioFile: string | null, duration: number, currentPhase: Phase) => Promise<void> | void,
  handlePrepare: () => void,
  startPart3: () => void,
  handleComplete: () => void
) => {
  // Handle moving to next question
  const handleNextQuestion = async () => {
    // Update overall question counter
    setQuestionNumber(prev => prev + 1);
    
    // Part 1 flow
    if (currentPart === 1) {
      // Handle Part 1 questions
      if (currentQuestion < 3) {  // We have 4 questions (0-3) in part 1
        const nextQuestionIndex = currentQuestion + 1;
        setCurrentQuestion(nextQuestionIndex);
        
        try {
          // Play next question audio with the fixed question
          await simulateExaminerSpeaking(
            FIXED_PART1_QUESTIONS[nextQuestionIndex], 
            AUDIO_FILES.part1[nextQuestionIndex], 
            3000, 
            Phase.SPEAKING_PART1
          );
          
          // Set flag to start recording after audio completes
          setWaitingForRecording(true);
        } catch (error) {
          console.error("Error playing next Part 1 question:", error);
          // Fallback
          setWaitingForRecording(true);
        }
      } 
      // End of Part 1
      else {
        setPartCompleted(prev => ({ ...prev, part1: true }));
        
        try {
          // Play end of part 1 audio
          await simulateExaminerSpeaking(
            "Thank you. Now, let's move on to part 2.", 
            AUDIO_FILES.part1[4], 
            3000, 
            Phase.SPEAKING_PART1
          );
          
          // Move to Part 2
          handlePrepare();
        } catch (error) {
          console.error("Error ending Part 1:", error);
          // Fallback
          handlePrepare();
        }
      }
    }
    // Part 2 flow - Handle end of part 2
    else if (currentPart === 2) {
      setPartCompleted(prev => ({ ...prev, part2: true }));
      
      try {
        // Play end of part 2 audio
        await simulateExaminerSpeaking(
          "Thank you. Let's move on to the final part.", 
          AUDIO_FILES.part2[2], 
          3000, 
          Phase.SPEAKING_PART2_ANSWER
        );
        
        // Move to Part 3
        startPart3();
      } catch (error) {
        console.error("Error ending Part 2:", error);
        // Fallback
        startPart3();
      }
    }
    // Part 3 flow - Handle part 3 questions
    else if (currentPart === 3) {
      if (currentQuestion < 2) { // We have 3 questions (0-2) in part 3
        const nextQuestionIndex = currentQuestion + 1;
        setCurrentQuestion(nextQuestionIndex);
        
        try {
          // Play next part 3 question audio with the fixed question
          await simulateExaminerSpeaking(
            FIXED_PART3_QUESTIONS[nextQuestionIndex], 
            AUDIO_FILES.part3[nextQuestionIndex], 
            3000, 
            Phase.SPEAKING_PART3
          );
          
          // Set flag to start recording after audio completes
          setWaitingForRecording(true);
        } catch (error) {
          console.error("Error playing next Part 3 question:", error);
          // Fallback
          setWaitingForRecording(true);
        }
      } 
      // End of Part 3 / End of test
      else {
        setPartCompleted(prev => ({ ...prev, part3: true }));
        handleComplete();
      }
    }
  };

  return {
    handleNextQuestion
  };
};
