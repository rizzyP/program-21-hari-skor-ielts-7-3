import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { generateOverallAnalysis } from '@/services/aiService';
import { Feedback, TestResult } from '@/types/test';
import { toast } from 'sonner';

const Results = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<TestResult | null>(null);

  useEffect(() => {
    const loadResults = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would fetch results from an API
        // For this demo, we'll create mock results
        
        const sectionScores = {
          listening: 7.0,
          reading: 6.5,
          writing: 6.5,
          speaking: 7.0
        };
        
        const overallAnalysis = await generateOverallAnalysis(sectionScores);
        
        const mockResults: TestResult = {
          testId: "test-001",
          date: new Date().toISOString(),
          sections: [
            {
              sectionType: "listening",
              bandScore: sectionScores.listening,
              userAnswers: [],
              details: {
                correctAnswers: 11,
                totalQuestions: 15,
                accuracy: "73%",
                strengths: ["Understanding main ideas", "Following instructions"],
                weaknesses: ["Missing specific details", "Understanding numbers and figures"]
              }
            },
            {
              sectionType: "reading",
              bandScore: sectionScores.reading,
              userAnswers: [],
              details: {
                correctAnswers: 7,
                totalQuestions: 10,
                accuracy: "70%",
                strengths: ["Understanding main arguments", "Identifying author opinions"],
                weaknesses: ["Locating specific information", "Vocabulary limitations"]
              }
            },
            {
              sectionType: "writing",
              bandScore: sectionScores.writing,
              userAnswers: [],
              details: {
                task1: {
                  criteria: [
                    { name: "Task Achievement", score: 6.5 },
                    { name: "Coherence and Cohesion", score: 7.0 },
                    { name: "Lexical Resource", score: 6.5 },
                    { name: "Grammatical Range and Accuracy", score: 6.0 }
                  ],
                  strengths: ["Clear overview of main trends", "Good use of connectives"],
                  weaknesses: ["Limited use of vocabulary for describing trends", "Some grammatical errors"]
                },
                task2: {
                  criteria: [
                    { name: "Task Response", score: 7.0 },
                    { name: "Coherence and Cohesion", score: 6.5 },
                    { name: "Lexical Resource", score: 6.5 },
                    { name: "Grammatical Range and Accuracy", score: 6.5 }
                  ],
                  strengths: ["Clear position throughout", "Logical paragraph organization"],
                  weaknesses: ["Limited range of complex structures", "Some repetitive vocabulary"]
                }
              }
            },
            {
              sectionType: "speaking",
              bandScore: sectionScores.speaking,
              userAnswers: [],
              details: {
                criteria: [
                  { name: "Fluency and Coherence", score: 7.0 },
                  { name: "Lexical Resource", score: 7.0 },
                  { name: "Grammatical Range and Accuracy", score: 6.5 },
                  { name: "Pronunciation", score: 7.5 }
                ],
                strengths: ["Good fluency with minimal hesitation", "Clear pronunciation"],
                weaknesses: ["Occasional grammatical errors", "Limited use of complex vocabulary"]
              }
            }
          ],
          overallBandScore: overallAnalysis.overallBandScore,
          strengths: overallAnalysis.strengths,
          weaknesses: overallAnalysis.weaknesses,
          recommendations: overallAnalysis.recommendations
        };
        
        setResults(mockResults);
        toast.success('Results analysis complete', {
          description: 'View your detailed IELTS assessment below.'
        });
      } catch (error) {
        toast.error('Failed to load results', {
          description: 'Please try again or contact support if the problem persists.'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadResults();
  }, []);

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
          <div className="h-8 w-8 border-4 border-t-ielts-blue border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600">Analyzing your results...</p>
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
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Task 2 Assessment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <h4 className="font-medium">Criteria Scores:</h4>
                        {results.sections[2].details.task2.criteria.map((criterion, index) => (
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
                          {results.sections[2].details.task2.strengths.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2 text-red-700">Areas to Improve:</h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                          {results.sections[2].details.task2.weaknesses.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
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
