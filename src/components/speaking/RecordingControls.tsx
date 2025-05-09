
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, StopCircle, Loader2 } from 'lucide-react';

interface RecordingControlsProps {
  isRecording: boolean;
  isTranscribing?: boolean;
  examinerSpeaking: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({
  isRecording,
  isTranscribing = false,
  examinerSpeaking,
  onStartRecording,
  onStopRecording,
}) => {
  if (isRecording) {
    return (
      <div className="flex flex-col items-center mt-4">
        <Button
          onClick={onStopRecording}
          variant="destructive"
          className="flex items-center gap-2 animate-pulse"
        >
          <StopCircle className="h-4 w-4" />
          Stop Recording
        </Button>
      </div>
    );
  }

  if (isTranscribing) {
    return (
      <div className="flex justify-center mt-4">
        <div className="px-3 py-2 rounded-md bg-blue-100 text-blue-700">
          <span className="flex items-center">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Transcribing your answer...
          </span>
        </div>
      </div>
    );
  }

  if (examinerSpeaking) {
    return (
      <div className="flex justify-center mt-4">
        <div className="px-3 py-2 rounded-md bg-yellow-100 text-yellow-700">
          <span className="flex items-center">
            <span className="h-2 w-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
            Examiner is speaking...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-4">
      <Button 
        onClick={onStartRecording}
        variant="default" 
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
      >
        <Mic className="h-4 w-4" />
        Start Recording
      </Button>
    </div>
  );
};

export default RecordingControls;
