
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IELTSTest, TestSection, UserAnswer, TestResult } from '@/types/test';
import { sampleTest } from '@/data/sampleTest';

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
    // In a real application, this would send answers to backend for processing
    console.log('Section submitted with answers:', userAnswers);
  };

  const completeTest = () => {
    setIsTestActive(false);
    setCurrentSection(null);
    // In a real app, this would finalize the test and calculate results
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
        setActiveQuestionId
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
