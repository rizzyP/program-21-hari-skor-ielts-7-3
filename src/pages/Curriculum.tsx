
import React from 'react';
import { ChevronDown, Lock, Unlock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CurriculumDay {
  day: number;
  title: string;
  duration: string;
  progress?: string;
  locked?: boolean;
  items?: {
    title: string;
    duration: string;
  }[];
  route?: string;
}

const CurriculumPage = () => {
  const curriculumData: CurriculumDay[] = [
    { 
      day: 1, 
      title: "Materi Listening: Introduction", 
      duration: "60 min", 
      progress: "0/1",
      locked: false,
      route: "/curriculum/day1",
      items: [
        { title: "Chapter 1.1: Format Dasar IELTS Listening", duration: "15 min" },
        { title: "Chapter 1.2: Mendengarkan Detail Faktual", duration: "15 min" },
        { title: "Chapter 1.3: Aksen dan Pengucapan", duration: "15 min" },
        { title: "Chapter 1.4: Note-taking Dasar", duration: "15 min" }
      ]
    },
    { 
      day: 2, 
      title: "Materi Listening: Beginner Level", 
      duration: "85 min", 
      progress: "0/4",
      locked: false,
      items: [
        { title: "Chapter 1.5: Mendalami Percakapan Sehari-hari (Everyday Conversations)", duration: "25 min" },
        { title: "Chapter 1.6: Strategi Jitu Section 1 (Percakapan Sehari-hari)", duration: "20 min" },
        { title: "Chapter 1.7: Strategi Jitu Section 2 (Monolog Situasional)", duration: "20 min" },
        { title: "Chapter 1.8: Mengasah Kemampuan Prediksi Konteks dan Jawaban", duration: "20 min" }
      ]
    },
    { 
      day: 3, 
      title: "Materi Listening: Multiple Choice", 
      duration: "90 min", 
      progress: "0/3",
      locked: true,
      items: [
        { title: "Multiple Choice Strategies", duration: "30 min" },
        { title: "Practice Session", duration: "45 min" },
        { title: "Review Session", duration: "15 min" }
      ]
    },
    { 
      day: 4, 
      title: "Tes IELTS bagian Listening", 
      duration: "45 min", 
      progress: "0/1",
      locked: true
    },
    { 
      day: 5, 
      title: "Materi Reading: Skimming & Scanning", 
      duration: "75 min", 
      progress: "0/3",
      locked: true
    },
    { 
      day: 6, 
      title: "Materi Reading: Vocabulary Building", 
      duration: "60 min", 
      progress: "0/2",
      locked: true
    },
    { 
      day: 7, 
      title: "Materi Reading: True/False/Not Given", 
      duration: "80 min", 
      progress: "0/3",
      locked: true
    },
    { 
      day: 8, 
      title: "Materi Reading: Paragraph Headings", 
      duration: "65 min", 
      progress: "0/2",
      locked: true
    },
    { 
      day: 9, 
      title: "Tes IELTS bagian Reading", 
      duration: "60 min", 
      progress: "0/1",
      locked: true
    },
    { 
      day: 10, 
      title: "Materi Writing: Task 1 Graphs", 
      duration: "70 min", 
      progress: "0/3",
      locked: true
    },
    { 
      day: 11, 
      title: "Materi Writing: Task 1 Processes", 
      duration: "65 min", 
      progress: "0/2",
      locked: true
    },
    { 
      day: 12, 
      title: "Materi Writing: Task 2 Opinion Essays", 
      duration: "90 min", 
      progress: "0/3",
      locked: true
    },
    { 
      day: 13, 
      title: "Materi Writing: Task 2 Problem Solution", 
      duration: "85 min", 
      progress: "0/3",
      locked: true
    },
    { 
      day: 14, 
      title: "Tes IELTS bagian Writing", 
      duration: "60 min", 
      progress: "0/1",
      locked: true
    },
    { 
      day: 15, 
      title: "Materi Speaking: Part 1 Introduction", 
      duration: "50 min", 
      progress: "0/2",
      locked: true
    },
    { 
      day: 16, 
      title: "Materi Speaking: Part 2 Long Turn", 
      duration: "65 min", 
      progress: "0/3",
      locked: true
    },
    { 
      day: 17, 
      title: "Materi Speaking: Part 3 Discussion", 
      duration: "70 min", 
      progress: "0/3",
      locked: true
    },
    { 
      day: 18, 
      title: "Materi Speaking: Pronunciation & Fluency", 
      duration: "60 min", 
      progress: "0/2",
      locked: true
    },
    { 
      day: 19, 
      title: "Tes IELTS bagian Speaking", 
      duration: "15 min", 
      progress: "0/1",
      locked: true
    },
    { 
      day: 20, 
      title: "Extreme Simulation Batch 1", 
      duration: "180 min", 
      progress: "0/1",
      locked: true
    },
    { 
      day: 21, 
      title: "Extreme Simulation Batch 2", 
      duration: "180 min", 
      progress: "0/1",
      locked: true
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3">Program 21 Hari Skor IELTS 7.0</h1>
          <p className="text-xl text-slate-600">
            Complete all materials to master IELTS and achieve your target score.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {curriculumData.map((day) => (
            <AccordionItem 
              key={day.day} 
              value={`day-${day.day}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm border"
            >
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${day.locked ? 'bg-slate-100' : 'bg-ielts-blue'}`}>
                    <span className={`text-xl font-bold ${day.locked ? 'text-slate-500' : 'text-white'}`}>
                      {day.day}
                    </span>
                  </div>
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold">
                          Day {day.day}: {day.title}
                        </h3>
                        {day.locked && <Lock className="w-4 h-4 text-slate-400" />}
                        {!day.locked && <Unlock className="w-4 h-4 text-green-500" />}
                      </div>
                    </div>
                  </AccordionTrigger>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 bg-slate-100 py-1 px-3 rounded-full text-sm">
                    {day.progress} · {day.duration}
                  </span>
                </div>
              </div>
              
              <AccordionContent className="px-4 pb-4">
                <div className="pl-16 pt-2">
                  {day.items ? (
                    <Card className="p-4 bg-slate-50">
                      {day.items.map((item, idx) => (
                        <div key={idx} className="py-3 flex justify-between items-center border-b last:border-0 border-slate-200">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                              <span className="text-xs">{idx + 1}</span>
                            </div>
                            <span className="font-medium">{item.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500">{item.duration}</span>
                          </div>
                        </div>
                      ))}
                      {day.route && (
                        <div className="mt-4">
                          <Link to={day.route}>
                            <Button variant="default" className="w-full">View Content</Button>
                          </Link>
                        </div>
                      )}
                    </Card>
                  ) : day.day === 4 || day.day === 9 || day.day === 14 || day.day === 19 || day.day === 20 || day.day === 21 ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Taking {day.title}</span>
                      </div>
                      <Button variant="default" disabled={day.locked}>
                        Take Test
                      </Button>
                    </div>
                  ) : null}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
};

export default CurriculumPage;
