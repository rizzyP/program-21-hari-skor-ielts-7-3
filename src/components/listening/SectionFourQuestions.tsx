
import React from 'react';
import { UserAnswer } from '@/types/test';
import { Input } from '@/components/ui/input';

interface SectionFourQuestionsProps {
  userAnswers: UserAnswer[];
  handleAnswerChange: (questionId: string, value: string) => void;
  allowAnswering: boolean;
  currentSectionIndex: number;
}

export const SectionFourQuestions: React.FC<SectionFourQuestionsProps> = ({
  userAnswers,
  handleAnswerChange,
  allowAnswering,
  currentSectionIndex
}) => {
  return (
    <div>
      <h3 className="font-medium mb-4">Section 4: Questions 11-15</h3>
      <p className="text-sm mb-4">Complete the notes about changes in the Art World.</p>
      
      <div className="space-y-6">
        <div className="bg-slate-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">Two main factors:</h4>
          <ul className="list-disc list-inside pl-2 space-y-3">
            <li>
              <strong>Technology</strong>
              <ul className="list-disc list-inside pl-6 pt-1">
                <li className="flex flex-wrap items-center gap-2">
                  Digital - the 
                  <Input 
                    placeholder="Type your answer" 
                    value={userAnswers.find(a => a.questionId === 'l-q11')?.userResponse || ''}
                    onChange={(e) => handleAnswerChange('l-q11', e.target.value)}
                    className="w-32 inline-block h-7"
                    disabled={!allowAnswering}
                  /> 
                  'high art' and 'popular culture' is not so clear (Question 11)
                </li>
              </ul>
            </li>
            <li>
              <strong>Globalization</strong>
              <ul className="list-disc list-inside pl-6 pt-1">
                <li className="flex flex-wrap items-center gap-2">
                  New art collectors are moving the 
                  <Input 
                    placeholder="Type your answer" 
                    value={userAnswers.find(a => a.questionId === 'l-q12')?.userResponse || ''}
                    onChange={(e) => handleAnswerChange('l-q12', e.target.value)}
                    className="w-32 inline-block h-7"
                    disabled={!allowAnswering}
                  /> 
                  away from the US and Europe (Question 12)
                </li>
              </ul>
            </li>
          </ul>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">Changing Definition:</h4>
          <ul className="list-disc list-inside pl-2 space-y-2">
            <li className="flex flex-wrap items-center gap-2">
              Traditional definitions of 'high art' contained strong connections to 
              <Input 
                placeholder="Type your answer" 
                value={userAnswers.find(a => a.questionId === 'l-q13')?.userResponse || ''}
                onChange={(e) => handleAnswerChange('l-q13', e.target.value)}
                className="w-32 inline-block h-7"
                disabled={!allowAnswering}
              /> (Question 13)
            </li>
            <li className="flex flex-wrap items-center gap-2">
              Contemporary art seems outside 
              <Input 
                placeholder="Type your answer" 
                value={userAnswers.find(a => a.questionId === 'l-q14')?.userResponse || ''}
                onChange={(e) => handleAnswerChange('l-q14', e.target.value)}
                className="w-32 inline-block h-7"
                disabled={!allowAnswering}
              /> 
              of previous definitions (Question 14)
            </li>
          </ul>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">Art Nationality:</h4>
          <ul className="list-disc list-inside pl-2 space-y-2">
            <li>More difficult to define</li>
            <li className="flex flex-wrap items-center gap-2">
              Easier movement of artists 
              <Input 
                placeholder="Type your answer" 
                value={userAnswers.find(a => a.questionId === 'l-q15')?.userResponse || ''}
                onChange={(e) => handleAnswerChange('l-q15', e.target.value)}
                className="w-32 inline-block h-7"
                disabled={!allowAnswering}
              /> (Question 15)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
