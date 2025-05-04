
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useTest } from '@/context/TestContext';
import Timer from '@/components/test/Timer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Mic, MicOff, Play, ChevronRight, Clock, Square } from 'lucide-react';
import { TestPhases, Phase } from '@/components/test/TestPhases';
import { cn } from '@/lib/utils';

const SpeakingTest = () => {
  const navigate = useNavigate();
  const { 
    currentTest, 
    startSection, 
    saveAnswer, 
    submitSection, 
    completeTest,
    setTimeRemaining,
  } = useTest();
  
  // Test flow states
  const [currentPhase, setCurrentPhase] = useState<Phase>(Phase.INSTRUCTIONS);
  const [isStarted, setIsStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [currentPart, setCurrentPart] = useState<number>(1);
  const [transcripts, setTranscripts] = useState<Record<string, string>>({});
  const [showNextButton, setShowNextButton] = useState(false);
  const [partCompleted, setPartCompleted] = useState<Record<string, boolean>>({
    part1: false,
    part2: false,
    part3: false
  });
  
  // Animation states
  const [fadeIn, setFadeIn] = useState(false);
  const [examinerMessage, setExaminerMessage] = useState("");
  
  useEffect(() => {
    if (currentTest) {
      const speakingSection = currentTest.sections.find(section => section.type === 'speaking');
      if (speakingSection) {
        startSection(speakingSection.id);
      }
    }
  }, [currentTest, startSection]);

  useEffect(() => {
    setFadeIn(true);
    const timer = setTimeout(() => setFadeIn(false), 300);
    return () => clearTimeout(timer);
  }, [currentQuestion, currentPart, currentPhase]);

  const speakingSection = currentTest?.sections.find(section => section.type === 'speaking');
  const speakingContent = speakingSection?.content as any;

  // Get current part questions
  const getCurrentPartQuestions = () => {
    if (!speakingContent || !speakingContent.parts) return [];
    return speakingContent.parts.find((p: any) => p.partNumber === currentPart)?.questions || [];
  };

  // Get current question
  const getCurrentQuestion = () => {
    const questions = getCurrentPartQuestions();
    return questions[currentQuestion] || "";
  };

  // Handle test start
  const handleStart = () => {
    setIsStarted(true);
    setCurrentPhase(Phase.SPEAKING_INTRO);
    
    // Set initial examiner message
    setExaminerMessage("Hello, my name is Dr. Sarah Wilson and I'll be your examiner today. Let's begin with some questions about yourself.");
    
    setTimeout(() => {
      setCurrentPhase(Phase.SPEAKING_PART1);
      setExaminerMessage("Let's start Part 1 of the test. I'll ask you some questions about yourself.");
      setTimeout(() => {
        setExaminerMessage(getCurrentQuestion());
      }, 2500);
    }, 4000);
    
    toast.info('Speaking test started', {
      description: 'The examiner will guide you through the test.'
    });
  };

  // Handle recording
  const handleStartRecording = () => {
    setIsRecording(true);
    toast.info('Recording started', {
      description: 'Speak clearly and answer the question.'
    });
    
    // In a real app, this would start an actual recording
    // For this demo, we'll just simulate it
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    
    // In a real app, this would stop the recording and process it
    // For this demo, we'll simulate getting a transcript
    
    // Mock transcripts for demo purposes with different responses for each question
    const mockResponses = {
      part1: [
        "My name is Sarah Johnson. I'm from Melbourne, Australia.",
        "I'm currently studying computer science at the University of Melbourne.",
        "Yes, I enjoy listening to music, particularly indie rock and classical music when I'm studying.",
        "My hometown is known for its cultural diversity and great coffee scene.",
        "It has changed quite a bit since I was a child, with more high-rise buildings now."
      ],
      part2: [
        "The teacher who influenced me the most was my high school mathematics teacher, Mr. Richards. He taught advanced mathematics and was known for his unique teaching style. What made him special was his passion for the subject and his ability to explain complex concepts in simple ways. He never just gave us the answers; he taught us how to think. He influenced me greatly because he showed me that mathematics wasn't just about numbers, but about logical thinking and problem-solving. His encouragement led me to pursue a degree in a field that requires strong analytical skills. Even today, I apply the thinking strategies he taught me."
      ],
      part3: [
        "I believe the qualities of a good teacher include patience, deep knowledge of their subject, and the ability to inspire students.",
        "Yes, the role of teachers has definitely changed in recent years with the integration of technology in education.",
        "Both teachers and parents play crucial roles in educating children, but in different ways.",
        "I don't think computers will completely replace teachers because the human aspects of teaching—inspiration, mentorship, emotional support—cannot be replicated."
      ]
    };

    const partKey = `part${currentPart}` as keyof typeof mockResponses;
    const responseIndex = Math.min(currentQuestion, (mockResponses[partKey]?.length || 1) - 1);
    const response = mockResponses[partKey]?.[responseIndex] || "Your answer has been recorded.";

    // Save transcript
    const questionKey = `p${currentPart}q${currentQuestion}`;
    setTranscripts(prev => ({ ...prev, [questionKey]: response }));
    
    // Show next button
    setShowNextButton(true);
    
    // Save answer
    if (speakingContent && speakingContent.parts) {
      const part = speakingContent.parts.find((p: any) => p.partNumber === currentPart);
      if (part) {
        saveAnswer(`${part.id}-q${currentQuestion}`, response);
      }
    }
    
    toast.success('Response recorded', {
      description: 'Your answer has been saved.'
    });
  };

  // Handle Part 2 preparation
  const handlePrepare = (seconds: number) => {
    setCurrentPhase(Phase.SPEAKING_PART2_PREP);
    setTimeRemaining(seconds);
    setExaminerMessage("Now, I'm going to give you a topic. You'll have one minute to prepare and then you should speak for 1-2 minutes. Here is some paper and a pencil to make notes if you wish. Here is your topic:");
    
    toast.info('Preparation time started', {
      description: `You have ${seconds / 60} minutes to prepare your answer.`
    });
    
    // After preparation time is up, automatically move to recording
    setTimeout(() => {
      setCurrentPhase(Phase.SPEAKING_PART2_ANSWER);
      setExaminerMessage("Now, please speak about the topic for 1-2 minutes.");
      
      toast.info('Preparation time is over', {
        description: 'You can now start recording your answer.'
      });
      
      // Set a timer for the speaking duration
      setTimeRemaining(120); // 2 minutes for speaking
    }, seconds * 1000);
  };

  // Handle moving to next question
  const handleNextQuestion = () => {
    const questions = getCurrentPartQuestions();
    
    // If there are more questions in this part
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowNextButton(false);
      
      // Fade animation for question transition
      setTimeout(() => {
        setExaminerMessage(questions[currentQuestion + 1]);
      }, 300);
    } 
    // If this is the end of part 1
    else if (currentPart === 1) {
      setPartCompleted(prev => ({ ...prev, part1: true }));
      setCurrentPart(2);
      setCurrentQuestion(0);
      setShowNextButton(false);
      handlePrepare(60); // 60 seconds for Part 2 preparation
    }
    // If this is the end of part 2
    else if (currentPart === 2) {
      setPartCompleted(prev => ({ ...prev, part2: true }));
      setCurrentPart(3);
      setCurrentQuestion(0);
      setCurrentPhase(Phase.SPEAKING_PART3);
      setShowNextButton(false);
      
      // Transition to Part 3
      setExaminerMessage("Let's talk more about this topic. I'll ask you some more questions.");
      setTimeout(() => {
        setExaminerMessage(speakingContent?.parts.find((p: any) => p.partNumber === 3)?.questions[0] || "");
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
      setShowNextButton(false);
      
      // Fade animation for question transition
      setTimeout(() => {
        setExaminerMessage(questions[currentQuestion + 1]);
      }, 300);
    }
  };

  // Complete the test
  const handleComplete = () => {
    submitSection();
    completeTest();
    setCurrentPhase(Phase.COMPLETED);
    setExaminerMessage("That's the end of the speaking test. Thank you for your participation.");
    
    toast.success('Speaking test completed', {
      description: 'You have completed the IELTS speaking test!'
    });
    
    setTimeout(() => {
      navigate('/results');
    }, 3000);
  };

  // Mock examiner avatar component
  const ExaminerAvatar = () => (
    <Avatar className="w-16 h-16 border-2 border-ielts-red">
      <AvatarImage src="https://i.pravatar.cc/150?img=58" alt="Examiner" />
      <AvatarFallback>SW</AvatarFallback>
    </Avatar>
  );
  
  // Part 2 cue card component
  const CueCard = () => {
    const part2 = speakingContent?.parts.find((p: any) => p.partNumber === 2);
    const topic = part2?.questions[0] || "";
    const bulletPoints = [
      "when this was",
      "who the teacher was",
      "what subject they taught",
      "why they influenced you so much"
    ];
    
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 my-4">
        <p className="font-medium mb-2">{topic}</p>
        <p className="text-sm mb-3">You should say:</p>
        <ul className="list-disc list-inside text-sm space-y-1">
          {bulletPoints.map((point, index) => (
            <li key={index} className="text-slate-700">{point}</li>
          ))}
        </ul>
        <p className="text-sm mt-3">You will have 1 minute to prepare. Then you'll need to talk for 1-2 minutes.</p>
      </div>
    );
  };

  if (!speakingSection || !speakingContent) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p>Loading speaking test...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="pb-16">
      <div className="max-w-4xl mx-auto space-y-6">
        {!isStarted ? (
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-center">IELTS Speaking Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-red-50 p-4 rounded-md">
                <h3 className="font-medium text-lg mb-2">Instructions:</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-700">
                  <li>This is a simulation of the IELTS Speaking Test.</li>
                  <li>You'll interact with a simulated examiner who will ask you questions.</li>
                  <li>The test consists of three parts:</li>
                  <li>Part 1 (4-5 minutes): Introduction and questions on familiar topics.</li>
                  <li>Part 2 (3-4 minutes): A longer talk on a specific topic with 1 minute preparation time.</li>
                  <li>Part 3 (4-5 minutes): A discussion related to the Part 2 topic.</li>
                  <li>Speak clearly and provide detailed responses as you would in a real test.</li>
                </ul>
              </div>
              <div className="text-center">
                <Button onClick={handleStart} size="lg" className="bg-ielts-red hover:bg-ielts-blue">
                  Start Speaking Test
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <TestPhases currentPhase={currentPhase} currentSection={1} totalSections={1} />
              {(currentPhase === Phase.SPEAKING_PART2_PREP || currentPhase === Phase.SPEAKING_PART2_ANSWER) && <Timer />}
            </div>

            <Card className="bg-white shadow-md overflow-hidden">
              <CardHeader className="bg-slate-50 border-b">
                <div className="flex items-center space-x-4">
                  <ExaminerAvatar />
                  <div>
                    <h3 className="font-medium">Dr. Sarah Wilson</h3>
                    <p className="text-sm text-slate-600">IELTS Speaking Examiner</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6 pb-4">
                {/* Examiner speech bubble */}
                <div className="flex mb-6">
                  <div className={cn(
                    "bg-slate-100 p-3 rounded-lg max-w-[85%] text-slate-800 transition-opacity duration-300",
                    fadeIn ? "opacity-100" : "opacity-0"
                  )}>
                    {examinerMessage}
                    
                    {/* Show cue card in Part 2 */}
                    {currentPhase === Phase.SPEAKING_PART2_PREP && <CueCard />}
                  </div>
                </div>
                
                {/* User response area */}
                {showNextButton ? (
                  <div className="bg-blue-50 p-3 rounded-lg ml-auto max-w-[85%] text-slate-700">
                    {transcripts[`p${currentPart}q${currentQuestion}`]}
                  </div>
                ) : (
                  <div className="flex justify-center mt-6">
                    {!isRecording ? (
                      <Button
                        onClick={handleStartRecording}
                        disabled={currentPhase === Phase.SPEAKING_INTRO}
                        className={cn(
                          "bg-red-500 hover:bg-red-600 flex items-center gap-2",
                          currentPhase === Phase.SPEAKING_INTRO && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <Mic className="h-4 w-4" />
                        {currentPhase === Phase.SPEAKING_INTRO ? "Please wait..." : "Start Speaking"}
                      </Button>
                    ) : (
                      <Button
                        onClick={handleStopRecording}
                        variant="destructive"
                        className="flex items-center gap-2"
                      >
                        <Square className="h-4 w-4" />
                        Stop Speaking
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-end border-t bg-slate-50 py-3">
                {showNextButton && (
                  <Button 
                    onClick={handleNextQuestion}
                    className="flex items-center gap-2 bg-ielts-red hover:bg-ielts-blue"
                  >
                    {currentPart === 3 && currentQuestion >= getCurrentPartQuestions().length - 1 ? 
                      "Complete Test" : "Next Question"}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            {/* Progress indicator */}
            <div className="flex justify-between items-center py-2">
              <div className="text-sm text-slate-500">
                {currentPhase !== Phase.INSTRUCTIONS && 
                 currentPhase !== Phase.COMPLETED && 
                 currentPhase !== Phase.SPEAKING_INTRO && (
                  <>Part {currentPart} - Question {currentQuestion + 1} of {getCurrentPartQuestions().length}</>
                )}
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3].map(part => (
                  <div 
                    key={part} 
                    className={cn(
                      "h-2 w-8 rounded",
                      currentPart === part ? "bg-ielts-red" : 
                      partCompleted[`part${part}`] ? "bg-green-500" : "bg-slate-200"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SpeakingTest;
