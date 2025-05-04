
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
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

const ReadingTest = () => {
  const navigate = useNavigate();
  const { 
    currentTest, 
    startSection, 
    saveAnswer, 
    userAnswers, 
    submitSection,
  } = useTest();
  
  const [isStarted, setIsStarted] = useState(false);
  
  useEffect(() => {
    if (currentTest) {
      const readingSection = currentTest.sections.find(section => section.type === 'reading');
      if (readingSection) {
        startSection(readingSection.id);
      }
    }
  }, [currentTest, startSection]);

  const readingSection = currentTest?.sections.find(section => section.type === 'reading');
  const readingContent = readingSection?.content as any;

  const handleStart = () => {
    setIsStarted(true);
    toast.info('Reading test started', {
      description: 'Read the passage carefully and answer the questions.'
    });
  };

  const handleSubmit = () => {
    submitSection();
    toast.success('Reading test completed', {
      description: 'Your answers have been submitted for evaluation.'
    });
    navigate('/test/writing');
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

  if (!readingSection || !readingContent) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p>Loading reading test...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="pb-16">
      <div className="max-w-6xl mx-auto space-y-6">
        {!isStarted ? (
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-center">IELTS Reading Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 p-4 rounded-md">
                <h3 className="font-medium text-lg mb-2">Instructions:</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-700">
                  <li>You will read a passage and answer questions based on it.</li>
                  <li>The test consists of 10 questions related to the passage.</li>
                  <li>You will have 20 minutes to complete the test.</li>
                  <li>Read carefully and refer back to the passage when necessary.</li>
                </ul>
              </div>
              <div className="text-center">
                <Button onClick={handleStart} size="lg" className="bg-ielts-green hover:bg-ielts-blue">
                  Start Reading Test
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">IELTS Reading Test</h1>
              <Timer onTimeUp={handleTimeUp} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Reading Passage */}
              <Card className="bg-white h-[calc(100vh-220px)] sticky top-24">
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-lg">Reading Passage</CardTitle>
                </CardHeader>
                <ScrollArea className="h-[calc(100%-60px)]">
                  <CardContent className="pt-4">
                    {readingContent.passage.split('\n').map((paragraph: string, index: number) => {
                      // Handle markdown-style headers
                      if (paragraph.startsWith('# ')) {
                        return (
                          <h2 key={index} className="text-xl font-bold mb-4">
                            {paragraph.slice(2)}
                          </h2>
                        );
                      }
                      return (
                        <p key={index} className="mb-4 text-slate-800 leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    })}
                  </CardContent>
                </ScrollArea>
              </Card>

              {/* Questions */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Questions</h2>
                
                {readingContent.questions.map((question: any, index: number) => {
                  const savedAnswer = userAnswers.find(a => a.questionId === question.id)?.userResponse || '';
                  
                  return (
                    <Card key={question.id} className="bg-white shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">
                          Question {index + 1}: {question.questionText}
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
                        
                        {question.questionType === 'true-false-notgiven' && (
                          <RadioGroup 
                            value={savedAnswer} 
                            onValueChange={(value) => handleAnswerChange(question.id, value)}
                          >
                            {['true', 'false', 'not given'].map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center space-x-2">
                                <RadioGroupItem value={option} id={`q${question.id}-${option}`} />
                                <Label htmlFor={`q${question.id}-${option}`}>
                                  {option.charAt(0).toUpperCase() + option.slice(1)}
                                </Label>
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
                          <select 
                            value={savedAnswer}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            className="border rounded p-2 w-full max-w-sm"
                          >
                            <option value="">Select an option</option>
                            {question.options.map((option: string, optionIndex: number) => (
                              <option key={optionIndex} value={option}>{option}</option>
                            ))}
                          </select>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
                
                <div className="flex justify-end pt-6 border-t sticky bottom-0 bg-white p-4 -mx-4">
                  <Button 
                    onClick={handleSubmit} 
                    className="bg-ielts-green hover:bg-ielts-blue"
                  >
                    Submit Test
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReadingTest;
