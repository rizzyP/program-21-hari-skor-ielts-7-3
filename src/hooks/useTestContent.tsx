
import { useTest } from '@/context/TestContext';
import { SpeakingContent } from '@/types/test';

export const useTestContent = (currentPart: number, currentQuestion: number) => {
  const { currentTest } = useTest();
  
  const speakingSection = currentTest?.sections.find(section => section.type === 'speaking');
  const speakingContent = speakingSection?.content as SpeakingContent | undefined;

  // Get current part questions
  const getCurrentPartQuestions = () => {
    if (!speakingContent || !speakingContent.parts) return [];
    return speakingContent.parts.find((p) => p.partNumber === currentPart)?.questions || [];
  };

  // Get current question
  const getCurrentQuestion = () => {
    const questions = getCurrentPartQuestions();
    return questions[currentQuestion] || "";
  };

  return {
    speakingSection,
    speakingContent,
    getCurrentPartQuestions,
    getCurrentQuestion
  };
};
