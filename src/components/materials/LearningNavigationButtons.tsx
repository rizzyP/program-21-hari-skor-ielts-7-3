
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";
import { useCurriculum } from "@/hooks/useCurriculum";

interface LearningNavigationButtonsProps {
  dayNumber: number;
  materialIndex: number;
}

export const LearningNavigationButtons = ({ 
  dayNumber, 
  materialIndex 
}: LearningNavigationButtonsProps) => {
  const { markAsCompleted } = useCurriculum();
  
  const handleMarkAsCompleted = () => {
    // Ensure these are valid numbers
    if (typeof dayNumber !== 'number' || typeof materialIndex !== 'number' || 
        isNaN(dayNumber) || isNaN(materialIndex) || 
        dayNumber < 1 || materialIndex < 0) {
      console.error('Invalid dayNumber or materialIndex', { dayNumber, materialIndex });
      return;
    }
    
    markAsCompleted(dayNumber, materialIndex);
  };
  
  return (
    <div className="flex justify-between mt-8">
      <Button 
        variant="default" 
        onClick={handleMarkAsCompleted}
      >
        <Check className="mr-2 h-4 w-4" />
        Mark as Completed
      </Button>
      <Button variant="outline" asChild>
        <Link to="/curriculum">
          <ChevronRight className="ml-2 h-4 w-4" />
          Back to Curriculum
        </Link>
      </Button>
    </div>
  );
};
