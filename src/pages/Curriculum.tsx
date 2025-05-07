
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Lock, Check, Video, BookOpen, FileText, TestTube } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurriculum } from '@/hooks/useCurriculum';

const Curriculum = () => {
  const { days, markAsCompleted, isAccessible, navigateToMaterial } = useCurriculum();
  const [openDay, setOpenDay] = useState<string | undefined>("day-1");

  // Helper function to get the appropriate icon based on material type
  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={18} className="text-ielts-blue" />;
      case 'reading': return <BookOpen size={18} className="text-ielts-green" />;
      case 'exercise': return <FileText size={18} className="text-ielts-red" />;
      case 'test': return <TestTube size={18} className="text-ielts-purple" />;
      default: return <FileText size={18} className="text-ielts-blue" />;
    }
  };

  return (
    <Layout className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-3xl font-bold">Program 21 Hari Skor IELTS 7.0</h1>
          <p className="text-muted-foreground">Complete all materials to master IELTS and achieve your target score.</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Accordion 
            type="single" 
            collapsible 
            value={openDay}
            onValueChange={setOpenDay}
          >
            {days.map((day, index) => {
              const dayNumber = index + 1;
              const isUnlocked = isAccessible(dayNumber);
              const completedCount = day.materials.filter(m => m.completed).length;
              const totalMaterials = day.materials.length;
              const totalMinutes = day.materials.reduce((acc, curr) => acc + curr.durationMinutes, 0);
              
              return (
                <AccordionItem value={`day-${dayNumber}`} key={`day-${dayNumber}`}>
                  <AccordionTrigger className="px-4 py-3 hover:no-underline" disabled={!isUnlocked}>
                    <div className="flex items-center w-full">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                        isUnlocked ? "bg-ielts-blue text-white" : "bg-slate-200 text-slate-500"
                      )}>
                        {isUnlocked ? dayNumber : <Lock size={14} />}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">Day {dayNumber}: {day.title}</span>
                          <Badge variant={isUnlocked ? "outline" : "secondary"} className="ml-2">
                            {completedCount}/{totalMaterials} · {totalMinutes} min
                          </Badge>
                        </div>
                        <Progress 
                          value={(completedCount / totalMaterials) * 100} 
                          className="h-1 mt-2"
                        />
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="pl-11 space-y-3">
                      {isUnlocked ? (
                        day.materials.map((material, mIndex) => (
                          <div 
                            key={`material-${dayNumber}-${mIndex}`}
                            className="border rounded-md p-3 bg-slate-50"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {getMaterialIcon(material.type)}
                                <span className="font-medium">{material.title}</span>
                                <Badge variant="outline" className="ml-2">
                                  {material.durationMinutes} min
                                </Badge>
                              </div>
                              
                              {/* For Day 1 assessment test, should navigate to test page */}
                              {dayNumber === 1 ? (
                                <Button
                                  variant={material.completed ? "secondary" : "default"}
                                  size="sm"
                                  className={cn(
                                    "gap-1",
                                    material.completed ? "bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700" : ""
                                  )}
                                  onClick={() => navigateToMaterial(dayNumber, mIndex)}
                                >
                                  {material.completed ? (
                                    <>
                                      <Check size={16} />
                                      <span>Retake Test</span>
                                    </>
                                  ) : "Take Test"}
                                </Button>
                              ) : (
                                // For other day materials
                                material.type === 'test' ? (
                                  <Button
                                    variant={material.completed ? "secondary" : "default"}
                                    size="sm"
                                    className={cn(
                                      "gap-1",
                                      material.completed ? "bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700" : ""
                                    )}
                                    onClick={() => navigateToMaterial(dayNumber, mIndex)}
                                  >
                                    {material.completed ? (
                                      <>
                                        <Check size={16} />
                                        <span>Retake Test</span>
                                      </>
                                    ) : "Take Test"}
                                  </Button>
                                ) : (
                                  <Button 
                                    variant={material.completed ? "secondary" : "outline"} 
                                    size="sm"
                                    className={cn(
                                      "gap-1",
                                      material.completed ? "bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700" : ""
                                    )}
                                    onClick={() => markAsCompleted(dayNumber, mIndex)}
                                  >
                                    {material.completed ? (
                                      <>
                                        <Check size={16} />
                                        <span>Completed</span>
                                      </>
                                    ) : "Mark as complete"}
                                  </Button>
                                )
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-slate-500">
                          <Lock className="mx-auto mb-2" size={24} />
                          <p>Complete all previous materials to unlock this day</p>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </Layout>
  );
};

export default Curriculum;
