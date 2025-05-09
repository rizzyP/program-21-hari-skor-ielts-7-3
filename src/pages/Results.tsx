
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { TestResult } from '@/types/test';
import { toast } from 'sonner';
import { useTest } from '@/context/TestContext';
import { Loader2 } from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const { testResults, userAnswers, evaluateAllSections } = useTest();
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<TestResult | null>(null);

  useEffect(() => {
    const loadResults = async () => {
      setIsLoading(true);
      try {
        // Check if we already have results
        if (testResults) {
          setResults(testResults);
          return;
        }

        // If no results yet but we have answers, evaluate them
        if (userAnswers.length > 0) {
          const evaluationResults = await evaluateAllSections();
          setResults(evaluationResults);
          toast.success('Results analysis complete', {
            description: 'View your detailed IELTS assessment below.'
          });
        } else {
          // No answers to evaluate, redirect to home
          toast.error('No test data found', {
            description: 'Please complete a test first.'
          });
          navigate('/');
        }
      } catch (error) {
        toast.error('Failed to load results', {
          description: 'Please try again or contact support if the problem persists.'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadResults();
  }, [testResults, userAnswers, evaluateAllSections, navigate]);

  const getBandScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 7) return 'text-emerald-600';
    if (score >= 6) return 'text-blue-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBandScoreProgressColor = (score: number) => {
    if (score >= 8) return 'bg-green-600';
    if (score >= 7) return 'bg-emerald-600';
    if (score >= 6) return 'bg-blue-600';
    if (score >= 5) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-ielts-blue" />
          <p className="text-slate-600">Analyzing your test results...</p>
        </div>
      </Layout>
    );
  }

  if (!results) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <p className="text-red-600">Failed to load results</p>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-10 py-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Your IELTS Test Results</h1>
          <p className="text-slate-600">
            Analysis and feedback based on your performance
          </p>
        </div>

        {/* Overall Score Card */}
        <Card className="bg-white shadow-md">
          <CardHeader className="border-b pb-3 flex flex-row justify-between items-center">
            <CardTitle className="text-xl">Overall IELTS Band Score</CardTitle>
            <div className={`text-3xl font-bold ${getBandScoreColor(results.overallBandScore)}`}>
              {results.overallBandScore.toFixed(1)}
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {results.sections.map((section) => (
                <div key={section.sectionType} className="text-center space-y-2">
                  <h3 className="font-medium capitalize">{section.sectionType}</h3>
                  <div className={`text-2xl font-bold ${getBandScoreColor(section.bandScore)}`}>
                    {section.bandScore.toFixed(1)}
                  </div>
                  <Progress 
                    value={section.bandScore * 11.11} 
                    className={`h-2 ${getBandScoreProgressColor(section.bandScore)}`}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div>
                <h3 className="font-medium mb-2 text-green-700 flex items-center gap-1">
                  <span className="bg-green-100 p-1 rounded-full">✓</span> Strengths
                </h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  {results.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2 text-red-700 flex items-center gap-1">
                  <span className="bg-red-100 p-1 rounded-full">!</span> Areas to Improve
                </h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  {results.weaknesses.map((weakness, index) => (
                    <li key={index}>{weakness}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-medium mb-2">Recommendations:</h3>
              <p className="text-slate-700">{results.recommendations}</p>
            </div>
          </CardContent>
        </Card>

        {/* Section Details */}
        <Tabs defaultValue="listening" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="listening">Listening</TabsTrigger>
            <TabsTrigger value="reading">Reading</TabsTrigger>
            <TabsTrigger value="writing">Writing</TabsTrigger>
            <TabsTrigger value="speaking">Speaking</TabsTrigger>
          </TabsList>
          
          <TabsContent value="listening">
            <Card>
              <CardHeader>
                <CardTitle>Listening Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h4 className="text-sm font-medium text-slate-600">Correct Answers</h4>
                    <p className="text-2xl font-bold text-blue-700">
                      {results.sections[0].details.correctAnswers}/{results.sections[0].details.totalQuestions}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h4 className="text-sm font-medium text-slate-600">Accuracy</h4>
                    <p className="text-2xl font-bold text-blue-700">
                      {results.sections[0].details.accuracy}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h4 className="text-sm font-medium text-slate-600">Band Score</h4>
                    <p className={`text-2xl font-bold ${getBandScoreColor(results.sections[0].bandScore)}`}>
                      {results.sections[0].bandScore.toFixed(1)}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2 text-green-700">Strengths:</h3>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {results.sections[0].details.strengths.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-red-700">Areas to Improve:</h3>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {results.sections[0].details.weaknesses.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reading">
            <Card>
              <CardHeader>
                <CardTitle>Reading Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <h4 className="text-sm font-medium text-slate-600">Correct Answers</h4>
                    <p className="text-2xl font-bold text-green-700">
                      {results.sections[1].details.correctAnswers}/{results.sections[1].details.totalQuestions}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <h4 className="text-sm font-medium text-slate-600">Accuracy</h4>
                    <p className="text-2xl font-bold text-green-700">
                      {results.sections[1].details.accuracy}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <h4 className="text-sm font-medium text-slate-600">Band Score</h4>
                    <p className={`text-2xl font-bold ${getBandScoreColor(results.sections[1].bandScore)}`}>
                      {results.sections[1].bandScore.toFixed(1)}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2 text-green-700">Strengths:</h3>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {results.sections[1].details.strengths.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-red-700">Areas to Improve:</h3>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {results.sections[1].details.weaknesses.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="writing">
            <Card>
              <CardHeader>
                <CardTitle>Writing Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <h3 className="font-medium mb-2">Overall Writing Band Score</h3>
                  <div className={`text-3xl font-bold ${getBandScoreColor(results.sections[2].bandScore)}`}>
                    {results.sections[2].bandScore.toFixed(1)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Task 1 Assessment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <h4 className="font-medium">Criteria Scores:</h4>
                        {results.sections[2].details.task1.criteria.map((criterion, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-slate-700">{criterion.name}</span>
                            <span className={`font-medium ${getBandScoreColor(criterion.score)}`}>
                              {criterion.score.toFixed(1)}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2 text-green-700">Strengths:</h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                          {results.sections[2].details.task1.strengths.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2 text-red-700">Areas to Improve:</h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                          {results.sections[2].details.task1.weaknesses.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-slate-500 mb-3">
                        In this test version, only Task 1 was evaluated.
                      </p>
                      <p className="text-sm text-slate-400">
                        A complete IELTS Writing test includes two tasks.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="speaking">
            <Card>
              <CardHeader>
                <CardTitle>Speaking Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <h3 className="font-medium mb-2">Speaking Band Score</h3>
                  <div className={`text-3xl font-bold ${getBandScoreColor(results.sections[3].bandScore)}`}>
                    {results.sections[3].bandScore.toFixed(1)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Criteria Breakdown:</h3>
                    <div className="space-y-4">
                      {results.sections[3].details.criteria.map((criterion, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-slate-700">{criterion.name}</span>
                            <span className={`font-medium ${getBandScoreColor(criterion.score)}`}>
                              {criterion.score.toFixed(1)}
                            </span>
                          </div>
                          <Progress 
                            value={criterion.score * 11.11} 
                            className={`h-2 ${getBandScoreProgressColor(criterion.score)}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2 text-green-700">Strengths:</h3>
                      <ul className="list-disc list-inside space-y-1 text-slate-700">
                        {results.sections[3].details.strengths.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2 text-red-700">Areas to Improve:</h3>
                      <ul className="list-disc list-inside space-y-1 text-slate-700">
                        {results.sections[3].details.weaknesses.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Your Recorded Responses:</h3>
                  <div className="space-y-2">
                    {results.sections[3].userAnswers.map((answer, index) => (
                      <div key={index} className="bg-white p-3 rounded border">
                        <p className="text-sm font-medium">Question {index + 1}:</p>
                        <p className="text-slate-700 mt-1">"{answer.userResponse}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Next Steps */}
        <section className="bg-gradient-to-r from-ielts-blue to-ielts-lightblue text-white rounded-xl p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to Improve Your Score?</h2>
          <p className="mb-6">Take another practice test or focus on specific sections to improve your band score.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="secondary" asChild>
              <Link to="/test">Take Another Test</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/20" asChild>
              <Link to="/">Return Home</Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Results;
