import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useTest } from '@/context/TestContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Award, BarChart3, BookOpen, Headphones, FileEdit, Clock, GraduationCap } from 'lucide-react';
import { TestResult } from '@/types/test';

const Results = () => {
  const navigate = useNavigate();
  const { testResults, evaluateAllSections } = useTest();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const loadResults = async () => {
      if (!testResults) {
        setLoading(true);
        try {
          await evaluateAllSections();
          toast.success('Test results generated');
        } catch (error) {
          console.error('Error loading results:', error);
          toast.error('Failed to load results');
          navigate('/test');
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadResults();
  }, [testResults, evaluateAllSections, navigate]);
  
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-ielts-blue mb-4"></div>
            <p>Generating test results...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!testResults) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <p className="mb-4">No test results available</p>
            <Button onClick={() => navigate('/test')}>Go to Test Selection</Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout className="pb-16">
      <div className="max-w-6xl mx-auto space-y-8 px-4 md:px-6 py-6 md:py-10">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold flex justify-center items-center gap-2">
            Your IELTS Results <Sparkles className="text-yellow-500" />
          </h1>
          <p className="text-muted-foreground">
            Test date: {new Date(testResults.date).toLocaleDateString()}
          </p>
        </div>
        
        <OverallScore score={testResults.overallBandScore} />
        
        <SectionScores testResults={testResults} />
        
        <ProficiencyCategories testResults={testResults} />
        
        <StrengthsWeaknesses testResults={testResults} />
        
        <DetailedResults testResults={testResults} />
        
        <div className="flex justify-center mt-8">
          <Button onClick={() => navigate('/test')} size="lg">
            Return to Test Selection
          </Button>
        </div>
      </div>
    </Layout>
  );
};

const OverallScore = ({ score }: { score: number }) => (
  <Card className="border-2 border-ielts-lightblue bg-gradient-to-br from-white to-blue-50">
    <CardHeader className="text-center pb-2">
      <CardTitle className="text-xl text-ielts-blue">Overall Band Score</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col items-center">
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-ielts-blue text-white text-4xl font-bold">
        {score}
      </div>
      <p className="mt-4 text-center text-sm md:text-base">
        {score >= 8 ? (
          <span className="font-medium text-green-600">Expert level (Very Good to Expert)</span>
        ) : score >= 6.5 ? (
          <span className="font-medium text-blue-600">Competent to Good</span>
        ) : score >= 5 ? (
          <span className="font-medium text-yellow-600">Modest to Competent</span>
        ) : (
          <span className="font-medium text-red-600">Limited to Modest</span>
        )}
      </p>
    </CardContent>
  </Card>
);

const SectionScores = ({ testResults }: { testResults: TestResult }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <ScoreCard title="Listening" score={testResults.sections[0].bandScore} icon={<Headphones className="w-6 h-6" />} />
    <ScoreCard title="Reading" score={testResults.sections[1].bandScore} icon={<BookOpen className="w-6 h-6" />} />
    <ScoreCard title="Writing" score={testResults.sections[2].bandScore} icon={<FileEdit className="w-6 h-6" />} />
    {/* Removed Speaking ScoreCard */}
  </div>
);

const ScoreCard = ({ title, score, icon }: { title: string; score: number; icon: React.ReactNode }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg flex items-center gap-2">
        {icon} {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold">{score}</div>
        <div className="text-sm px-2 py-1 rounded bg-gray-100">
          {score >= 8 ? (
            <span className="text-green-600">Expert</span>
          ) : score >= 7 ? (
            <span className="text-blue-600">Good</span>
          ) : score >= 6 ? (
            <span className="text-yellow-600">Competent</span>
          ) : score >= 5 ? (
            <span className="text-orange-600">Modest</span>
          ) : (
            <span className="text-red-600">Limited</span>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

const ProficiencyCategories = ({ testResults }: { testResults: TestResult }) => {
  const getProficiencyLevel = (score: number) => {
    if (score >= 6.5) return { level: 'Advanced', color: 'bg-green-100 text-green-800' };
    if (score >= 4.5) return { level: 'Intermediate', color: 'bg-blue-100 text-blue-800' };
    return { level: 'Beginner', color: 'bg-amber-100 text-amber-800' };
  };

  const listeningScore = testResults.sections[0].bandScore;
  const readingScore = testResults.sections[1].bandScore;
  const writingScore = testResults.sections[2].bandScore;

  const listeningLevel = getProficiencyLevel(listeningScore);
  const readingLevel = getProficiencyLevel(readingScore);
  const writingLevel = getProficiencyLevel(writingScore);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-ielts-blue" /> Your Proficiency Categories
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-indigo-600" />
                <span className="font-medium">Listening</span>
              </div>
              <span className="text-sm font-semibold text-gray-500">Band {listeningScore}</span>
            </div>
            <div className="mt-3">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${listeningLevel.color}`}>
                {listeningLevel.level}
              </span>
              <p className="mt-2 text-sm text-gray-600">
                You'll have access to {listeningLevel.level.toLowerCase()} level listening materials.
              </p>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Reading</span>
              </div>
              <span className="text-sm font-semibold text-gray-500">Band {readingScore}</span>
            </div>
            <div className="mt-3">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${readingLevel.color}`}>
                {readingLevel.level}
              </span>
              <p className="mt-2 text-sm text-gray-600">
                You'll have access to {readingLevel.level.toLowerCase()} level reading materials.
              </p>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileEdit className="h-5 w-5 text-emerald-600" />
                <span className="font-medium">Writing</span>
              </div>
              <span className="text-sm font-semibold text-gray-500">Band {writingScore}</span>
            </div>
            <div className="mt-3">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${writingLevel.color}`}>
                {writingLevel.level}
              </span>
              <p className="mt-2 text-sm text-gray-600">
                You'll have access to {writingLevel.level.toLowerCase()} level writing materials.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StrengthsWeaknesses = ({ testResults }: { testResults: TestResult }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Award className="w-5 h-5 text-green-500" /> Strengths
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          {testResults.strengths.map((strength, index) => (
            <li key={index} className="text-sm">{strength}</li>
          ))}
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-amber-500" /> Areas for Improvement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          {testResults.weaknesses.map((weakness, index) => (
            <li key={index} className="text-sm">{weakness}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  </div>
);

const DetailedResults = ({ testResults }: { testResults: TestResult }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle>Detailed Results</CardTitle>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="listening" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="listening">Listening</TabsTrigger>
          <TabsTrigger value="reading">Reading</TabsTrigger>
          <TabsTrigger value="writing">Writing</TabsTrigger>
          {/* Removed Speaking tab */}
        </TabsList>
        
        <TabsContent value="listening">
          <SectionDetail
            section={testResults.sections[0]}
            accuracyData={{
              correct: testResults.sections[0].details.correctAnswers,
              total: testResults.sections[0].details.totalQuestions,
            }}
          />
        </TabsContent>
        
        <TabsContent value="reading">
          <SectionDetail
            section={testResults.sections[1]}
            accuracyData={{
              correct: testResults.sections[1].details.correctAnswers,
              total: testResults.sections[1].details.totalQuestions,
            }}
          />
        </TabsContent>
        
        <TabsContent value="writing">
          <div className="space-y-4">
            <h3 className="text-md font-medium">Task 1 Assessment</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Strengths</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {testResults.sections[2].details.task1.strengths.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Areas for Improvement</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {testResults.sections[2].details.task1.weaknesses.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <h4 className="text-sm font-medium mt-4 mb-2">Assessment Criteria</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {testResults.sections[2].details.task1.criteria.map((criterion, i) => (
                <Card key={i} className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="font-medium text-xs mb-1">{criterion.name}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">{criterion.score}</span>
                      <span className="text-xs text-gray-500">(out of {criterion.maxScore})</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Removed Speaking TabsContent */}
      </Tabs>
    </CardContent>
  </Card>
);

interface AccuracyData {
  correct: number;
  total: number;
}

const SectionDetail = ({ section, accuracyData }: { section: any; accuracyData: AccuracyData }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-gray-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Award className="w-6 h-6 text-blue-700" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Band Score</div>
            <div className="text-xl font-bold">{section.bandScore}</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-full">
            <BarChart3 className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Accuracy</div>
            <div className="text-xl font-bold">
              {section.details.accuracy || `${Math.round((accuracyData.correct / Math.max(accuracyData.total, 1)) * 100)}%`}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-amber-100 p-2 rounded-full">
            <Clock className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Questions</div>
            <div className="text-xl font-bold">{accuracyData.correct}/{accuracyData.total}</div>
          </div>
        </CardContent>
      </Card>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Strengths</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {section.details.strengths?.map((strength: string, i: number) => (
            <li key={i}>{strength}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-3">Areas for Improvement</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {section.details.weaknesses?.map((weakness: string, i: number) => (
            <li key={i}>{weakness}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default Results;
