import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IELTSTest, TestSection, UserAnswer, TestResult } from '@/types/test';
import { sampleTest } from '@/data/sampleTest';
import { 
  evaluateListeningAnswers, 
  evaluateReadingAnswers, 
  evaluateWritingResponse, 
  evaluateSpeakingResponse,
  listeningCorrectAnswers,
  readingCorrectAnswers
} from '@/services/evaluationService';
import { generateOverallAnalysis } from '@/services/aiService';
import { toast } from 'sonner';

interface TestContextType {
  currentTest: IELTSTest | null;
  currentSection: TestSection | null;
  userAnswers: UserAnswer[];
  testResults: TestResult | null;
  isTestActive: boolean;
  activeQuestionId: string | null;
  timeRemaining: number;
  testType: 'academic' | 'general';
  loadTest: (testId: string, type?: 'academic' | 'general') => void;
  startTest: () => void;
  startSection: (sectionId: string) => void;
  setCurrentSection: (section: TestSection | null) => void;
  saveAnswer: (questionId: string, answer: string) => void;
  submitSection: () => void;
  completeTest: () => void;
  setTestResults: (results: TestResult | null) => void;
  setTimeRemaining: (time: number) => void;
  setActiveQuestionId: (id: string | null) => void;
  evaluateAllSections: () => Promise<TestResult>;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTest, setCurrentTest] = useState<IELTSTest | null>(null);
  const [currentSection, setCurrentSection] = useState<TestSection | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [testResults, setTestResults] = useState<TestResult | null>(null);
  const [isTestActive, setIsTestActive] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [testType, setTestType] = useState<'academic' | 'general'>('academic');

  const loadTest = (testId: string, type: 'academic' | 'general' = 'academic') => {
    // In a real app, this would fetch the test from an API
    if (testId === 'sample') {
      setCurrentTest(sampleTest);
      setTestType(type);
    }
  };

  const startTest = () => {
    setIsTestActive(true);
    setUserAnswers([]);
    setTestResults(null);
  };

  const startSection = (sectionId: string) => {
    if (!currentTest) return;
    
    const section = currentTest.sections.find(s => s.id === sectionId);
    if (section) {
      setCurrentSection(section);
      setTimeRemaining(section.timeInMinutes * 60);
      setIsTestActive(true);
    }
  };

  const saveAnswer = (questionId: string, answer: string) => {
    setUserAnswers(prev => {
      // Check if we already have an answer for this question
      const existingAnswerIndex = prev.findIndex(a => a.questionId === questionId);
      
      if (existingAnswerIndex !== -1) {
        // Update existing answer
        const updatedAnswers = [...prev];
        updatedAnswers[existingAnswerIndex] = { questionId, userResponse: answer };
        return updatedAnswers;
      } else {
        // Add new answer
        return [...prev, { questionId, userResponse: answer }];
      }
    });
  };

  const submitSection = () => {
    setIsTestActive(false);
    console.log('Section submitted with answers:', userAnswers);
  };

  const completeTest = () => {
    setIsTestActive(false);
    setCurrentSection(null);
  };

  // This function will be called at the end of the test to evaluate all sections
  const evaluateAllSections = async (): Promise<TestResult> => {
    try {
      // Convert userAnswers array to a more convenient format for evaluation
      const answersMap: Record<string, string> = {};
      userAnswers.forEach(answer => {
        answersMap[answer.questionId] = answer.userResponse;
      });

      // Get listening answers
      const listeningAnswers: Record<string, string> = {};
      Object.entries(answersMap).forEach(([key, value]) => {
        if (key.startsWith('l-')) {
          listeningAnswers[key] = value;
        }
      });

      // Get reading answers
      const readingAnswers: Record<string, string> = {};
      Object.entries(answersMap).forEach(([key, value]) => {
        if (key.startsWith('r-')) {
          readingAnswers[key] = value;
        }
      });

      // Get writing answers
      const writingAnswers: Record<string, string> = {};
      Object.entries(answersMap).forEach(([key, value]) => {
        if (key.startsWith('w-')) {
          writingAnswers[key] = value;
        }
      });

      // Evaluate each section
      const listeningFeedback = evaluateListeningAnswers(listeningAnswers, listeningCorrectAnswers);
      const readingFeedback = evaluateReadingAnswers(readingAnswers, readingCorrectAnswers);
      
      // These would be AI-based evaluations in a real app
      const writingFeedback = await evaluateWritingResponse(writingAnswers);
      
      // Calculate overall score without speaking
      const sectionScores = {
        listening: listeningFeedback.overallScore,
        reading: readingFeedback.overallScore,
        writing: writingFeedback.overallScore,
        speaking: 0 // Set to 0 as it's disabled
      };

      // Generate overall analysis using Gemini AI
      console.log('Generating overall analysis with Gemini...', sectionScores);
      const overallAnalysis = await generateOverallAnalysis(sectionScores);

      // Create test result
      const result: TestResult = {
        testId: currentTest?.id || 'sample',
        date: new Date().toISOString(),
        sections: [
          {
            sectionType: 'listening',
            bandScore: listeningFeedback.overallScore,
            userAnswers: userAnswers.filter(a => a.questionId.startsWith('l-')),
            details: {
              correctAnswers: Object.keys(listeningAnswers).reduce((count, key) => 
                listeningCorrectAnswers[key]?.toLowerCase() === listeningAnswers[key]?.toLowerCase() ? count + 1 : count, 0),
              totalQuestions: Object.keys(listeningAnswers).length,
              accuracy: `${((Object.keys(listeningAnswers).reduce((count, key) => 
                listeningCorrectAnswers[key]?.toLowerCase() === listeningAnswers[key]?.toLowerCase() ? count + 1 : count, 0) / 
                Math.max(Object.keys(listeningAnswers).length, 1)) * 100).toFixed(0)}%`,
              strengths: listeningFeedback.strengths,
              weaknesses: listeningFeedback.weaknesses
            }
          },
          {
            sectionType: 'reading',
            bandScore: readingFeedback.overallScore,
            userAnswers: userAnswers.filter(a => a.questionId.startsWith('r-')),
            details: {
              correctAnswers: Object.keys(readingAnswers).reduce((count, key) => 
                readingCorrectAnswers[key]?.toLowerCase() === readingAnswers[key]?.toLowerCase() ? count + 1 : count, 0),
              totalQuestions: Object.keys(readingAnswers).length,
              accuracy: `${((Object.keys(readingAnswers).reduce((count, key) => 
                readingCorrectAnswers[key]?.toLowerCase() === readingAnswers[key]?.toLowerCase() ? count + 1 : count, 0) / 
                Math.max(Object.keys(readingAnswers).length, 1)) * 100).toFixed(0)}%`,
              strengths: readingFeedback.strengths,
              weaknesses: readingFeedback.weaknesses
            }
          },
          {
            sectionType: 'writing',
            bandScore: writingFeedback.overallScore,
            userAnswers: userAnswers.filter(a => a.questionId.startsWith('w-')),
            details: {
              task1: {
                criteria: writingFeedback.criteria,
                strengths: writingFeedback.strengths,
                weaknesses: writingFeedback.weaknesses
              },
              task2: {
                criteria: [], // In our demo, we only have task1
                strengths: [],
                weaknesses: []
              }
            }
          }
        ],
        overallBandScore: overallAnalysis.overallBandScore,
        strengths: overallAnalysis.strengths,
        weaknesses: overallAnalysis.weaknesses,
        recommendations: overallAnalysis.recommendations
      };

      // Save the results
      setTestResults(result);
      return result;
    } catch (error) {
      console.error('Error evaluating test results:', error);
      toast.error('Failed to evaluate test results', {
        description: 'Please try again or contact support.'
      });
      throw error;
    }
  };

  return (
    <TestContext.Provider
      value={{
        currentTest,
        currentSection,
        userAnswers,
        testResults,
        isTestActive,
        activeQuestionId,
        timeRemaining,
        testType,
        loadTest,
        startTest,
        startSection,
        setCurrentSection,
        saveAnswer,
        submitSection,
        completeTest,
        setTestResults,
        setTimeRemaining,
        setActiveQuestionId,
        evaluateAllSections
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export const useTest = (): TestContextType => {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
};
