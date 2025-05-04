
import React from 'react';
import { cn } from '@/lib/utils';

// This replicates the Phase enum from ListeningTest.tsx
enum Phase {
  INSTRUCTIONS,
  PREVIEW,
  LISTENING,
  SECTION_TRANSITION,
  FINAL_REVIEW,
  COMPLETED
}

interface TestPhasesProps {
  currentPhase: Phase;
  currentSection: number;
  totalSections: number;
}

const TestPhases: React.FC<TestPhasesProps> = ({ 
  currentPhase, 
  currentSection,
  totalSections 
}) => {
  const getPhaseLabel = () => {
    switch (currentPhase) {
      case Phase.INSTRUCTIONS: return 'Instructions';
      case Phase.PREVIEW: return `Section ${currentSection} Preview`;
      case Phase.LISTENING: return `Section ${currentSection} Listening`;
      case Phase.SECTION_TRANSITION: return 'Transitioning...';
      case Phase.FINAL_REVIEW: return 'Final Review';
      case Phase.COMPLETED: return 'Completed';
      default: return 'Unknown Phase';
    }
  };
  
  const getStatusColor = () => {
    switch (currentPhase) {
      case Phase.PREVIEW: return 'bg-yellow-500';
      case Phase.LISTENING: return 'bg-green-500';
      case Phase.SECTION_TRANSITION: return 'bg-blue-500';
      case Phase.FINAL_REVIEW: return 'bg-purple-500';
      case Phase.COMPLETED: return 'bg-teal-500';
      default: return 'bg-slate-500';
    }
  };
  
  return (
    <div className="flex items-center mt-1 gap-2.5">
      <span className={cn(
        "inline-block w-3 h-3 rounded-full",
        getStatusColor()
      )}></span>
      <span className="text-sm font-medium">{getPhaseLabel()}</span>
      {currentPhase !== Phase.INSTRUCTIONS && currentPhase !== Phase.COMPLETED && (
        <span className="text-xs text-slate-500">
          ({currentPhase === Phase.FINAL_REVIEW ? 'All Sections' : `${currentSection}/${totalSections}`})
        </span>
      )}
    </div>
  );
};

export { TestPhases, Phase };
