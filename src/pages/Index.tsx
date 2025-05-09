
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckSquare, BarChart } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Program 21 Hari Skor IELTS 7.0</h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Master all IELTS sections with personalized practice, instant feedback, and proven strategies.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/test">
              <Button size="lg" className="gap-2">
                <CheckSquare className="h-5 w-5" />
                Take Assessment Test
              </Button>
            </Link>
            <Link to="/curriculum">
              <Button size="lg" variant="outline" className="gap-2">
                <BookOpen className="h-5 w-5" />
                View 21-Day Curriculum
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">How Our IELTS Preparation Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Test</CardTitle>
                <CardDescription>Evaluate your current IELTS level</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Take our comprehensive assessment test to identify your strengths and weaknesses across all IELTS sections.</p>
              </CardContent>
              <CardFooter>
                <Link to="/test" className="w-full">
                  <Button className="w-full">Start Assessment</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>21-Day Curriculum</CardTitle>
                <CardDescription>Follow our structured learning path</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Access our proven 21-day curriculum with specialized materials for Listening, Reading, Writing, and Speaking.</p>
              </CardContent>
              <CardFooter>
                <Link to="/curriculum" className="w-full">
                  <Button variant="outline" className="w-full">View Curriculum</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>Monitor your improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <p>See your progress over time, with detailed feedback and personalized recommendations.</p>
              </CardContent>
              <CardFooter>
                <Link to="/results" className="w-full">
                  <Button variant="outline" className="w-full">View Results</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
