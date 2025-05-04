
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useTest } from '@/context/TestContext';
import Timer from '@/components/test/Timer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const ListeningTest = () => {
  const navigate = useNavigate();
  const { 
    currentTest, 
    startSection, 
    saveAnswer, 
    userAnswers, 
    submitSection, 
    isTestActive,
    timeRemaining
  } = useTest();
  
  const [activeTab, setActiveTab] = useState<string>("section1");
  const [isStarted, setIsStarted] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);
  
  useEffect(() => {
    // Load the listening section if not already loaded
    if (currentTest) {
      const listeningSection = currentTest.sections.find(section => section.type === 'listening');
      if (listeningSection) {
        startSection(listeningSection.id);
      }
    }
  }, [currentTest, startSection]);

  const listeningSection = currentTest?.sections.find(section => section.type === 'listening');
  const listeningContent = listeningSection?.content as any;

  const handleStart = () => {
    setIsStarted(true);
    toast.info('Listening test started', {
      description: 'Listen carefully to the audio and answer the questions.'
    });
  };

  const handleSubmit = () => {
    submitSection();
    toast.success('Listening test completed', {
      description: 'Your answers have been submitted for evaluation.'
    });
    navigate('/test/reading');
  };

  const handleTimeUp = () => {
    toast.warning('Time is up!', {
      description: 'Your answers will be automatically submitted.'
    });
    handleSubmit();
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    saveAnswer(questionId, value);
  };

  // Mock audio player (in a real app, this would use an actual audio file)
  const handleAudioEnd = () => {
    setAudioEnded(true);
    toast.info('Audio playback completed', {
      description: 'You can now review and submit your answers.'
    });
  };

  if (!listeningSection || !listeningContent) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p>Loading listening test...</p>
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
              <CardTitle className="text-center">IELTS Listening Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium text-lg mb-2">Instructions:</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-700">
                  <li>You will hear audio recordings and answer questions based on them.</li>
                  <li>The test consists of 2 sections with a total of 15 questions.</li>
                  <li>You will have 30 minutes to complete the test.</li>
                  <li>Listen carefully as the recording will be played only once.</li>
                </ul>
              </div>
              <div className="text-center">
                <Button onClick={handleStart} size="lg" className="bg-ielts-blue hover:bg-ielts-lightblue">
                  Start Listening Test
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">IELTS Listening Test</h1>
              <Timer onTimeUp={handleTimeUp} />
            </div>

            {/* Audio player (simulated) */}
            <div className="bg-slate-100 rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Audio Player</span>
                {!audioEnded && (
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    Playing...
                  </span>
                )}
              </div>
              <div className="h-12 bg-white rounded-md border border-slate-300 flex items-center justify-center">
                <Button
                  onClick={handleAudioEnd}
                  variant="ghost"
                  className="text-ielts-blue"
                >
                  {audioEnded ? 'Replay Audio' : 'Simulate Audio Completion'}
                </Button>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Note: In a real test, the audio would play automatically and can only be heard once.
              </p>
            </div>

            <Tabs 
              defaultValue="section1" 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="space-y-4"
            >
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="section1">Section 1</TabsTrigger>
                <TabsTrigger value="section2">Section 2</TabsTrigger>
              </TabsList>
              
              {listeningContent.sections.map((section: any, sectionIndex: number) => (
                <TabsContent key={sectionIndex} value={`section${sectionIndex + 1}`} className="space-y-6">
                  <h3 className="text-lg font-medium">{section.title}</h3>
                  
                  {section.questions.map((question: any, questionIndex: number) => {
                    const questionNumber = sectionIndex * section.questions.length + questionIndex + 1;
                    const savedAnswer = userAnswers.find(a => a.questionId === question.id)?.userResponse || '';

                    return (
                      <Card key={question.id} className="bg-white shadow-sm">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base font-medium">
                            Question {questionNumber}: {question.questionText}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {question.questionType === 'multiple-choice' && (
                            <RadioGroup 
                              value={savedAnswer} 
                              onValueChange={(value) => handleAnswerChange(question.id, value)}
                            >
                              {question.options.map((option: string, optionIndex: number) => (
                                <div key={optionIndex} className="flex items-center space-x-2">
                                  <RadioGroupItem value={option} id={`q${question.id}-${optionIndex}`} />
                                  <Label htmlFor={`q${question.id}-${optionIndex}`}>{option}</Label>
                                </div>
                              ))}
                            </RadioGroup>
                          )}
                          
                          {question.questionType === 'fill-in-blank' && (
                            <Input 
                              placeholder="Type your answer here" 
                              value={savedAnswer}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              className="max-w-sm"
                            />
                          )}
                          
                          {question.questionType === 'matching' && (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">Items</h4>
                                {question.options.map((option: string, i: number) => (
                                  <div key={i} className="mb-2 p-2 bg-slate-50 rounded">
                                    {option}
                                  </div>
                                ))}
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Matches</h4>
                                {question.matches.map((match: string, i: number) => {
                                  const matchId = `${question.id}-${match}`;
                                  const savedMatchValue = savedAnswer ? JSON.parse(savedAnswer)[match] || '' : '';
                                  
                                  return (
                                    <div key={i} className="mb-2 flex items-center gap-2">
                                      <span className="p-2 bg-slate-50 rounded flex-grow">{match}</span>
                                      <select 
                                        value={savedMatchValue}
                                        onChange={(e) => {
                                          const currentMatches = savedAnswer ? JSON.parse(savedAnswer) : {};
                                          const updatedMatches = {
                                            ...currentMatches,
                                            [match]: e.target.value
                                          };
                                          handleAnswerChange(question.id, JSON.stringify(updatedMatches));
                                        }}
                                        className="border rounded p-1"
                                      >
                                        <option value="">Select</option>
                                        {question.options.map((option: string, j: number) => (
                                          <option key={j} value={option}>{option}</option>
                                        ))}
                                      </select>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </TabsContent>
              ))}
            </Tabs>

            <div className="flex justify-between pt-6 border-t sticky bottom-0 bg-white p-4 -mx-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab(activeTab === "section1" ? "section2" : "section1")}
              >
                {activeTab === "section1" ? "Next Section" : "Previous Section"}
              </Button>
              <Button 
                onClick={handleSubmit} 
                className="bg-ielts-blue hover:bg-ielts-lightblue"
              >
                Submit Test
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ListeningTest;
