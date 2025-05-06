
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTest } from '@/context/TestContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText, Headphones, Mic } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TestSelection = () => {
  const { loadTest } = useTest();
  const navigate = useNavigate();

  const startFullTest = (testType: 'academic' | 'general') => {
    loadTest('sample', testType);
    toast.success('Test loaded successfully', {
      description: `You are now ready to start the IELTS ${testType === 'academic' ? 'Academic' : 'General Training'} test.`
    });
    navigate('/test/listening');
  };

  const testModules = [
    {
      id: 'listening',
      title: 'Listening',
      description: 'Audio-based test with various question types',
      icon: <Headphones className="h-8 w-8 text-ielts-blue" />,
      color: 'bg-blue-50',
      time: '10 minutes',
      questions: '2 sections',
      path: '/test/listening'
    },
    {
      id: 'reading',
      title: 'Reading',
      description: 'Comprehension test with academic passages',
      icon: <BookOpen className="h-8 w-8 text-ielts-green" />,
      color: 'bg-green-50',
      time: '15 minutes',
      questions: '10 questions',
      path: '/test/reading'
    },
    {
      id: 'writing',
      title: 'Writing',
      description: 'Essay writing and data interpretation',
      icon: <FileText className="h-8 w-8 text-ielts-lightblue" />,
      color: 'bg-cyan-50',
      time: '20 minutes',
      questions: '1 task',
      path: '/test/writing'
    },
    {
      id: 'speaking',
      title: 'Speaking',
      description: 'Recorded responses to interview questions',
      icon: <Mic className="h-8 w-8 text-ielts-red" />,
      color: 'bg-red-50',
      time: '15 minutes',
      questions: '3 parts',
      path: '/test/speaking'
    }
  ];

  return (
    <Layout>
      <div className="space-y-8 py-6">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold">IELTS Test Selection</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Choose to take the complete IELTS test or practice individual sections to prepare for your official exam.
          </p>
        </section>

        <Tabs defaultValue="academic" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="general">General Training</TabsTrigger>
          </TabsList>

          <TabsContent value="academic" className="space-y-6">
            <section className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Complete IELTS Academic Test</h2>
                  <p className="text-slate-600">
                    Take all four test sections in sequence and receive a comprehensive assessment with an overall band score prediction.
                  </p>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                    <li>Duration: Approximately 60 minutes</li>
                    <li>AI-powered assessment and feedback</li>
                    <li>Detailed score breakdown and recommendations</li>
                  </ul>
                </div>
                <Button 
                  onClick={() => startFullTest('academic')} 
                  size="lg" 
                  className="bg-ielts-blue hover:bg-ielts-lightblue"
                >
                  Start Academic Test
                </Button>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Practice Individual Sections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {testModules.map((module) => (
                  <Card key={module.id} className={`${module.color} border-none shadow-sm hover:shadow transition-shadow`}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
                      {module.icon}
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-700 mb-4">{module.description}</CardDescription>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">⏱️ {module.time}</span>
                        <span className="text-slate-600">📝 {module.questions}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link to={module.path} className="w-full">
                        <Button variant="outline" className="w-full" onClick={() => loadTest('sample', 'academic')}>
                          Start {module.title} Test
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="general" className="space-y-6">
            <section className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Complete IELTS General Training Test</h2>
                  <p className="text-slate-600">
                    Take all four test sections in sequence and receive a comprehensive assessment with an overall band score prediction.
                  </p>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                    <li>Duration: Approximately 55 minutes</li>
                    <li>AI-powered assessment and feedback</li>
                    <li>Detailed score breakdown and recommendations</li>
                  </ul>
                </div>
                <Button 
                  onClick={() => startFullTest('general')} 
                  size="lg" 
                  className="bg-ielts-blue hover:bg-ielts-lightblue"
                >
                  Start General Training Test
                </Button>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Practice Individual Sections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {testModules.map((module) => (
                  <Card key={`general-${module.id}`} className={`${module.color} border-none shadow-sm hover:shadow transition-shadow`}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
                      {module.icon}
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-700 mb-4">{module.description}</CardDescription>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">⏱️ {module.time}</span>
                        <span className="text-slate-600">📝 {module.questions}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link to={module.path} className="w-full">
                        <Button variant="outline" className="w-full" onClick={() => loadTest('sample', 'general')}>
                          Start {module.title} Test
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TestSelection;
