
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useTest } from '@/context/TestContext';
import Timer from '@/components/test/Timer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { assessWritingTask } from '@/services/aiService';

const WritingTest = () => {
  const navigate = useNavigate();
  const { 
    currentTest, 
    startSection, 
    saveAnswer, 
    userAnswers, 
    submitSection,
    timeRemaining
  } = useTest();
  
  const [isStarted, setIsStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("task1");
  const [wordCounts, setWordCounts] = useState({ task1: 0, task2: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (currentTest) {
      const writingSection = currentTest.sections.find(section => section.type === 'writing');
      if (writingSection) {
        startSection(writingSection.id);
      }
    }
  }, [currentTest, startSection]);

  const writingSection = currentTest?.sections.find(section => section.type === 'writing');
  const writingContent = writingSection?.content as any;

  const handleStart = () => {
    setIsStarted(true);
    toast.info('Writing test started', {
      description: 'You have 60 minutes to complete both writing tasks.'
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would send the answers to an API for AI assessment
      toast.info('Analyzing your writing...', {
        description: 'Our AI is evaluating your responses against IELTS criteria.'
      });
      
      // Submit the section to mark it complete
      submitSection();
      
      // In a production app, we would use real AI assessment here
      toast.success('Writing test completed', {
        description: 'Your answers have been submitted for evaluation.'
      });
      
      navigate('/test/speaking');
    } catch (error) {
      toast.error('Error submitting answers', {
        description: 'Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTimeUp = () => {
    toast.warning('Time is up!', {
      description: 'Your answers will be automatically submitted.'
    });
    handleSubmit();
  };

  const handleTextChange = (taskId: string, value: string) => {
    saveAnswer(taskId, value);
    
    // Calculate word count
    const count = value.trim() ? value.trim().split(/\s+/).length : 0;
    setWordCounts(prev => ({ ...prev, [taskId === 'w-task1' ? 'task1' : 'task2']: count }));
  };

  const getTaskAnswer = (taskId: string) => {
    return userAnswers.find(a => a.questionId === taskId)?.userResponse || '';
  };

  if (!writingSection || !writingContent) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p>Loading writing test...</p>
        </div>
      </Layout>
    );
  }

  const task1 = writingContent.tasks.find((t: any) => t.taskNumber === 1);
  const task2 = writingContent.tasks.find((t: any) => t.taskNumber === 2);

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
                  <li>You will complete two writing tasks.</li>
                  <li>Task 1 (20 minutes): Describe visual information (chart, graph, diagram).</li>
                  <li>Task 2 (40 minutes): Write an essay in response to a prompt.</li>
                  <li>You will have a total of 60 minutes for both tasks.</li>
                  <li>Suggested word count: Task 1 (150+ words) and Task 2 (250+ words).</li>
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

            <Tabs 
              defaultValue="task1" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="task1">Task 1 (20 mins)</TabsTrigger>
                <TabsTrigger value="task2">Task 2 (40 mins)</TabsTrigger>
              </TabsList>
              
              <TabsContent value="task1">
                <Card className="bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Task 1: {task1.prompt}
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
                      <div className="flex justify-between mb-1">
                        <label htmlFor="task1-answer" className="text-sm font-medium">
                          Your Answer
                        </label>
                        <span 
                          className={`text-sm ${
                            wordCounts.task1 < 150 ? 'text-red-600' : 'text-green-600'
                          }`}
                        >
                          {wordCounts.task1} words {wordCounts.task1 < 150 ? `(${150 - wordCounts.task1} more needed)` : '✓'}
                        </span>
                      </div>
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
              </TabsContent>
              
              <TabsContent value="task2">
                <Card className="bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Task 2: {task2.prompt}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <label htmlFor="task2-answer" className="text-sm font-medium">
                          Your Answer
                        </label>
                        <span 
                          className={`text-sm ${
                            wordCounts.task2 < 250 ? 'text-red-600' : 'text-green-600'
                          }`}
                        >
                          {wordCounts.task2} words {wordCounts.task2 < 250 ? `(${250 - wordCounts.task2} more needed)` : '✓'}
                        </span>
                      </div>
                      <Textarea 
                        id="task2-answer"
                        placeholder="Write your answer here..."
                        className="min-h-[400px]"
                        value={getTaskAnswer(task2.id)}
                        onChange={(e) => handleTextChange(task2.id, e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between pt-6 border-t sticky bottom-0 bg-white p-4 -mx-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab(activeTab === "task1" ? "task2" : "task1")}
              >
                {activeTab === "task1" ? "Next Task" : "Previous Task"}
              </Button>
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
