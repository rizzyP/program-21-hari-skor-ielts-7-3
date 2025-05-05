
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
    setTimeRemaining
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
      const writingSection = currentTest.sections.find(section => section.type === 'writing');
      if (writingSection) {
        startSection(writingSection.id);
        // Set timer to 20 minutes (1200 seconds)
        setTimeRemaining(1200);
      }
    }
  }, [currentTest, startSection, isStarted, isTestActive]);

  const writingSection = currentTest?.sections.find(section => section.type === 'writing');
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
      // In a real app, this would send the answers to an API for AI assessment
      toast.info('Analyzing your writing...', {
        description: 'Our AI is evaluating your response against IELTS criteria.'
      });
      
      // Submit the section to mark it complete
      submitSection();
      
      // In a production app, we would use real AI assessment here
      toast.success('Writing test completed', {
        description: 'Your answer has been submitted for evaluation.'
      });
      
      navigate('/test/speaking');
    } catch (error) {
      toast.error('Error submitting answer', {
        description: 'Please try again.'
      });
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

  // Safely access task1, ensuring it exists before accessing properties
  const writingTasks = writingContent.tasks || [];
  const task1 = writingTasks.find((t: any) => t.taskNumber === 1) || {
    id: 'w-task1',
    prompt: 'Default task 1 prompt',
    taskNumber: 1
  };

  // Calculate progress percentage for word count
  const wordCountTarget = 150;
  const wordCountProgress = Math.min(100, (wordCount / wordCountTarget) * 100);

  return (
    <Layout className="pb-16">
      <div className="max-w-5xl mx-auto space-y-6">
        {!isStarted ? (
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-center">IELTS Writing Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-cyan-50 p-4 rounded-md">
                <h3 className="font-medium text-lg mb-2">Instructions:</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-700">
                  <li>You will complete one writing task.</li>
                  <li>Task (20 minutes): Describe visual information (chart, graph, diagram).</li>
                  <li>You will have a total of 20 minutes for the task.</li>
                  <li>Suggested word count: 150+ words.</li>
                </ul>
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
              <h1 className="text-2xl font-bold">IELTS Writing Test</h1>
              <Timer onTimeUp={handleTimeUp} />
            </div>

            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  Task: {task1.prompt}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {task1.resources && (
                  <div className="border rounded p-4 text-center bg-slate-50">
                    <p className="mb-3 text-sm text-slate-500">Visual data would appear here</p>
                    <div className="h-64 flex items-center justify-center border border-dashed border-slate-300 bg-white">
                      <p className="text-slate-400">
                        [In a production app, a graph/chart would be displayed here]
                      </p>
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
                          wordCount < 150 ? 'text-amber-600' : 'text-green-600'
                        }`}
                      >
                        {wordCount} words {wordCount < 150 ? `(${150 - wordCount} more needed)` : '✓'}
                      </span>
                    </div>
                  </div>
                  
                  <Progress
                    value={wordCountProgress}
                    className={`h-2 mb-2 ${
                      wordCount >= 150 ? 'bg-green-100' : 'bg-amber-100'
                    }`}
                  />
                  
                  <Textarea 
                    id="task1-answer"
                    placeholder="Write your answer here..."
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
