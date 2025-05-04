
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { BookOpen, Headphones, FileText, Mic, BarChart } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="space-y-10 py-6">
        {/* Hero section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            <span className="text-ielts-blue">IELTS</span> AI Mentor
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Complete IELTS assessment with AI-powered feedback and analysis to help you achieve your target band score.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/test">
              <Button size="lg" className="bg-ielts-blue hover:bg-ielts-lightblue">
                Start Full Test
              </Button>
            </Link>
            <Link to="/practice">
              <Button variant="outline" size="lg">
                Practice Sections
              </Button>
            </Link>
          </div>
        </section>

        {/* Test modules section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">IELTS Test Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Listening",
                description: "Audio-based test with various question types",
                icon: <Headphones className="h-8 w-8 text-ielts-blue" />,
                color: "bg-blue-50",
                time: "30 minutes",
                questions: "15 questions",
              },
              {
                title: "Reading",
                description: "Comprehension test with academic passages",
                icon: <BookOpen className="h-8 w-8 text-ielts-green" />,
                color: "bg-green-50",
                time: "20 minutes",
                questions: "10 questions",
              },
              {
                title: "Writing",
                description: "Essay writing and data interpretation",
                icon: <FileText className="h-8 w-8 text-ielts-lightblue" />,
                color: "bg-cyan-50",
                time: "60 minutes",
                questions: "2 tasks",
              },
              {
                title: "Speaking",
                description: "Recorded responses to interview questions",
                icon: <Mic className="h-8 w-8 text-ielts-red" />,
                color: "bg-red-50",
                time: "11-14 minutes",
                questions: "3 parts",
              },
            ].map((module, idx) => (
              <Card key={idx} className={`${module.color} border-none shadow-sm hover:shadow transition-shadow`}>
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
                  <Link 
                    to={`/test/${module.title.toLowerCase()}`} 
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      Practice {module.title}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Features section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "AI Assessment",
                description: "Get detailed feedback and scores analyzed by AI based on official IELTS criteria",
                icon: <BarChart className="h-6 w-6 text-ielts-blue" />,
              },
              {
                title: "Complete Test Simulation",
                description: "Experience all four IELTS test components with authentic questions and timing",
                icon: <BookOpen className="h-6 w-6 text-ielts-blue" />,
              },
              {
                title: "Detailed Analytics",
                description: "Review strengths, weaknesses, and get personalized recommendations for improvement",
                icon: <BarChart className="h-6 w-6 text-ielts-blue" />,
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-gradient-to-r from-ielts-blue to-ielts-lightblue text-white rounded-xl p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to assess your IELTS skills?</h2>
          <p className="mb-6">Take a complete IELTS test and get detailed AI feedback to improve your band score.</p>
          <Link to="/test">
            <Button size="lg" variant="secondary">
              Start Full Test Now
            </Button>
          </Link>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
