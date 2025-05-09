
import { useCallback } from 'react';
import { useVoiceRecorder } from './useVoiceRecorder';

export const useRecordingControls = (
  currentPart: number,
  currentQuestion: number,
  setIsRecording: (isRecording: boolean) => void,
  setTranscripts: (value: React.SetStateAction<Record<string, string>>) => void,
  handleNextQuestion: () => void,
  currentQuestionText?: string
) => {
  const { 
    isRecording,
    isTranscribing, 
    audioURL,
    transcription,
    startRecording: startVoiceRecording,
    stopRecording: stopVoiceRecording
  } = useVoiceRecorder({
    maxDuration: 30, // 30 seconds max recording time
    question: currentQuestionText || '',
    onTranscriptionComplete: (text) => {
      // Save the transcription and move to next question
      setTranscripts(prev => ({
        ...prev,
        [`p${currentPart}q${currentQuestion}`]: text
      }));
      
      // Short delay to allow the user to see their transcription before moving on
      setTimeout(() => {
        handleNextQuestion();
      }, 1500);
    }
  });

  const handleStartRecording = useCallback(() => {
    setIsRecording(true);
    startVoiceRecording();
  }, [setIsRecording, startVoiceRecording]);

  const handleStopRecording = useCallback(() => {
    stopVoiceRecording();
    setIsRecording(false);
  }, [stopVoiceRecording, setIsRecording]);

  const cleanupRecordingTimeout = useCallback(() => {
    // Empty function as cleanup is handled inside the useVoiceRecorder hook
  }, []);

  return {
    isRecording,
    isTranscribing,
    audioURL,
    transcription,
    handleStartRecording,
    handleStopRecording,
    cleanupRecordingTimeout
  };
};
