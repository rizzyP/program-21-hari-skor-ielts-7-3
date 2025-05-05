
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Phase } from '@/components/test/TestPhases';
import ExaminerAvatar from './ExaminerAvatar';
import CueCard from './CueCard';
import RecordingControls from './RecordingControls';

interface ExaminationPanelProps {
  currentPhase: Phase;
  examinerSpeaking: boolean;
  examinerMessage: string;
  isRecording: boolean;
  onStopRecording: () => void;
  handleNavigateResults: () => void;
  fadeIn: boolean;
  currentPart: number;
  currentQuestion: number;
  transcripts: Record<string, string>;
}

const ExaminationPanel: React.FC<ExaminationPanelProps> = ({
  currentPhase,
  examinerSpeaking,
  examinerMessage,
  isRecording,
  onStopRecording,
  handleNavigateResults,
  fadeIn,
  currentPart,
  currentQuestion,
  transcripts,
}) => {
  return (
    <Card className="bg-white shadow-md overflow-hidden">
      <CardHeader className="bg-slate-50 border-b">
        <div className="flex items-center space-x-4">
          <ExaminerAvatar examinerSpeaking={examinerSpeaking} />
          <div>
            <h3 className="font-medium">Dr. Sarah Wilson</h3>
            <p className="text-sm text-slate-600">
              IELTS Speaking Examiner
              {examinerSpeaking && <span className="ml-2 text-green-500">(Speaking...)</span>}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 pb-4">
        {/* Examiner speech bubble */}
        <div className="flex mb-6">
          <div className={cn(
            "bg-slate-100 p-3 rounded-lg max-w-[85%] text-slate-800 transition-opacity duration-300",
            fadeIn ? "opacity-100" : "opacity-0",
            examinerSpeaking ? "border-l-4 border-green-500" : ""
          )}>
            {examinerMessage}
            
            {/* Show cue card in Part 2 */}
            {currentPhase === Phase.SPEAKING_PART2_PREP && <CueCard topic={examinerMessage} />}
          </div>
        </div>
        
        {/* User response area */}
        {transcripts[`p${currentPart}q${currentQuestion}`] && (
          <div className="bg-blue-50 p-3 rounded-lg ml-auto max-w-[85%] text-slate-700 mb-4">
            {transcripts[`p${currentPart}q${currentQuestion}`]}
          </div>
        )}
        
        {/* Recording status and controls */}
        <RecordingControls 
          isRecording={isRecording}
          examinerSpeaking={examinerSpeaking}
          onStopRecording={onStopRecording}
        />
      </CardContent>
      
      <CardFooter className="flex justify-end border-t bg-slate-50 py-3">
        {currentPhase === Phase.COMPLETED && (
          <Button 
            onClick={handleNavigateResults}
            className="flex items-center gap-2 bg-ielts-red hover:bg-ielts-blue"
          >
            View Results
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ExaminationPanel;
