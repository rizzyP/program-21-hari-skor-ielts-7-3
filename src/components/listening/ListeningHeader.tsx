
import React from 'react';
import { Clock } from 'lucide-react';
import { TestPhases, Phase } from '@/components/test/TestPhases';
import Timer from '@/components/test/Timer';

interface ListeningHeaderProps {
  currentPhase: Phase;
  currentSectionIndex: number;
  previewTimeRemaining: number;
  transitionTimeRemaining: number;
  reviewTimeRemaining: number;
  handleForceSubmit: () => void;
}

export const ListeningHeader: React.FC<ListeningHeaderProps> = ({
  currentPhase,
  currentSectionIndex,
  previewTimeRemaining,
  transitionTimeRemaining,
  reviewTimeRemaining,
  handleForceSubmit
}) => {
  // Format time for display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div>
        <h1 className="text-xl md:text-2xl font-bold">IELTS Listening Test</h1>
        <TestPhases 
          currentPhase={currentPhase} 
          currentSection={currentSectionIndex + 1}
          totalSections={2}
        />
      </div>
      
      {/* Dynamic timer display based on current phase */}
      {currentPhase === Phase.PREVIEW && (
        <div className="flex items-center gap-2 font-mono text-lg bg-yellow-50 rounded-md px-3 py-1 border border-yellow-200 text-yellow-700">
          <Clock className="w-5 h-5" />
          <span>Preview: {formatTime(previewTimeRemaining)}</span>
        </div>
      )}
      
      {currentPhase === Phase.SECTION_TRANSITION && (
        <div className="flex items-center gap-2 font-mono text-lg bg-blue-50 rounded-md px-3 py-1 border border-blue-200 text-blue-700">
          <Clock className="w-5 h-5" />
          <span>Next section: {transitionTimeRemaining}s</span>
        </div>
      )}
      
      {currentPhase === Phase.FINAL_REVIEW && (
        <div className="flex items-center gap-2 font-mono text-lg bg-green-50 rounded-md px-3 py-1 border border-green-200 text-green-700">
          <Clock className="w-5 h-5" />
          <span>Review: {formatTime(reviewTimeRemaining)}</span>
        </div>
      )}
      
      {currentPhase === Phase.LISTENING && <Timer onTimeUp={handleForceSubmit} />}
    </div>
  );
};
