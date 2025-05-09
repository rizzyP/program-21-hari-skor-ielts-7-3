
import React from 'react';
import { cn } from '@/lib/utils';

// This replicates the Phase enum from ListeningTest.tsx
export enum Phase {
  INSTRUCTIONS,
  PREVIEW,
  LISTENING,
  SECTION_TRANSITION,
  FINAL_REVIEW,
  COMPLETED,
  // Speaking test specific phases
  SPEAKING_INTRO,
  SPEAKING_PART1,
  SPEAKING_PART2,
  SPEAKING_PART3
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
      // Speaking test specific phases
      case Phase.SPEAKING_INTRO: return 'Meeting Your Examiner';
      case Phase.SPEAKING_PART1: return 'Speaking Part 1';
      case Phase.SPEAKING_PART2: return 'Speaking Part 2';
      case Phase.SPEAKING_PART3: return 'Speaking Part 3';
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
      // Speaking test specific phases
      case Phase.SPEAKING_INTRO: return 'bg-blue-400';
      case Phase.SPEAKING_PART1: return 'bg-green-400';
      case Phase.SPEAKING_PART2: return 'bg-orange-400';
      case Phase.SPEAKING_PART3: return 'bg-indigo-400';
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
      {currentPhase !== Phase.INSTRUCTIONS && 
       currentPhase !== Phase.COMPLETED && 
       currentPhase !== Phase.SPEAKING_INTRO && 
       currentPhase !== Phase.SPEAKING_PART1 &&
       currentPhase !== Phase.SPEAKING_PART2 &&
       currentPhase !== Phase.SPEAKING_PART3 && (
        <span className="text-xs text-slate-500">
          ({currentPhase === Phase.FINAL_REVIEW ? 'All Sections' : `${currentSection}/${totalSections}`})
        </span>
      )}
    </div>
  );
};

export { TestPhases };
