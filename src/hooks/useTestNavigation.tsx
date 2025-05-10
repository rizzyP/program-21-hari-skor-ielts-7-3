
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
  getCurrentPartQuestions: () => string[],
  currentPart: number,
  currentQuestion: number,
  currentPhase: Phase
) => {
  const navigate = useNavigate();
  const { submitSection, completeTest } = useTest();

  // Audio file paths with public URL prefix to ensure they're found
  const AUDIO_FILES = {
    opening: [
      '/media/assessment/speaking-section-opening-1.wav'
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

  // Fixed questions for all parts
  const FIXED_PART1_QUESTIONS = [
    "Do you have any artistic hobbies, such as painting? (Why/Why not?)",
    "What kind of art lessons did you have at school?",
    "Are these lessons quite traditional or quite new?",
    "How useful do you think it is to study art at school? (Why/Why not?)"
  ];
  
  const FIXED_PART2_QUESTION = "Describe a time when you helped someone. You should say: who you helped, how you helped this person, why this person needed help, and explain how you felt about helping this person.";
  
  const FIXED_PART3_QUESTIONS = [
    "Do you think young people today are more or less willing to help others compared to the past?",
    "What are some of the reasons why people may be unwilling to help others?",
    "Do you think wealthy nations should do more to help poorer countries?"
  ];

  // Handle test start with opening audio
  const handleStart = () => {
    setIsStarted(true);
    setCurrentPhase(Phase.SPEAKING_INTRO);
    
    // Show first examiner message with audio file - manual play only
    simulateExaminerSpeaking(
      "Hello, my name is Dr. Sarah Wilson and I'll be your examiner today.",
      AUDIO_FILES.opening[0],
      3000,
      Phase.SPEAKING_INTRO
    );
    
    toast.info('Speaking test started', {
      description: 'Click the play button to hear the examiner instructions.'
    });
  };

  // Start Part 1 with its questions
  const startPart1 = () => {
    setCurrentPhase(Phase.SPEAKING_PART1);
    setCurrentPart(1);
    setCurrentQuestion(0);
    
    // Use the fixed question for part 1
    const firstQuestion = FIXED_PART1_QUESTIONS[0];
    
    // Set up Part 1 first question with audio - manual play only
    simulateExaminerSpeaking(
      firstQuestion, 
      AUDIO_FILES.part1[0], 
      3000, 
      Phase.SPEAKING_PART1
    );
    
    toast.info('Part 1 started', {
      description: 'Click play to hear the first question.'
    });
  };
  
  // Start Part 2 with cue card
  const startPart2 = () => {
    setCurrentPhase(Phase.SPEAKING_PART2);
    setCurrentPart(2);
    setCurrentQuestion(0);
    
    // Set up Part 2 question with audio - manual play only
    simulateExaminerSpeaking(
      "In this part, I'm going to give you a topic and I'd like you to talk about it for one to two minutes. Before you talk, you'll have one minute to think about what you're going to say. You can make some notes if you wish.",
      AUDIO_FILES.part2[0],
      3000,
      Phase.SPEAKING_PART2
    );
    
    toast.info('Part 2 started', {
      description: 'Click play to hear the instructions.'
    });
  };
  
  // Show cue card and start preparation timer
  const showCueCardAndStartPreparation = () => {
    simulateExaminerSpeaking(
      FIXED_PART2_QUESTION,
      null,
      3000,
      Phase.SPEAKING_PART2
    );
    
    toast.info('Preparation time started', {
      description: 'You have one minute to prepare.'
    });
  };
  
  // Start speaking for Part 2 after preparation
  const startPart2Speaking = () => {
    simulateExaminerSpeaking(
      "Now, can you start speaking about the topic?",
      AUDIO_FILES.part2[1],
      3000,
      Phase.SPEAKING_PART2
    );
  };
  
  // Start Part 3 with its questions
  const startPart3 = () => {
    setCurrentPhase(Phase.SPEAKING_PART3);
    setCurrentPart(3);
    setCurrentQuestion(0);
    
    // Set up Part 3 first question with audio - manual play only
    const firstQuestion = FIXED_PART3_QUESTIONS[0];
    
    simulateExaminerSpeaking(
      "We've been talking about helping others. I'd like to discuss this subject with you a bit more.",
      AUDIO_FILES.part3[0],
      3000,
      Phase.SPEAKING_PART3
    );
    
    toast.info('Part 3 started', {
      description: 'Click play to hear the question.'
    });
  };

  // Handle moving to next question within the current part
  const handleNextQuestion = () => {
    // Update overall question counter
    setQuestionNumber(prev => prev + 1);
    
    // Part 1 question sequence
    if (currentPhase === Phase.SPEAKING_PART1) {
      if (currentQuestion < 3) { // Questions 0-3 for part 1 (0-indexed)
        setCurrentQuestion(currentQuestion + 1);
        
        // Simulate examiner asking the next question with audio
        const nextQuestion = FIXED_PART1_QUESTIONS[currentQuestion + 1];
        
        simulateExaminerSpeaking(
          nextQuestion,
          AUDIO_FILES.part1[currentQuestion + 1],
          3000,
          Phase.SPEAKING_PART1
        );
      } else {
        // End of Part 1
        setPartCompleted(prev => ({ ...prev, part1: true }));
        
        // Play end of part 1 audio
        simulateExaminerSpeaking(
          "Thank you. That is the end of Part 1.",
          AUDIO_FILES.part1[4],
          3000,
          Phase.SPEAKING_PART1
        );
      }
    }
    // Part 3 question sequence
    else if (currentPhase === Phase.SPEAKING_PART3) {
      if (currentQuestion < 2) { // Questions 0-2 for part 3 (0-indexed)
        setCurrentQuestion(currentQuestion + 1);
        
        // Simulate examiner asking the next question with audio
        const nextQuestion = FIXED_PART3_QUESTIONS[currentQuestion + 1];
        
        simulateExaminerSpeaking(
          nextQuestion,
          AUDIO_FILES.part3[currentQuestion + 1],
          3000,
          Phase.SPEAKING_PART3
        );
      } else {
        // End of Part 3 and test
        setPartCompleted(prev => ({ ...prev, part3: true }));
        
        // Play end of test audio
        simulateExaminerSpeaking(
          "Thank you. That is the end of the speaking test.",
          AUDIO_FILES.part3[3],
          3000,
          Phase.SPEAKING_PART3
        );
      }
    }
  };

  // Complete Part 2 after speaking
  const completePart2 = () => {
    setPartCompleted(prev => ({ ...prev, part2: true }));
    
    // Play end of part 2 audio
    simulateExaminerSpeaking(
      "Thank you. That is the end of Part 2.",
      AUDIO_FILES.part2[2],
      3000,
      Phase.SPEAKING_PART2
    );
  };

  // Complete the test
  const handleComplete = () => {
    submitSection();
    setCurrentPhase(Phase.COMPLETED);
    completeTest();
    
    toast.success('Speaking test completed', {
      description: 'You have completed the IELTS speaking test!'
    });
    
    // Navigate to results after a delay
    setTimeout(() => {
      handleNavigateResults();
    }, 2000);
  };

  const handleNavigateResults = () => {
    navigate('/results');
  };

  return {
    handleStart,
    handleNextQuestion,
    startPart1,
    startPart2,
    startPart3,
    showCueCardAndStartPreparation,
    startPart2Speaking,
    completePart2,
    handleComplete,
    handleNavigateResults
  };
};
