import { useTest } from '@/context/TestContext';
import { SpeakingContent } from '@/types/test';

export const useTestContent = () => {
  const { currentTest } = useTest();
  
  const speakingSection = currentTest?.sections.find(section => section.type === 'speaking');
  const speakingContent = speakingSection?.content as SpeakingContent | undefined;

  // Get current part questions - updated to work with or without argument
  const getCurrentPartQuestions = (currentPart?: number) => {
    if (!speakingContent || !speakingContent.parts) return [];
    
    // If currentPart is provided, return questions for that part
    // Otherwise return an empty array (this satisfies the function signature)
    if (currentPart !== undefined) {
      return speakingContent.parts.find((p) => p.partNumber === currentPart)?.questions || [];
    }
    
    return [];
  };

  // Get current question
  const getCurrentQuestion = (currentPart: number, currentQuestion: number) => {
    const questions = getCurrentPartQuestions(currentPart);
    return questions[currentQuestion] || "";
  };

  return {
    speakingSection,
    speakingContent,
    getCurrentPartQuestions,
    getCurrentQuestion
  };
};
