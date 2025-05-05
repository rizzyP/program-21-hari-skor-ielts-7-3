
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentPart: number;
  currentQuestion: number;
  totalQuestions: number;
  partCompleted: Record<string, boolean>;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentPart,
  currentQuestion,
  totalQuestions,
  partCompleted,
}) => {
  return (
    <div className="flex justify-between items-center py-2">
      <div className="text-sm text-slate-500">
        Part {currentPart} - Question {currentQuestion + 1} of {totalQuestions}
      </div>
      <div className="flex space-x-2">
        {[1, 2, 3].map(part => (
          <div 
            key={part} 
            className={cn(
              "h-2 w-8 rounded",
              currentPart === part ? "bg-ielts-red" : 
              partCompleted[`part${part}`] ? "bg-green-500" : "bg-slate-200"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
