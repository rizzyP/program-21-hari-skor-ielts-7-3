
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserAnswer } from '@/types/test';
import { SectionOneQuestions } from './SectionOneQuestions';
import { SectionFourQuestions } from './SectionFourQuestions';
import { Phase } from '@/components/test/TestPhases';

interface QuestionCardProps {
  currentPhase: Phase;
  currentSectionIndex: number;
  listeningSection: any;
  listeningContent: any;
  userAnswers: UserAnswer[];
  handleAnswerChange: (questionId: string, value: string) => void;
  isPlaying: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  currentPhase,
  currentSectionIndex,
  listeningSection,
  listeningContent,
  userAnswers,
  handleAnswerChange,
  isPlaying
}) => {
  if (!listeningSection || !listeningContent) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading listening test...</p>
      </div>
    );
  }

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          {currentPhase === Phase.FINAL_REVIEW 
            ? "Review All Sections" 
            : `Section ${currentSectionIndex === 0 ? '1' : '4'} Questions`}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Section 1: Questions 1-5 (Multiple choice) */}
        {(currentSectionIndex === 0 || currentPhase === Phase.FINAL_REVIEW) && (
          <div className={currentPhase !== Phase.FINAL_REVIEW || currentSectionIndex === 0 ? '' : 'mt-8 pt-8 border-t'}>
            <SectionOneQuestions
              listeningContent={listeningContent}
              userAnswers={userAnswers}
              handleAnswerChange={handleAnswerChange}
              isPlaying={isPlaying}
            />
          </div>
        )}
        
        {/* Section 4: Questions 11-15 (Art World changes) */}
        {(currentSectionIndex === 1 || currentPhase === Phase.FINAL_REVIEW) && (
          <div className={currentPhase !== Phase.FINAL_REVIEW ? '' : 'mt-8 pt-8 border-t'}>
            <SectionFourQuestions
              userAnswers={userAnswers}
              handleAnswerChange={handleAnswerChange}
              isPlaying={isPlaying}
              currentSectionIndex={currentSectionIndex}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
