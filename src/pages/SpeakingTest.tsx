
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useTest } from '@/context/TestContext';
import Timer from '@/components/test/Timer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Mic, MicOff, Play, Square } from 'lucide-react';

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
  
  const [isStarted, setIsStarted] = useState(false);
  const [activeTab, setActiveTab] = useState("part1");
  const [isRecording, setIsRecording] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [partCompleted, setPartCompleted] = useState<Record<string, boolean>>({
    part1: false,
    part2: false,
    part3: false
  });
  const [transcripts, setTranscripts] = useState<Record<string, string>>({
    part1: "",
    part2: "",
    part3: ""
  });
  
  useEffect(() => {
    if (currentTest) {
      const speakingSection = currentTest.sections.find(section => section.type === 'speaking');
      if (speakingSection) {
        startSection(speakingSection.id);
      }
    }
  }, [currentTest, startSection]);

  const speakingSection = currentTest?.sections.find(section => section.type === 'speaking');
  const speakingContent = speakingSection?.content as any;

  const handleStart = () => {
    setIsStarted(true);
    toast.info('Speaking test started', {
      description: 'You will be guided through three parts of the speaking test.'
    });
  };

  const handleStartRecording = (partId: string) => {
    setIsRecording(true);
    toast.info('Recording started', {
      description: 'Speak clearly and answer the questions thoroughly.'
    });
    
    // In a real app, this would start an actual recording
    // For this demo, we'll just simulate it
  };

  const handleStopRecording = (partId: string) => {
    setIsRecording(false);
    
    // In a real app, this would stop the recording and process it
    // For this demo, we'll simulate getting a transcript
    
    // Mock transcripts for demo purposes
    const mockTranscripts = {
      part1: "Hi, my name is Sarah Johnson. I'm from Melbourne, Australia. I'm currently a student at the University of Melbourne studying computer science. I really enjoy the practical aspects of my studies, especially when we get to build real applications. My hometown is known for its cultural diversity and great coffee. Yes, it has changed quite a bit since I was a child, with more high-rise buildings and a larger population. I do enjoy listening to music, particularly indie rock and classical. I usually listen to music when I'm studying or commuting to university. I think the type of music someone listens to can reflect certain aspects of their personality, though not completely.",
      part2: "The teacher who influenced me the most was my high school mathematics teacher, Mr. Richards. He taught advanced mathematics and was known for his unique teaching style. What made him special was his passion for the subject and his ability to explain complex concepts in simple ways. He never just gave us the answers; he taught us how to think. He influenced me greatly because he showed me that mathematics wasn't just about numbers, but about logical thinking and problem-solving. His encouragement led me to pursue a degree in a field that requires strong analytical skills. Even today, I apply the thinking strategies he taught me.",
      part3: "I believe the qualities of a good teacher include patience, deep knowledge of their subject, adaptability to different learning styles, and the ability to inspire students. Yes, the role of teachers has definitely changed in recent years with the integration of technology in education. They're now more like guides or facilitators rather than just information providers. Both teachers and parents play crucial roles in educating children, but in different ways. Parents provide foundational values and social skills, while teachers offer structured knowledge and broader perspectives. As for computers replacing teachers, I don't think it will happen completely. Technology can deliver information, but the human aspects of teaching—inspiration, mentorship, emotional support—cannot be replicated by machines."
    };

    setTranscripts(prev => ({ 
      ...prev, 
      [partId]: mockTranscripts[partId as keyof typeof mockTranscripts] || "Your answer has been recorded."
    }));
    
    setPartCompleted(prev => ({ ...prev, [partId]: true }));
    
    toast.success('Recording saved', {
      description: 'Your response has been recorded successfully.'
    });
    
    // Save the transcript as the answer
    if (speakingContent && speakingContent.parts) {
      const part = speakingContent.parts.find((p: any) => `part${p.partNumber}` === partId);
      if (part) {
        saveAnswer(part.id, mockTranscripts[partId as keyof typeof mockTranscripts] || "");
      }
    }
  };

  const handlePrepare = (seconds: number) => {
    setIsPreparing(true);
    setTimeRemaining(seconds);
    
    toast.info('Preparation time started', {
      description: `You have ${seconds / 60} minutes to prepare your answer.`
    });
    
    // After preparation time is up, automatically move to recording
    setTimeout(() => {
      setIsPreparing(false);
      toast.info('Preparation time is over', {
        description: 'You can now start recording your answer.'
      });
    }, seconds * 1000);
  };

  const handleSubmit = () => {
    submitSection();
    completeTest(); // Complete the entire test
    
    toast.success('Speaking test completed', {
      description: 'You have completed all sections of the IELTS test!'
    });
    
    navigate('/results');
  };

  const allPartsCompleted = partCompleted.part1 && partCompleted.part2 && partCompleted.part3;

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
                  <li>The speaking test consists of three parts.</li>
                  <li>Part 1 (4-5 minutes): Introduction and general questions about familiar topics.</li>
                  <li>Part 2 (3-4 minutes): You will be given a topic to speak about for 1-2 minutes with 1 minute preparation time.</li>
                  <li>Part 3 (4-5 minutes): More abstract questions related to the Part 2 topic.</li>
                  <li>Speak clearly and provide detailed responses.</li>
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
              <h1 className="text-2xl font-bold">IELTS Speaking Test</h1>
              {isPreparing && <Timer />}
            </div>

            <Tabs 
              defaultValue="part1" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="part1">Part 1</TabsTrigger>
                <TabsTrigger value="part2">Part 2</TabsTrigger>
                <TabsTrigger value="part3">Part 3</TabsTrigger>
              </TabsList>
              
              {speakingContent.parts.map((part: any, index: number) => {
                const partId = `part${part.partNumber}`;
                const isCompleted = partCompleted[partId];
                
                return (
                  <TabsContent key={part.id} value={partId}>
                    <Card className="bg-white shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">
                          Part {part.partNumber}: {part.partNumber === 1 ? "Introduction & General Topics" : 
                                                part.partNumber === 2 ? "Individual Long Turn" : 
                                                "Discussion"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-red-50 p-4 rounded-md">
                          <p className="text-slate-800">{part.introduction}</p>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="font-medium">Questions:</h3>
                          <ul className="space-y-2 list-decimal list-inside">
                            {part.questions.map((question: string, qIndex: number) => (
                              <li key={qIndex} className="text-slate-800">
                                {question}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {part.partNumber === 2 && !isPreparing && !isRecording && !isCompleted && (
                          <Button 
                            onClick={() => handlePrepare(part.preparationTimeInSeconds || 60)}
                            className="bg-orange-500 hover:bg-orange-600"
                          >
                            Start Preparation Time ({part.preparationTimeInSeconds || 60} seconds)
                          </Button>
                        )}

                        <div className="flex justify-center mt-6">
                          {!isRecording && !isCompleted && (
                            <Button
                              onClick={() => handleStartRecording(partId)}
                              disabled={part.partNumber === 2 && !isPreparing && !isCompleted}
                              className="bg-red-500 hover:bg-red-600 flex items-center gap-2"
                            >
                              <Mic className="h-4 w-4" />
                              Start Recording
                            </Button>
                          )}

                          {isRecording && (
                            <Button
                              onClick={() => handleStopRecording(partId)}
                              variant="destructive"
                              className="flex items-center gap-2"
                            >
                              <MicOff className="h-4 w-4" />
                              Stop Recording
                            </Button>
                          )}
                        </div>
                        
                        {isCompleted && (
                          <div className="mt-6 space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">Your Response</h3>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Completed
                              </span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-md max-h-60 overflow-y-auto">
                              <p className="text-slate-700">{transcripts[partId]}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                );
              })}
            </Tabs>

            <div className="flex justify-between pt-6 border-t sticky bottom-0 bg-white p-4 -mx-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  if (activeTab === "part1") setActiveTab("part2");
                  else if (activeTab === "part2") setActiveTab("part3");
                  else setActiveTab("part1");
                }}
              >
                {activeTab === "part1" ? "Next Part" : 
                 activeTab === "part2" ? "Next Part" : "First Part"}
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!allPartsCompleted}
                className="bg-ielts-red hover:bg-ielts-blue"
              >
                Complete Test
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SpeakingTest;
