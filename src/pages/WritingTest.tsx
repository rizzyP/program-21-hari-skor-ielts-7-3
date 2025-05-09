
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useTest } from '@/context/TestContext';
import Timer from '@/components/test/Timer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { FileText } from 'lucide-react';

const WritingTest = () => {
  const navigate = useNavigate();
  const { 
    currentTest, 
    loadTest,
    startSection, 
    saveAnswer, 
    userAnswers, 
    submitSection,
    timeRemaining,
    testType,
    isTestActive,
    setTimeRemaining,
    evaluateAllSections
  } = useTest();
  
  const [isStarted, setIsStarted] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load test if it's not already loaded
  useEffect(() => {
    if (!currentTest) {
      loadTest('sample', testType);
    }
  }, [currentTest, loadTest, testType]);
  
  useEffect(() => {
    if (currentTest && isStarted && !isTestActive) {
      // Select the appropriate writing section based on test type
      const sectionId = testType === 'academic' ? 'writing-academic-001' : 'writing-general-001';
      const writingSection = currentTest.sections.find(section => section.id === sectionId);
      if (writingSection) {
        startSection(writingSection.id);
        // Set timer to 20 minutes (1200 seconds)
        setTimeRemaining(1200);
      }
    }
  }, [currentTest, startSection, isStarted, isTestActive, testType]);

  // Get the appropriate writing section based on test type
  const writingSection = currentTest?.sections.find(section => 
    section.id === (testType === 'academic' ? 'writing-academic-001' : 'writing-general-001')
  );
  const writingContent = writingSection?.content as any;

  const handleStart = () => {
    setIsStarted(true);
    toast.info('Writing test started', {
      description: 'You have 20 minutes to complete the writing task.'
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Submit the section to mark it complete
      submitSection();
      
      toast.info('Analyzing your writing...', {
        description: 'Our AI is evaluating your response against IELTS criteria.'
      });
      
      // Evaluate all sections and redirect to results
      await evaluateAllSections();
      
      toast.success('Writing test completed', {
        description: 'Your answer has been submitted for evaluation.'
      });
      
      // Redirect to results page
      navigate('/results');
    } catch (error) {
      toast.error('Error submitting answer', {
        description: 'Please try again.'
      });
      console.error('Error during submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTimeUp = () => {
    toast.warning('Time is up!', {
      description: 'Your answer will be automatically submitted.'
    });
    handleSubmit();
  };

  const handleTextChange = (taskId: string, value: string) => {
    saveAnswer(taskId, value);
    
    // Calculate word count
    const count = value.trim() ? value.trim().split(/\s+/).length : 0;
    setWordCount(count);
  };

  const getTaskAnswer = (taskId: string) => {
    return userAnswers.find(a => a.questionId === taskId)?.userResponse || '';
  };

  if (!currentTest || !writingSection || !writingContent) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p>Loading writing test...</p>
        </div>
      </Layout>
    );
  }

  // Safely access tasks, ensuring they exist before accessing properties
  const writingTasks = writingContent.tasks || [];
  const task1 = writingTasks.find((t: any) => t.taskNumber === 1) || {
    id: 'w-task1',
    prompt: 'Task prompt unavailable',
    taskNumber: 1,
    resources: false
  };

  // Calculate progress percentage for word count
  const wordCountTarget = testType === 'academic' ? 150 : 150; // Both targets are 150 for now, but can be adjusted
  const wordCountProgress = Math.min(100, (wordCount / wordCountTarget) * 100);

  return (
    <Layout className="pb-16">
      <div className="max-w-5xl mx-auto space-y-6">
        {!isStarted ? (
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-center">
                IELTS Writing Test ({testType === 'academic' ? 'Academic' : 'General Training'})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-cyan-50 p-4 rounded-md">
                <h3 className="font-medium text-lg mb-2">Instructions:</h3>
                {testType === 'academic' ? (
                  <ul className="list-disc list-inside space-y-2 text-slate-700">
                    <li>You will complete one writing task.</li>
                    <li>Task (20 minutes): Describe visual information (chart, graph, diagram).</li>
                    <li>You will have a total of 20 minutes for the task.</li>
                    <li>Suggested word count: 150+ words.</li>
                  </ul>
                ) : (
                  <ul className="list-disc list-inside space-y-2 text-slate-700">
                    <li>You will complete one writing task.</li>
                    <li>Task (20 minutes): Write a letter to address a specific situation.</li>
                    <li>You will have a total of 20 minutes for the task.</li>
                    <li>Required word count: At least 150 words.</li>
                  </ul>
                )}
              </div>
              <div className="text-center">
                <Button onClick={handleStart} size="lg" className="bg-ielts-lightblue hover:bg-ielts-blue">
                  Start Writing Test
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                IELTS Writing Test ({testType === 'academic' ? 'Academic' : 'General Training'})
              </h1>
              <Timer onTimeUp={handleTimeUp} />
            </div>

            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  Task: {task1.prompt}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {testType === 'academic' && task1.resources && (
                  <div className="border rounded p-4 text-center bg-slate-50">
                    <p className="mb-3 text-sm text-slate-500">Art Preferences by Age Group (Percentage)</p>
                    <div className="flex items-center justify-center">
                      <img 
                        src="/lovable-uploads/524a31ce-69f7-4fa6-a38d-a83a066dc0ef.png"
                        alt="Chart showing preferences for different types of art items by age group"
                        className="w-full max-w-3xl border bg-white"
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <div className="flex justify-between mb-1 items-center">
                    <div className="flex items-center gap-2">
                      <FileText size={18} />
                      <label htmlFor="task1-answer" className="text-sm font-medium">
                        Your Answer
                      </label>
                    </div>
                    <div className="text-right">
                      <span 
                        className={`text-sm ${
                          wordCount < wordCountTarget ? 'text-amber-600' : 'text-green-600'
                        }`}
                      >
                        {wordCount} words {wordCount < wordCountTarget ? `(${wordCountTarget - wordCount} more needed)` : '✓'}
                      </span>
                    </div>
                  </div>
                  
                  <Progress
                    value={wordCountProgress}
                    className={`h-2 mb-2 ${
                      wordCount >= wordCountTarget ? 'bg-green-100' : 'bg-amber-100'
                    }`}
                  />
                  
                  <Textarea 
                    id="task1-answer"
                    placeholder={testType === 'academic' 
                      ? "Write your answer here..." 
                      : "Dear .....................,\n\nWrite your letter here..."}
                    className="min-h-[300px]"
                    value={getTaskAnswer(task1.id)}
                    onChange={(e) => handleTextChange(task1.id, e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end pt-6 border-t sticky bottom-0 bg-white p-4 -mx-4">
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="bg-ielts-lightblue hover:bg-ielts-blue"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Test'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WritingTest;
