
import { useState, useRef, useCallback, useEffect } from 'react';
import { transcribeAudioWithGemini } from '@/services/openRouterService';

interface UseVoiceRecorderProps {
  onTranscriptionComplete?: (text: string) => void;
  maxDuration?: number;
  question?: string;
}

export const useVoiceRecorder = ({
  onTranscriptionComplete,
  maxDuration = 30,
  question = ''
}: UseVoiceRecorderProps = {}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up function for all resources
  const cleanupResources = useCallback(() => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    audioChunksRef.current = [];
  }, [audioURL]);

  // Stop recording function
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isRecording]);

  // Start recording function
  const startRecording = useCallback(async () => {
    try {
      cleanupResources();
      setError(null);
      setTranscription('');
      setAudioURL(null);
      setAudioBlob(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioURL(audioUrl);
        
        // Start transcription
        try {
          await transcribeAudio(audioBlob);
        } catch (error) {
          console.error('Transcription error:', error);
          setError('Failed to transcribe audio. Please try again.');
        }
        
        // Stop all tracks from the stream to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // Set a timer to automatically stop recording after maxDuration seconds
      timerRef.current = setTimeout(() => {
        if (mediaRecorderRef.current && isRecording) {
          stopRecording();
        }
      }, maxDuration * 1000);
      
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Could not access microphone. Please check your permissions.');
    }
  }, [maxDuration, cleanupResources, isRecording, stopRecording]);

  // Transcribe audio function
  const transcribeAudio = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    
    try {
      // In a production environment, we would upload the blob to a server or directly to Whisper API
      // For now, we'll use our simulated transcription with Gemini
      const simulatedText = await transcribeAudioWithGemini(question);
      
      setTranscription(simulatedText);
      
      if (onTranscriptionComplete) {
        onTranscriptionComplete(simulatedText);
      }
    } finally {
      setIsTranscribing(false);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      cleanupResources();
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [cleanupResources, isRecording]);

  return {
    isRecording,
    isTranscribing,
    audioURL,
    audioBlob,
    transcription,
    error,
    startRecording,
    stopRecording
  };
};
