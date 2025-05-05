
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, StopCircle, Pause } from 'lucide-react';

interface RecordingControlsProps {
  isRecording: boolean;
  examinerSpeaking: boolean;
  onStopRecording: () => void;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({
  isRecording,
  examinerSpeaking,
  onStopRecording,
}) => {
  const [showRecordingButton, setShowRecordingButton] = useState(false);
  
  // Show the automatic recording message for 2 seconds before changing to stop button
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isRecording && !showRecordingButton) {
      timer = setTimeout(() => {
        setShowRecordingButton(true);
      }, 2000);
    }
    
    if (!isRecording) {
      setShowRecordingButton(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isRecording, showRecordingButton]);

  if (isRecording) {
    if (showRecordingButton) {
      return (
        <div className="flex justify-center mt-4">
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
    } else {
      return (
        <div className="flex justify-center mt-4">
          <div className="px-3 py-2 rounded-md bg-red-100 text-red-700">
            <span className="flex items-center">
              <span className="h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              Recording started automatically...
            </span>
          </div>
        </div>
      );
    }
  }

  if (examinerSpeaking) {
    return (
      <div className="flex justify-center mt-4">
        <div className="px-3 py-2 rounded-md bg-yellow-100 text-yellow-700">
          <span className="flex items-center">
            <span className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></span>
            Examiner is speaking...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-4">
      <Button 
        disabled
        variant="outline" 
        className="flex items-center gap-2 opacity-50"
      >
        <Mic className="h-4 w-4" />
        Recording will start automatically
      </Button>
    </div>
  );
};

export default RecordingControls;
