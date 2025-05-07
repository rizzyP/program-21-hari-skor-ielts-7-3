
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phase } from '@/components/test/TestPhases';

interface ActionButtonsProps {
  currentPhase: Phase;
  handleSkipReview: () => void;
  handleForceSubmit: () => void;
  skipPreview: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  currentPhase,
  handleSkipReview,
  handleForceSubmit,
  skipPreview
}) => {
  return (
    <div className="flex justify-between pt-6 border-t sticky bottom-0 bg-white p-4 -mx-4">
      {/* Show different buttons based on the current phase */}
      {currentPhase === Phase.FINAL_REVIEW && (
        <>
          <Button variant="outline" onClick={handleSkipReview}>
            Demo: Skip Review
          </Button>
          <Button 
            onClick={handleForceSubmit} 
            className="bg-ielts-blue hover:bg-ielts-lightblue"
          >
            Submit Test
          </Button>
        </>
      )}
      
      {currentPhase === Phase.PREVIEW && (
        <Button 
          variant="outline" 
          onClick={skipPreview}
          className="ml-auto"
        >
          Skip Preview
        </Button>
      )}
      
      {/* Emergency submit button (administrative use only) */}
      {currentPhase !== Phase.COMPLETED && 
       currentPhase !== Phase.FINAL_REVIEW && (
        <Button 
          variant="outline" 
          onClick={handleForceSubmit}
          className="ml-auto"
        >
          Force Submit (Admin)
        </Button>
      )}
    </div>
  );
};
