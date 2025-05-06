
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
  simulateExaminerSpeaking: (message: string, audioFile: string | null, duration: number, currentPhase: Phase) => void,
  playExaminerAudioSequence: (audioSequence: {src: string, message: string, delayAfter?: number, onEnd?: () => void}[]) => Promise<void>,
  getCurrentPartQuestions: () => string[],
  currentPart: number,
  currentQuestion: number,
  currentPhase: Phase
) => {
  const navigate = useNavigate();
  const { submitSection, completeTest, setTimeRemaining } = useTest();

  // Audio file paths
  const AUDIO_FILES = {
    opening: [
      '/media/assessment/speaking-section-opening-1.wav',
      '/media/assessment/speaking-section-opening-2.wav',
      '/media/assessment/speaking-section-opening-3.wav',
      '/media/assessment/speaking-section-opening-4.wav'
    ],
    part1: [
      '/media/assessment/speaking-section-1a.wav',
      '/media/assessment/speaking-section-1b.wav',
      '/media/assessment/speaking-section-1c.wav',
      '/media/assessment/speaking-section-1d.wav',
      '/media/assessment/speaking-section-1-end.wav'
    ],
    part2: [
      '/media/assessment/speaking-section-2.wav',
      '/media/assessment/speaking-section-2-mid.wav',
      '/media/assessment/speaking-section-2-end.wav'
    ],
    part3: [
      '/media/assessment/speaking-section-3a.wav',
      '/media/assessment/speaking-section-3b.wav',
      '/media/assessment/speaking-section-3c.wav',
      '/media/assessment/speaking-section-3-end.wav'
    ]
  };

  // Handle test start with opening audio sequence
  const handleStart = () => {
    setIsStarted(true);
    setCurrentPhase(Phase.SPEAKING_INTRO);
    
    // Play opening audio sequence
    const openingSequence = [
      { 
        src: AUDIO_FILES.opening[0], 
        message: "Hello, my name is Dr. Sarah Wilson and I'll be your examiner today.",
        delayAfter: 2000 
      },
      { 
        src: AUDIO_FILES.opening[1], 
        message: "Could you tell me your name, please?",
        delayAfter: 5000 
      },
      { 
        src: AUDIO_FILES.opening[2], 
        message: "Can I see your identification, please?",
        delayAfter: 10000 
      },
      { 
        src: AUDIO_FILES.opening[3], 
        message: "Let's begin with some questions about yourself.",
        onEnd: () => {
          // Move to Part 1 after opening sequence
          startPart1();
        }
      }
    ];
    
    playExaminerAudioSequence(openingSequence);
    
    toast.info('Speaking test started', {
      description: 'The examiner will guide you through the test.'
    });
  };

  // Start Part 1 with its questions
  const startPart1 = () => {
    setCurrentPhase(Phase.SPEAKING_PART1);
    setCurrentPart(1);
    setCurrentQuestion(0);
    
    // Get first question to display
    const questions = getCurrentPartQuestions();
    const firstQuestion = questions[0] || "Let's talk about where you live.";
    
    // Play Part 1 first question
    simulateExaminerSpeaking(
      firstQuestion, 
      AUDIO_FILES.part1[0], 
      3000, 
      Phase.SPEAKING_PART1
    );
  };

  // Handle Part 2 preparation
  const handlePrepare = (seconds: number) => {
    setCurrentPhase(Phase.SPEAKING_PART2_PREP);
    setTimeRemaining(seconds);
    
    const cueCardTopic = getCurrentPartQuestions()[0] || 
      "Describe a teacher who has influenced you in your education.";
    
    simulateExaminerSpeaking(
      cueCardTopic, 
      AUDIO_FILES.part2[0], 
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
        cueCardTopic, 
        AUDIO_FILES.part2[1], 
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
    if (currentPart === 1) {
      // Handle Part 1 questions
      if (currentQuestion < 3) {  // We have 4 questions (0-3) in part 1
        setCurrentQuestion(currentQuestion + 1);
        
        // Simulate examiner asking the next question with audio
        const nextQuestion = questions[currentQuestion + 1] || 
          `Question ${currentQuestion + 2} for part 1`;
        
        simulateExaminerSpeaking(
          nextQuestion, 
          AUDIO_FILES.part1[currentQuestion + 1], 
          3000, 
          Phase.SPEAKING_PART1
        );
      } 
      // End of Part 1
      else {
        setPartCompleted(prev => ({ ...prev, part1: true }));
        
        // Play end of part 1 audio
        simulateExaminerSpeaking(
          "Thank you. Now, let's move on to part 2.", 
          AUDIO_FILES.part1[4], 
          3000, 
          Phase.SPEAKING_PART1
        );
        
        // Move to Part 2
        setTimeout(() => {
          setCurrentPart(2);
          setCurrentQuestion(0);
          handlePrepare(60); // 60 seconds for Part 2 preparation
        }, 3000);
      }
    }
    // If this is the end of part 2
    else if (currentPart === 2) {
      setPartCompleted(prev => ({ ...prev, part2: true }));
      
      // Play end of part 2 audio
      simulateExaminerSpeaking(
        "Thank you. Let's move on to the final part.", 
        AUDIO_FILES.part2[2], 
        3000, 
        Phase.SPEAKING_PART2_ANSWER
      );
      
      // Move to Part 3
      setTimeout(() => {
        setCurrentPart(3);
        setCurrentQuestion(0);
        setCurrentPhase(Phase.SPEAKING_PART3);
        
        // Play first part 3 question
        const firstPart3Question = questions[0] || 
          "What qualities do you think are important for a good teacher?";
        
        simulateExaminerSpeaking(
          firstPart3Question, 
          AUDIO_FILES.part3[0], 
          3000, 
          Phase.SPEAKING_PART3
        );
      }, 3000);
    }
    // Handle Part 3 questions
    else if (currentPart === 3) {
      if (currentQuestion < 2) { // We have 3 questions (0-2) in part 3
        setCurrentQuestion(currentQuestion + 1);
        
        // Simulate examiner asking the next question with audio
        const nextQuestion = questions[currentQuestion + 1] || 
          `Question ${currentQuestion + 2} for part 3`;
        
        simulateExaminerSpeaking(
          nextQuestion, 
          AUDIO_FILES.part3[currentQuestion + 1], 
          3000, 
          Phase.SPEAKING_PART3
        );
      } 
      // End of Part 3 / End of test
      else {
        setPartCompleted(prev => ({ ...prev, part3: true }));
        handleComplete();
      }
    }
  };

  // Complete the test
  const handleComplete = () => {
    submitSection();
    
    // Play end of test audio
    simulateExaminerSpeaking(
      "That's the end of the speaking test. Thank you for your participation.", 
      AUDIO_FILES.part3[3], 
      3000,
      Phase.COMPLETED
    );
    
    setCurrentPhase(Phase.COMPLETED);
    completeTest();
    
    toast.success('Speaking test completed', {
      description: 'You have completed the IELTS speaking test!'
    });
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
