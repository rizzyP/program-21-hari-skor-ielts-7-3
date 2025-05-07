
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
  currentPhase: Phase,
  setWaitingForRecording: (value: boolean) => void
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

  // Fixed part 1 questions that correspond to each audio file
  const FIXED_PART1_QUESTIONS = [
    "Do you have any artistic hobbies, such as painting? (Why/Why not?)",
    "What kind of art lessons did you have at school?",
    "Are these lessons quite traditional or quite new?", 
    "How useful do you think it is to study art at school? (Why/Why not?)"
  ];

  // Fixed part 3 questions that correspond to audio files
  const FIXED_PART3_QUESTIONS = [
    "What qualities do you think are important for a good teacher?",
    "How has education changed in your country in the last few decades?",
    "Do you think technology will eventually replace teachers in the classroom?"
  ];

  // Handle test start with opening audio sequence per exact requirements
  const handleStart = async () => {
    setIsStarted(true);
    setCurrentPhase(Phase.SPEAKING_INTRO);
    
    // Play opening audio sequence with exact specified delays
    const openingSequence = [
      { 
        src: AUDIO_FILES.opening[0], 
        message: "Hello, my name is Dr. Sarah Wilson and I'll be your examiner today.",
        delayAfter: 1000 // 1 second delay
      },
      { 
        src: AUDIO_FILES.opening[1], 
        message: "Could you tell me your name, please?",
        delayAfter: 3000 // 3 seconds delay  
      },
      { 
        src: AUDIO_FILES.opening[2], 
        message: "Can I see your identification, please?",
        delayAfter: 4000 // 4 seconds delay
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
    
    try {
      await playExaminerAudioSequence(openingSequence);
    } catch (error) {
      console.error("Error playing opening sequence:", error);
      // Fallback in case of error
      startPart1();
    }
    
    toast.info('Speaking test started', {
      description: 'The examiner will guide you through the test.'
    });
  };

  // Start Part 1 with each question following the specified flow
  const startPart1 = async () => {
    setCurrentPhase(Phase.SPEAKING_PART1);
    setCurrentPart(1);
    setCurrentQuestion(0);
    
    try {
      // Play the first part 1 audio
      await simulateExaminerSpeaking(
        FIXED_PART1_QUESTIONS[0], 
        AUDIO_FILES.part1[0], 
        3000, 
        Phase.SPEAKING_PART1
      );
      
      // Set flag to start recording after audio completes
      setWaitingForRecording(true);
    } catch (error) {
      console.error("Error starting Part 1:", error);
      // Fallback in case of error
      setWaitingForRecording(true);
    }
  };

  // Handle Part 2 preparation - Following specified flow
  const handlePrepare = async () => {
    setCurrentPhase(Phase.SPEAKING_PART2_PREP);
    
    const cueCardTopic = "Describe a teacher who has influenced you in your education.";
    
    try {
      // Play the part 2 introduction audio first
      await simulateExaminerSpeaking(
        cueCardTopic, 
        AUDIO_FILES.part2[0], 
        3000,
        Phase.SPEAKING_PART2_PREP
      );
      
      // Start the 1-minute preparation timer after audio completes
      setTimeRemaining(60);
      toast.info('Preparation time started', {
        description: 'You have 1 minute to prepare your answer.'
      });
      
      // After preparation time is up, play the mid audio and start Part 2 answer phase
      setTimeout(() => {
        setCurrentPhase(Phase.SPEAKING_PART2_ANSWER);
        
        simulateExaminerSpeaking(
          cueCardTopic, 
          AUDIO_FILES.part2[1], 
          3000,
          Phase.SPEAKING_PART2_ANSWER
        ).then(() => {
          // Start recording after audio finishes
          setWaitingForRecording(true);
        });
        
        toast.info('Preparation time is over', {
          description: 'Start speaking when the examiner finishes.'
        });
      }, 60 * 1000);
    } catch (error) {
      console.error("Error handling Part 2 preparation:", error);
      // Fallback
      setCurrentPhase(Phase.SPEAKING_PART2_ANSWER);
      setWaitingForRecording(true);
    }
  };

  // Handle moving to next question according to the specified flow
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
          setCurrentPart(2);
          setCurrentQuestion(0);
          handlePrepare(); // Start Part 2 preparation
        } catch (error) {
          console.error("Error ending Part 1:", error);
          // Fallback
          setCurrentPart(2);
          setCurrentQuestion(0);
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
  
  // Start Part 3 with its questions according to the flow
  const startPart3 = async () => {
    setCurrentPart(3);
    setCurrentQuestion(0);
    setCurrentPhase(Phase.SPEAKING_PART3);
    
    try {
      // Play first part 3 question
      await simulateExaminerSpeaking(
        FIXED_PART3_QUESTIONS[0], 
        AUDIO_FILES.part3[0], 
        3000, 
        Phase.SPEAKING_PART3
      );
      
      // Set flag to start recording after audio completes
      setWaitingForRecording(true);
    } catch (error) {
      console.error("Error starting Part 3:", error);
      // Fallback
      setWaitingForRecording(true);
    }
  };

  // Complete the test
  const handleComplete = async () => {
    submitSection();
    
    try {
      // Play end of test audio
      await simulateExaminerSpeaking(
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
    } catch (error) {
      console.error("Error completing test:", error);
      // Fallback
      setCurrentPhase(Phase.COMPLETED);
      completeTest();
    }
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
