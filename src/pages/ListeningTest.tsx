
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
                  <li>The test consists of 3 sections with a total of 15 questions.</li>
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
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="section1">Section 1A</TabsTrigger>
                <TabsTrigger value="section2">Section 1B</TabsTrigger>
                <TabsTrigger value="section3">Section 4</TabsTrigger>
              </TabsList>
              
              {listeningContent.sections.map((section: any, sectionIndex: number) => (
                <TabsContent key={sectionIndex} value={`section${sectionIndex + 1}`} className="space-y-6">
                  <h3 className="text-lg font-medium">{section.title}</h3>
                  
                  {section.questions.map((question: any, questionIndex: number) => {
                    const questionNumber = sectionIndex === 0 
                      ? questionIndex + 1 
                      : sectionIndex === 1 
                        ? questionIndex + 6 
                        : questionIndex + 11;
                    const savedAnswer = userAnswers.find(a => a.questionId === question.id)?.userResponse || '';

                    // Special formatting for enrollment plans (questions 6-10)
                    if (sectionIndex === 1) {
                      if (questionIndex === 0) {
                        return (
                          <Card key={question.id} className="bg-white shadow-sm">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base font-medium">
                                Enrolment Plans
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="bg-slate-50 p-3 rounded-md">
                                <h4 className="font-medium mb-2">Plan 5</h4>
                                <ul className="list-disc list-inside pl-2 space-y-1">
                                  <li className="flex items-center gap-2">
                                    <span>Question 6:</span>
                                    <Input 
                                      placeholder="Type your answer" 
                                      value={savedAnswer}
                                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                      className="w-32 inline-block h-7"
                                    /> evening courses
                                  </li>
                                  <li>Basic fee: $450</li>
                                  <li>Plus $50 enrolment fee</li>
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      } else if (questionIndex === 1) {
                        return (
                          <Card key={question.id} className="bg-white shadow-sm">
                            <CardContent className="space-y-4 pt-4">
                              <div className="bg-slate-50 p-3 rounded-md">
                                <h4 className="font-medium mb-2">Plan 3</h4>
                                <ul className="list-disc list-inside pl-2 space-y-1">
                                  <li>One evening course</li>
                                  <li className="flex items-center gap-2">
                                    <span>Basic fee (Question 7):</span>
                                    <Input 
                                      placeholder="Type your answer" 
                                      value={savedAnswer}
                                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                      className="w-32 inline-block h-7"
                                    />
                                  </li>
                                  <li>Plus $50 enrolment fee</li>
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      } else if (questionIndex >= 2) {
                        const isFirstPlan2Question = questionIndex === 2;
                        return (
                          <Card key={question.id} className={isFirstPlan2Question ? "bg-white shadow-sm" : "hidden"}>
                            {isFirstPlan2Question && (
                              <CardContent className="space-y-4 pt-4">
                                <div className="bg-slate-50 p-3 rounded-md">
                                  <h4 className="font-medium mb-2">Plan 2</h4>
                                  <ul className="list-disc list-inside pl-2 space-y-1">
                                    <li>One evening course</li>
                                    <li className="flex items-center gap-2">
                                      <span>Basic fee (Question 8):</span>
                                      <Input 
                                        placeholder="Type your answer" 
                                        value={userAnswers.find(a => a.questionId === 'l-q8')?.userResponse || ''}
                                        onChange={(e) => handleAnswerChange('l-q8', e.target.value)}
                                        className="w-32 inline-block h-7"
                                      />
                                    </li>
                                    <li>Plus $50 enrolment fee</li>
                                    <li className="flex items-center gap-2">
                                      <span>Enrol before (Question 9):</span>
                                      <Input 
                                        placeholder="Type your answer" 
                                        value={userAnswers.find(a => a.questionId === 'l-q9')?.userResponse || ''}
                                        onChange={(e) => handleAnswerChange('l-q9', e.target.value)}
                                        className="w-32 inline-block h-7"
                                      /> of this month
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <span>Contact name (Question 10):</span>
                                      <Input 
                                        placeholder="Type your answer" 
                                        value={userAnswers.find(a => a.questionId === 'l-q10')?.userResponse || ''}
                                        onChange={(e) => handleAnswerChange('l-q10', e.target.value)}
                                        className="w-32 inline-block h-7"
                                      />
                                    </li>
                                  </ul>
                                </div>
                              </CardContent>
                            )}
                          </Card>
                        );
                      }
                    } 
                    // Special formatting for Section 4 (questions 11-15) about Art World changes
                    else if (sectionIndex === 2) {
                      if (questionIndex === 0) {
                        return (
                          <Card key="art-world-changes" className="bg-white shadow-sm">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base font-medium">
                                Changes in the Art World
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="bg-slate-50 p-3 rounded-md">
                                <h4 className="font-medium mb-2">Two main factors:</h4>
                                <ul className="list-disc list-inside pl-2 space-y-3">
                                  <li>
                                    <strong>Technology</strong>
                                    <ul className="list-disc list-inside pl-6 pt-1">
                                      <li className="flex flex-wrap items-center gap-2">
                                        Digital - the 
                                        <Input 
                                          placeholder="Type your answer" 
                                          value={userAnswers.find(a => a.questionId === 'l-q11')?.userResponse || ''}
                                          onChange={(e) => handleAnswerChange('l-q11', e.target.value)}
                                          className="w-32 inline-block h-7"
                                        /> 
                                        'high art' and 'popular culture' is not so clear (Question 11)
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <strong>Globalization</strong>
                                    <ul className="list-disc list-inside pl-6 pt-1">
                                      <li className="flex flex-wrap items-center gap-2">
                                        New art collectors are moving the 
                                        <Input 
                                          placeholder="Type your answer" 
                                          value={userAnswers.find(a => a.questionId === 'l-q12')?.userResponse || ''}
                                          onChange={(e) => handleAnswerChange('l-q12', e.target.value)}
                                          className="w-32 inline-block h-7"
                                        /> 
                                        away from the US and Europe (Question 12)
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                              
                              <div className="bg-slate-50 p-3 rounded-md">
                                <h4 className="font-medium mb-2">Changing Definition:</h4>
                                <ul className="list-disc list-inside pl-2 space-y-2">
                                  <li className="flex flex-wrap items-center gap-2">
                                    Traditional definitions of 'high art' contained strong connections to 
                                    <Input 
                                      placeholder="Type your answer" 
                                      value={userAnswers.find(a => a.questionId === 'l-q13')?.userResponse || ''}
                                      onChange={(e) => handleAnswerChange('l-q13', e.target.value)}
                                      className="w-32 inline-block h-7"
                                    /> (Question 13)
                                  </li>
                                  <li className="flex flex-wrap items-center gap-2">
                                    Contemporary art seems outside 
                                    <Input 
                                      placeholder="Type your answer" 
                                      value={userAnswers.find(a => a.questionId === 'l-q14')?.userResponse || ''}
                                      onChange={(e) => handleAnswerChange('l-q14', e.target.value)}
                                      className="w-32 inline-block h-7"
                                    /> 
                                    of previous definitions (Question 14)
                                  </li>
                                </ul>
                              </div>
                              
                              <div className="bg-slate-50 p-3 rounded-md">
                                <h4 className="font-medium mb-2">Art Nationality:</h4>
                                <ul className="list-disc list-inside pl-2 space-y-2">
                                  <li>More difficult to define</li>
                                  <li className="flex flex-wrap items-center gap-2">
                                    Easier movement of artists 
                                    <Input 
                                      placeholder="Type your answer" 
                                      value={userAnswers.find(a => a.questionId === 'l-q15')?.userResponse || ''}
                                      onChange={(e) => handleAnswerChange('l-q15', e.target.value)}
                                      className="w-32 inline-block h-7"
                                    /> (Question 15)
                                  </li>
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      }
                      return null; // Skip rendering individual question cards for section 3 as we've rendered all together
                    }
                    // Default rendering for multiple choice questions (questions 1-5)
                    else {
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
                          </CardContent>
                        </Card>
                      );
                    }
                  })}
                </TabsContent>
              ))}
            </Tabs>

            <div className="flex justify-between pt-6 border-t sticky bottom-0 bg-white p-4 -mx-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  if (activeTab === "section1") setActiveTab("section2");
                  else if (activeTab === "section2") setActiveTab("section3");
                  else setActiveTab("section1");
                }}
              >
                {activeTab === "section3" ? "First Section" : "Next Section"}
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
