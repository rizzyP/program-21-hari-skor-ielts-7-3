
import { useNavigate } from 'react-router-dom';
import { useTest } from '@/context/TestContext';
import { toast } from 'sonner';
import { Phase } from '@/components/test/TestPhases';
import { AUDIO_FILES, FIXED_PART1_QUESTIONS, FIXED_PART3_QUESTIONS } from '@/constants/speakingTestData';

// Custom hook for speaking test part handlers
export const useSpeakingHandlers = (
  setCurrentPhase: (value: Phase) => void,
  setIsStarted: (value: boolean) => void,
  setCurrentPart: (value: number) => void,
  setCurrentQuestion: (value: number) => void,
  setPartCompleted: (value: React.SetStateAction<Record<string, boolean>>) => void,
  setWaitingForRecording: (value: boolean) => void,
  simulateExaminerSpeaking: (message: string, audioFile: string | null, duration: number, currentPhase: Phase) => Promise<void> | void,
  playExaminerAudioSequence: (audioSequence: {src: string, message: string, delayAfter?: number, onEnd?: () => void}[]) => Promise<void>,
  setTimeRemaining: (seconds: number) => void
) => {
  const navigate = useNavigate();
  const { submitSection, completeTest } = useTest();

  // Handle test start with opening audio sequence
  const handleStart = async () => {
    setIsStarted(true);
    setCurrentPhase(Phase.SPEAKING_INTRO);
    
    // Play opening audio sequence with specific delays
    const openingSequence = [
      { 
        src: AUDIO_FILES.opening[0], 
        message: "Hello, my name is Dr. Sarah Wilson and I'll be your examiner today.",
        delayAfter: 1000 // 1 second delay
      },
      { 
        src: AUDIO_FILES.opening[1], 
        message: "Could you tell me your name, please?",
        delayAfter: 2500 // 2.5 seconds delay  
      },
      { 
        src: AUDIO_FILES.opening[2], 
        message: "Can I see your identification, please?",
        delayAfter: 3000 // 3 seconds delay
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

  // Start Part 1 
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

  // Handle Part 2 preparation
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
        
        // Call simulateExaminerSpeaking as async function
        const performSpeaking = async () => {
          try {
            await simulateExaminerSpeaking(
              cueCardTopic, 
              AUDIO_FILES.part2[1], 
              3000,
              Phase.SPEAKING_PART2_ANSWER
            );
            // Start recording after audio finishes
            setWaitingForRecording(true);
          } catch (error) {
            console.error("Error in examiner speaking:", error);
            setWaitingForRecording(true);
          }
        };
        
        // Execute the async function
        performSpeaking();
        
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

  // Start Part 3
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
    startPart1,
    startPart3,
    handleComplete,
    handleNavigateResults
  };
};
