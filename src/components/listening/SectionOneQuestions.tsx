
import React from 'react';
import { UserAnswer } from '@/types/test';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface SectionOneQuestionsProps {
  listeningContent: any;
  userAnswers: UserAnswer[];
  handleAnswerChange: (questionId: string, value: string) => void;
  isPlaying: boolean;
}

export const SectionOneQuestions: React.FC<SectionOneQuestionsProps> = ({
  listeningContent,
  userAnswers,
  handleAnswerChange,
  isPlaying
}) => {
  return (
    <>
      {/* Section 1: Questions 1-5 (Multiple choice) */}
      <div>
        <h3 className="font-medium mb-4">Section 1: Questions 1-5</h3>
        <p className="text-sm mb-2">Complete the information below about the courses available at Southmead Art College.</p>
        <p className="text-sm mb-4 italic">Which five courses are available? Choose from options A-I.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 mb-4 text-sm">
          <div>A. Fibre Art classes</div>
          <div>B. Oil Painting classes</div>
          <div>C. Digital Art classes</div>
          <div>D. Print making classes</div>
          <div>E. Fine Art classes</div>
          <div>F. Photography classes</div>
          <div>G. Weekend courses</div>
          <div>H. Ceramic and Pottery classes</div>
          <div>I. Jewellery design classes</div>
        </div>
        
        {listeningContent.sections[0].questions.map((question: any, index: number) => {
          if (index > 4) return null; // Only show first 5 questions
            
          const savedAnswer = userAnswers.find(a => a.questionId === question.id)?.userResponse || '';
            
          return (
            <div key={question.id} className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">{index + 1}.</span>
                <RadioGroup 
                  value={savedAnswer} 
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                  className="flex flex-wrap gap-4"
                  disabled={isPlaying}
                >
                  {question.options.map((option: string) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`q${question.id}-${option}`} />
                      <Label htmlFor={`q${question.id}-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section 1B: Questions 6-10 (Notes format) */}
      <div className="mt-8 pt-4 border-t">
        <h3 className="font-medium mb-4">Section 1: Questions 6-10</h3>
        <p className="text-sm mb-4">Complete the notes about the Enrolment Plans.</p>
        
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">Plan 5</h4>
            <ul className="list-disc list-inside pl-2 space-y-2">
              <li className="flex items-center gap-2">
                <span>Question 6:</span>
                <Input 
                  placeholder="Type your answer" 
                  value={userAnswers.find(a => a.questionId === 'l-q6')?.userResponse || ''}
                  onChange={(e) => handleAnswerChange('l-q6', e.target.value)}
                  className="w-32 inline-block h-7"
                  disabled={isPlaying}
                /> evening courses
              </li>
              <li>Basic fee: $450</li>
              <li>Plus $50 enrolment fee</li>
            </ul>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">Plan 3</h4>
            <ul className="list-disc list-inside pl-2 space-y-2">
              <li>One evening course</li>
              <li className="flex items-center gap-2">
                <span>Basic fee (Question 7):</span>
                <Input 
                  placeholder="Type your answer" 
                  value={userAnswers.find(a => a.questionId === 'l-q7')?.userResponse || ''}
                  onChange={(e) => handleAnswerChange('l-q7', e.target.value)}
                  className="w-32 inline-block h-7"
                  disabled={isPlaying}
                /> 
              </li>
              <li>Plus $50 enrolment fee</li>
            </ul>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">Plan 2</h4>
            <ul className="list-disc list-inside pl-2 space-y-2">
              <li>One evening course</li>
              <li className="flex items-center gap-2">
                <span>Basic fee (Question 8):</span>
                <Input 
                  placeholder="Type your answer" 
                  value={userAnswers.find(a => a.questionId === 'l-q8')?.userResponse || ''}
                  onChange={(e) => handleAnswerChange('l-q8', e.target.value)}
                  className="w-32 inline-block h-7"
                  disabled={isPlaying}
                /> 
              </li>
              <li className="flex items-center gap-2">
                <span>Enrol before (Question 9):</span>
                <Input 
                  placeholder="Type your answer" 
                  value={userAnswers.find(a => a.questionId === 'l-q9')?.userResponse || ''}
                  onChange={(e) => handleAnswerChange('l-q9', e.target.value)}
                  className="w-32 inline-block h-7"
                  disabled={isPlaying}
                /> of this month
              </li>
              <li className="flex items-center gap-2">
                <span>Contact name (Question 10):</span>
                <Input 
                  placeholder="Type your answer" 
                  value={userAnswers.find(a => a.questionId === 'l-q10')?.userResponse || ''}
                  onChange={(e) => handleAnswerChange('l-q10', e.target.value)}
                  className="w-32 inline-block h-7"
                  disabled={isPlaying}
                /> 
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
