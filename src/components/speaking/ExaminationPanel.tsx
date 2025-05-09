
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronRight, Volume2 } from 'lucide-react';
import { Phase } from '@/components/test/TestPhases';
import ExaminerAvatar from './ExaminerAvatar';
import RecordingControls from './RecordingControls';
import Timer from '../test/Timer';

interface ExaminationPanelProps {
  currentPhase: Phase;
  examinerSpeaking: boolean;
  examinerMessage: string;
  isRecording: boolean;
  isTranscribing?: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  handleNavigateResults: () => void;
  fadeIn: boolean;
  currentPart: number;
  currentQuestion: number;
  transcripts: Record<string, string>;
  hasUserInteracted?: boolean;
  onEnableAudio?: () => void;
}

const ExaminationPanel: React.FC<ExaminationPanelProps> = ({
  currentPhase,
  examinerSpeaking,
  examinerMessage,
  isRecording,
  isTranscribing = false,
  onStartRecording,
  onStopRecording,
  handleNavigateResults,
  fadeIn,
  currentPart,
  currentQuestion,
  transcripts,
  hasUserInteracted = true,
  onEnableAudio
}) => {
  const [recordingTime, setRecordingTime] = useState<number>(0);
  
  // Set recording time based on current part
  useEffect(() => {
    if (currentPart === 1) setRecordingTime(30);
  }, [currentPart]);

  return (
    <Card className="bg-white shadow-md overflow-hidden">
      <CardHeader className="bg-slate-50 border-b">
        <div className="flex items-center justify-between">
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
          {isRecording && (
            <Timer 
              seconds={recordingTime} 
              onTimeUp={onStopRecording}
              className="bg-red-50 border-red-200 text-red-700" 
            />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 pb-4">
        {/* Audio warning when user hasn't interacted */}
        {!hasUserInteracted && onEnableAudio && examinerSpeaking && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md flex items-center justify-between">
            <span className="text-sm text-blue-700">
              Audio playback requires interaction. Click the button to enable audio.
            </span>
            <Button 
              onClick={onEnableAudio}
              variant="outline" 
              size="sm" 
              className="bg-white flex items-center gap-2"
            >
              <Volume2 className="h-4 w-4" /> Enable Audio
            </Button>
          </div>
        )}

        {/* Current question displayed prominently in the center */}
        {currentPhase === Phase.SPEAKING_PART1 && !examinerSpeaking && (
          <div className="text-center my-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-medium text-slate-800">{examinerMessage}</h2>
          </div>
        )}
        
        {/* Examiner speech bubble */}
        {examinerSpeaking && (
          <div className="flex mb-6">
            <div className={cn(
              "bg-slate-100 p-3 rounded-lg max-w-[85%] text-slate-800 transition-opacity duration-300",
              fadeIn ? "opacity-100" : "opacity-0",
              examinerSpeaking ? "border-l-4 border-green-500" : ""
            )}>
              {examinerMessage}
            </div>
          </div>
        )}
        
        {/* User response area */}
        {transcripts[`p${currentPart}q${currentQuestion}`] && (
          <div className="bg-blue-50 p-3 rounded-lg ml-auto max-w-[85%] text-slate-700 mb-4">
            {transcripts[`p${currentPart}q${currentQuestion}`]}
          </div>
        )}
        
        {/* Recording status and controls */}
        <RecordingControls 
          isRecording={isRecording}
          isTranscribing={isTranscribing}
          examinerSpeaking={examinerSpeaking}
          onStartRecording={onStartRecording}
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
        
        {isRecording && (
          <div className="mr-auto flex items-center">
            <span className="h-3 w-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm text-red-600 font-semibold">Recording</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ExaminationPanel;
