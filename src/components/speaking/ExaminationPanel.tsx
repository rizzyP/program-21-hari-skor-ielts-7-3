
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Phase } from '@/components/test/TestPhases';
import ExaminerAvatar from './ExaminerAvatar';
import RecordingControls from './RecordingControls';
import Timer from '../test/Timer';
import AudioPlayer from '../audio/AudioPlayer';
import CueCard from './CueCard';

interface ExaminationPanelProps {
  currentPhase: Phase;
  examinerSpeaking: boolean;
  examinerMessage: string;
  isRecording: boolean;
  isPreparing?: boolean;
  prepTime?: number;
  isTranscribing?: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  handleNavigateResults: () => void;
  fadeIn: boolean;
  currentPart: number;
  currentQuestion: number;
  transcripts: Record<string, string>;
  audioSrc?: string | null;
  isPlayingAudio?: boolean;
  onPlayAudio?: (src: string) => Promise<boolean | void>;
  onPauseAudio?: () => void;
  getCurrentSrc?: () => string;
}

const ExaminationPanel: React.FC<ExaminationPanelProps> = ({
  currentPhase,
  examinerSpeaking,
  examinerMessage,
  isRecording,
  isPreparing = false,
  prepTime = 60,
  isTranscribing = false,
  onStartRecording,
  onStopRecording,
  handleNavigateResults,
  fadeIn,
  currentPart,
  currentQuestion,
  transcripts,
  audioSrc = null,
  isPlayingAudio = false,
  onPlayAudio = async () => {},
  onPauseAudio = () => {},
  getCurrentSrc = () => ""
}) => {
  const [recordingTime, setRecordingTime] = useState<number>(30);
  
  // Set recording time based on current part
  useEffect(() => {
    if (currentPart === 1) setRecordingTime(20);
    else if (currentPart === 2) setRecordingTime(120);
    else if (currentPart === 3) setRecordingTime(40);
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
          {/* Show appropriate timer based on state */}
          {isRecording && (
            <Timer 
              seconds={recordingTime} 
              onTimeUp={onStopRecording}
              className="bg-red-50 border-red-200 text-red-700" 
            />
          )}
          {isPreparing && !isRecording && (
            <Timer 
              seconds={prepTime} 
              className="bg-yellow-50 border-yellow-200 text-yellow-700" 
              label="Preparation Time"
            />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 pb-4">
        {/* Show appropriate content based on phase */}
        {currentPhase === Phase.SPEAKING_PART1 && (
          <div className="text-center my-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-medium text-slate-800">{examinerMessage}</h2>
          </div>
        )}
        
        {currentPhase === Phase.SPEAKING_PART2 && (
          <div className="my-6 max-w-2xl mx-auto">
            {isPreparing ? (
              <CueCard question={examinerMessage} />
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-medium text-slate-800">{examinerMessage}</h2>
              </div>
            )}
          </div>
        )}
        
        {currentPhase === Phase.SPEAKING_PART3 && (
          <div className="text-center my-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-medium text-slate-800">{examinerMessage}</h2>
          </div>
        )}
        
        {/* Examiner speech bubble with audio player */}
        {examinerSpeaking && (
          <div className="flex flex-col mb-6">
            <div className={cn(
              "bg-slate-100 p-3 rounded-lg max-w-[85%] text-slate-800 transition-opacity duration-300",
              fadeIn ? "opacity-100" : "opacity-0",
              examinerSpeaking ? "border-l-4 border-green-500" : ""
            )}>
              {examinerMessage}
              
              {/* Audio player for examiner's voice */}
              {audioSrc && (
                <div className="mt-3">
                  <AudioPlayer 
                    src={audioSrc}
                    onPlay={onPlayAudio}
                    onPause={onPauseAudio}
                    isPlaying={isPlayingAudio}
                    isCurrentTrack={getCurrentSrc().includes(audioSrc)}
                    label="Play examiner audio"
                  />
                </div>
              )}
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
          isPreparing={isPreparing}
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
        
        {isPreparing && (
          <div className="mr-auto flex items-center">
            <span className="h-3 w-3 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm text-yellow-600 font-semibold">Preparation Time</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ExaminationPanel;
