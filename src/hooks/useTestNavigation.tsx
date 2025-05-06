
import { useNavigate } from 'react-router-dom';
import { useTest } from '@/context/TestContext';
import { toast } from 'sonner';
import { Phase } from '@/components/test/TestPhases';

export const useTestNavigation = (
  setCurrentPhase: (value: Phase) => void,
  setIsStarted: (value: boolean) => void,
  setCurrentPart: (value: number) => void,
  setCurrentQuestion: (value: number) => void,
  setPartCompleted: (value: React.SetStateAction<Record<string, boolean>>) => void,
  setQuestionNumber: (value: React.SetStateAction<number>) => void,
  simulateExaminerSpeaking: (message: string, duration: number, currentPhase: Phase) => void,
  getCurrentPartQuestions: () => string[],
  currentPart: number,
  currentQuestion: number,
  currentPhase: Phase
) => {
  const navigate = useNavigate();
  const { submitSection, completeTest, setTimeRemaining } = useTest();

  // Handle test start
  const handleStart = () => {
    setIsStarted(true);
    setCurrentPhase(Phase.SPEAKING_INTRO);
    
    // Simulate examiner introduction
    simulateExaminerSpeaking(
      "Hello, my name is Dr. Sarah Wilson and I'll be your examiner today. Let's begin with some questions about yourself.", 
      4000,
      Phase.SPEAKING_INTRO
    );
    
    // After intro, move to Part 1
    setTimeout(() => {
      setCurrentPhase(Phase.SPEAKING_PART1);
      simulateExaminerSpeaking(
        "Let's start Part 1 of the test. I'll ask you some questions about yourself.", 
        2500,
        Phase.SPEAKING_PART1
      );
      
      // After the part intro, ask the first question
      setTimeout(() => {
        const firstQuestion = getCurrentPartQuestions()[0] || "";
        simulateExaminerSpeaking(firstQuestion, 3000, Phase.SPEAKING_PART1);
      }, 2500);
    }, 4000);
    
    toast.info('Speaking test started', {
      description: 'The examiner will guide you through the test.'
    });
  };

  // Handle Part 2 preparation
  const handlePrepare = (seconds: number) => {
    setCurrentPhase(Phase.SPEAKING_PART2_PREP);
    setTimeRemaining(seconds);
    
    simulateExaminerSpeaking(
      "Now, I'm going to give you a topic. You'll have one minute to prepare and then you should speak for 1-2 minutes. Here is some paper and a pencil to make notes if you wish. Here is your topic:", 
      5000,
      Phase.SPEAKING_PART2_PREP
    );
    
    toast.info('Preparation time started', {
      description: `You have ${seconds / 60} minutes to prepare your answer.`
    });
    
    // After preparation time is up, automatically move to recording
    setTimeout(() => {
      setCurrentPhase(Phase.SPEAKING_PART2_ANSWER);
      simulateExaminerSpeaking(
        "Now, please speak about the topic for 1-2 minutes.", 
        3000,
        Phase.SPEAKING_PART2_ANSWER
      );
      
      toast.info('Preparation time is over', {
        description: 'Start speaking when the examiner finishes.'
      });
    }, seconds * 1000);
  };

  // Handle moving to next question
  const handleNextQuestion = () => {
    const questions = getCurrentPartQuestions();
    
    // Update overall question counter
    setQuestionNumber(prev => prev + 1);
    
    // If there are more questions in this part
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      
      // Simulate examiner asking the next question immediately
      const nextQuestion = questions[currentQuestion + 1];
      simulateExaminerSpeaking(nextQuestion, 3000, currentPhase);
    } 
    // If this is the end of part 1
    else if (currentPart === 1) {
      setPartCompleted(prev => ({ ...prev, part1: true }));
      setCurrentPart(2);
      setCurrentQuestion(0);
      handlePrepare(60); // 60 seconds for Part 2 preparation
    }
    // If this is the end of part 2
    else if (currentPart === 2) {
      setPartCompleted(prev => ({ ...prev, part2: true }));
      setCurrentPart(3);
      setCurrentQuestion(0);
      setCurrentPhase(Phase.SPEAKING_PART3);
      
      // Move directly to Part 3
      simulateExaminerSpeaking(
        "Let's talk more about this topic. I'll ask you some more questions.", 
        3000,
        Phase.SPEAKING_PART3
      );
      
      // Queue up the first Part 3 question
      setTimeout(() => {
        const firstPart3Question = getCurrentPartQuestions()[0] || "";
        simulateExaminerSpeaking(firstPart3Question, 3000, Phase.SPEAKING_PART3);
      }, 3000);
    }
    // If this is the end of part 3
    else if (currentPart === 3 && currentQuestion >= questions.length - 1) {
      setPartCompleted(prev => ({ ...prev, part3: true }));
      handleComplete();
    }
    // For Part 3 questions
    else {
      setCurrentQuestion(currentQuestion + 1);
      
      // Simulate examiner asking the next question immediately
      const nextQuestion = questions[currentQuestion + 1];
      simulateExaminerSpeaking(nextQuestion, 3000, currentPhase);
    }
  };

  // Complete the test
  const handleComplete = () => {
    submitSection();
    completeTest();
    setCurrentPhase(Phase.COMPLETED);
    simulateExaminerSpeaking(
      "That's the end of the speaking test. Thank you for your participation.", 
      3000,
      Phase.COMPLETED
    );
    
    toast.success('Speaking test completed', {
      description: 'You have completed the IELTS speaking test!'
    });
    
    setTimeout(() => {
      navigate('/results');
    }, 3000);
  };

  const handleNavigateResults = () => {
    navigate('/results');
  };

  return {
    handleStart,
    handlePrepare,
    handleNextQuestion,
    handleComplete,
    handleNavigateResults
  };
};
