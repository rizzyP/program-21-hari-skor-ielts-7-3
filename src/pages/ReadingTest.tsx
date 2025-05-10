
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
import { Checkbox } from '@/components/ui/checkbox';

const ReadingTest = () => {
  const navigate = useNavigate();
  const { 
    currentTest, 
    startSection, 
    saveAnswer, 
    userAnswers, 
    submitSection,
    testType,
    isTestActive,
    setTimeRemaining
  } = useTest();
  
  const [isStarted, setIsStarted] = useState(false);
  
  useEffect(() => {
    if (currentTest && isStarted && !isTestActive) {
      const sectionId = testType === 'academic' ? 
        'reading-academic-001' : 'reading-general-001';
      
      const readingSection = currentTest.sections.find(section => section.id === sectionId);
      if (readingSection) {
        startSection(readingSection.id);
        // Set timer to 15 minutes (900 seconds)
        setTimeRemaining(900);
      }
    }
  }, [currentTest, startSection, testType, isStarted, isTestActive]);

  const readingSection = currentTest?.sections.find(section => 
    section.id === (testType === 'academic' ? 'reading-academic-001' : 'reading-general-001')
  );
  const readingContent = readingSection?.content as any;

  // Pre-fill all question IDs with empty strings to ensure all questions are accounted for
  useEffect(() => {
    if (readingContent && isStarted) {
      readingContent.questions.forEach((question: any) => {
        const existingAnswer = userAnswers.find(a => a.questionId === question.id);
        if (!existingAnswer) {
          // Initialize with empty string
          saveAnswer(question.id, '');
        }
      });
    }
  }, [readingContent, isStarted, userAnswers]);

  const handleStart = () => {
    setIsStarted(true);
    toast.info('Reading test started', {
      description: 'Read the passage carefully and answer the questions.'
    });
  };

  const handleSubmit = () => {
    // Make sure all questions have an answer (even if empty)
    if (readingContent) {
      readingContent.questions.forEach((question: any) => {
        const existingAnswer = userAnswers.find(a => a.questionId === question.id);
        if (!existingAnswer) {
          saveAnswer(question.id, '');
        }
      });
    }
    
    submitSection();
    toast.success('Reading test completed', {
      description: 'Your answers have been submitted for evaluation.'
    });
    // Navigate to writing test next
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
      <div className="w-full max-w-6xl mx-auto space-y-6 px-4 sm:px-6">
        {!isStarted ? (
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-center">
                IELTS Reading Test ({testType === 'academic' ? 'Academic' : 'General Training'})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 p-4 rounded-md">
                <h3 className="font-medium text-lg mb-2">Instructions:</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-700">
                  <li>You will read a passage and answer questions based on it.</li>
                  <li>The test consists of 10 questions related to the passage.</li>
                  <li>You will have 15 minutes to complete the test.</li>
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
              <h1 className="text-xl sm:text-2xl font-bold">
                IELTS Reading Test ({testType === 'academic' ? 'Academic' : 'General Training'})
              </h1>
              <Timer onTimeUp={handleTimeUp} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reading Passage */}
              <Card className="bg-white h-[500px] md:h-[calc(100vh-220px)] md:sticky md:top-24 order-1">
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
              <div className="space-y-6 order-2">
                <h2 className="text-xl font-semibold">Questions</h2>
                
                {readingContent.questions.map((question: any, index: number) => {
                  const questionId = question.id;
                  const savedAnswer = userAnswers.find(a => a.questionId === questionId)?.userResponse || '';
                  
                  return (
                    <Card key={questionId} className="bg-white shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">
                          Question {index + 1}: {question.questionText}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {question.questionType === 'multiple-choice' && (
                          <RadioGroup 
                            value={savedAnswer} 
                            onValueChange={(value) => handleAnswerChange(questionId, value)}
                          >
                            {question.options.map((option: string, optionIndex: number) => (
                              <div key={optionIndex} className="flex items-center space-x-2">
                                <RadioGroupItem value={option} id={`q${questionId}-${optionIndex}`} />
                                <Label htmlFor={`q${questionId}-${optionIndex}`}>{option}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        )}
                        
                        {question.questionType === 'true-false-notgiven' && (
                          <RadioGroup 
                            value={savedAnswer} 
                            onValueChange={(value) => handleAnswerChange(questionId, value)}
                          >
                            {['true', 'false', 'not given'].map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center space-x-2">
                                <RadioGroupItem value={option} id={`q${questionId}-${option}`} />
                                <Label htmlFor={`q${questionId}-${option}`}>
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
                            onChange={(e) => handleAnswerChange(questionId, e.target.value)}
                            className="max-w-full md:max-w-sm"
                          />
                        )}
                        
                        {question.questionType === 'matching' && (
                          <div className="w-full">
                            <select 
                              value={savedAnswer}
                              onChange={(e) => handleAnswerChange(questionId, e.target.value)}
                              className="w-full md:max-w-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              <option value="">Select an option</option>
                              {question.options.map((option: string, optionIndex: number) => (
                                <option key={optionIndex} value={option}>{option}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
                
                <div className="flex justify-end pt-6 border-t sticky bottom-0 bg-white p-4 -mx-4 md:mx-0">
                  <Button 
                    onClick={handleSubmit} 
                    className="bg-ielts-green hover:bg-ielts-blue w-full sm:w-auto"
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
