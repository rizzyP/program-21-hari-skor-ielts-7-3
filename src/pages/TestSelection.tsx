
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTest } from '@/context/TestContext';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TestSelection = () => {
  const navigate = useNavigate();
  const { loadTest, currentTest, testType, evaluateAllSections } = useTest();

  useEffect(() => {
    // Pre-load the sample test
    if (!currentTest) {
      loadTest('sample');
    }
  }, [currentTest, loadTest]);

  const handleNavigateTest = (testType: string) => {
    switch (testType) {
      case 'listening':
        navigate('/test/listening');
        break;
      case 'reading':
        navigate('/test/reading');
        break;
      case 'writing':
        navigate('/test/writing');
        break;
      // Removed speaking case
      default:
        toast.error('Test type not available');
    }
  };

  const handleTestTypeChange = (value: string) => {
    if (value === 'academic' || value === 'general') {
      loadTest('sample', value);
      toast.info(`Loaded ${value} test`);
    }
  };

  const handleStartFullTest = () => {
    navigate('/test/listening');
    toast.info('Starting full IELTS test');
  };

  const handleShowResults = async () => {
    try {
      await evaluateAllSections();
      navigate('/results');
    } catch (error) {
      console.error('Error evaluating test results:', error);
      toast.error('Failed to generate results');
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold">IELTS Test Selection</h1>
            <p className="text-lg text-muted-foreground">Choose which test sections you want to practice or start the full test</p>
          </div>

          <Tabs defaultValue="academic" className="space-y-6" onValueChange={handleTestTypeChange}>
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-2 w-[400px]">
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="general">General Training</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="academic" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TestCard
                  title="Listening"
                  description="30 minutes + 10 minutes transfer time"
                  details="Four recorded conversations and monologues"
                  onClick={() => handleNavigateTest('listening')}
                  icon="🎧"
                />
                <TestCard
                  title="Reading (Academic)"
                  description="60 minutes"
                  details="Three reading passages with a total of 40 questions"
                  onClick={() => handleNavigateTest('reading')}
                  icon="📚"
                />
                <TestCard
                  title="Writing (Academic)"
                  description="60 minutes"
                  details="Two tasks: describing visual information and essay"
                  onClick={() => handleNavigateTest('writing')}
                  icon="✏️"
                />
                {/* Removed Speaking TestCard */}
              </div>

              <Card className="border-2 border-dashed">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Full IELTS Academic Test</CardTitle>
                  <CardDescription>
                    Take the complete test in the correct order: Listening, Reading and Writing
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center">
                  <Button size="lg" onClick={handleStartFullTest} className="bg-ielts-blue hover:bg-ielts-lightblue">
                    Start Full Test
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="general" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TestCard
                  title="Listening"
                  description="30 minutes + 10 minutes transfer time"
                  details="Four recorded conversations and monologues"
                  onClick={() => handleNavigateTest('listening')}
                  icon="🎧"
                />
                <TestCard
                  title="Reading (General)"
                  description="60 minutes"
                  details="Three sections of increasing difficulty with 40 questions"
                  onClick={() => handleNavigateTest('reading')}
                  icon="📚"
                />
                <TestCard
                  title="Writing (General)"
                  description="60 minutes"
                  details="Two tasks: letter writing and essay"
                  onClick={() => handleNavigateTest('writing')}
                  icon="✏️"
                />
                {/* Removed Speaking TestCard */}
              </div>

              <Card className="border-2 border-dashed">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Full IELTS General Training Test</CardTitle>
                  <CardDescription>
                    Take the complete test in the correct order: Listening, Reading and Writing
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center">
                  <Button size="lg" onClick={handleStartFullTest} className="bg-ielts-blue hover:bg-ielts-lightblue">
                    Start Full Test
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center">
            <Button variant="outline" onClick={handleShowResults} className="mt-2">
              View Mock Results
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Individual test card component
const TestCard = ({ title, description, details, onClick, icon }: {
  title: string;
  description: string;
  details: string;
  onClick: () => void;
  icon: string;
}) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className="text-3xl">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm">{details}</p>
    </CardContent>
    <CardFooter>
      <Button onClick={onClick} className="w-full">Start Practice</Button>
    </CardFooter>
  </Card>
);

export default TestSelection;
