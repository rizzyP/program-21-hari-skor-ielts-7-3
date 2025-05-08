
import { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';

export const useRecordingControls = (
  currentPart: number,
  currentQuestion: number,
  setIsRecording: (value: boolean) => void,
  setTranscripts: (value: React.SetStateAction<Record<string, string>>) => void,
  handleNextQuestion: () => void
) => {
  // Timer reference for stopping recording
  const recordingTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Callback for starting recording
  const handleStartRecording = useCallback(() => {
    console.log(`Starting recording for part ${currentPart}, question ${currentQuestion}`);
    setIsRecording(true);
    
    // Set maximum recording time based on part
    let recordingTime = 30; // Default
    
    if (currentPart === 1) recordingTime = 20;      // 20 seconds for part 1
    else if (currentPart === 2) recordingTime = 120; // 2 minutes for part 2
    else if (currentPart === 3) recordingTime = 40;  // 40 seconds for part 3
    
    // Auto-stop recording after time is up
    recordingTimeout.current = setTimeout(() => {
      handleStopRecording();
    }, recordingTime * 1000);
    
    // Show toast notification
    toast.info(`Recording started`, {
      description: `You have ${recordingTime} seconds to answer.`
    });
  }, [currentPart, currentQuestion, setIsRecording]);
  
  // Callback for stopping recording
  const handleStopRecording = useCallback(() => {
    console.log(`Stopping recording for part ${currentPart}, question ${currentQuestion}`);
    setIsRecording(false);
    
    // Clear any existing timeout
    if (recordingTimeout.current) {
      clearTimeout(recordingTimeout.current);
      recordingTimeout.current = null;
    }
    
    // Simulate adding transcript (in a real app, this would be the actual transcript)
    setTranscripts(prev => ({
      ...prev,
      [`p${currentPart}q${currentQuestion}`]: `This is a simulated answer for part ${currentPart}, question ${currentQuestion}.`
    }));
    
    // Move to next question after a brief delay
    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
    
  }, [currentPart, currentQuestion, setIsRecording, setTranscripts, handleNextQuestion]);
  
  // Clean up timeouts when component unmounts
  const cleanupRecordingTimeout = useCallback(() => {
    if (recordingTimeout.current) {
      clearTimeout(recordingTimeout.current);
      recordingTimeout.current = null;
    }
  }, []);
  
  return {
    handleStartRecording,
    handleStopRecording,
    cleanupRecordingTimeout
  };
};
