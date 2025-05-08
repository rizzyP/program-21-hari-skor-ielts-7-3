
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
  
  return (
    <div className="flex justify-between mt-8">
      <Button 
        variant="default" 
        onClick={() => markAsCompleted(dayNumber, materialIndex)}
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
