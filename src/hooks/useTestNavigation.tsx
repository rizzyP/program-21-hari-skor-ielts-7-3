
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
    ]
  };

  // Fixed part 1 questions that correspond to each audio file
  const FIXED_PART1_QUESTIONS = [
    "Do you have any artistic hobbies, such as painting? (Why/Why not?)",
    "What kind of art lessons did you have at school?",
    "Are these lessons quite traditional or quite new?",
    "How useful do you think it is to study art at school? (Why/Why not?)"
  ];

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
    
    // Use the fixed question for part 1 instead of from content
    const firstQuestion = FIXED_PART1_QUESTIONS[0];
    
    // Play Part 1 first question with callback to start recording after
    simulateExaminerSpeaking(
      firstQuestion, 
      AUDIO_FILES.part1[0], 
      3000, 
      Phase.SPEAKING_PART1
    );
  };

  // Handle moving to next question
  const handleNextQuestion = () => {
    // Update overall question counter
    setQuestionNumber(prev => prev + 1);
    
    // If there are more questions in part 1
    if (currentQuestion < 3) {  // We have 4 questions (0-3) in part 1
      setCurrentQuestion(currentQuestion + 1);
      
      // Simulate examiner asking the next question with audio
      // Use fixed part 1 questions that match the audio files
      const nextQuestion = FIXED_PART1_QUESTIONS[currentQuestion + 1];
      
      simulateExaminerSpeaking(
        nextQuestion, 
        AUDIO_FILES.part1[currentQuestion + 1], 
        3000, 
        Phase.SPEAKING_PART1
      );
    } 
    // End of Part 1 (and end of test since we're removing Parts 2 and 3)
    else {
      setPartCompleted(prev => ({ ...prev, part1: true }));
      
      // Play end of part 1 audio
      simulateExaminerSpeaking(
        "Thank you. That's the end of the speaking test.", 
        AUDIO_FILES.part1[4], 
        3000, 
        Phase.SPEAKING_PART1
      );
      
      // End the test after a short delay
      setTimeout(() => {
        handleComplete();
      }, 3000);
    }
  };

  // Complete the test
  const handleComplete = () => {
    submitSection();
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
    handleNextQuestion,
    handleComplete,
    handleNavigateResults
  };
};
