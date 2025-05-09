
import { useState, useRef, useCallback, useEffect } from 'react';

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
          await transcribeRecording(audioBlob);
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

  // Transcribe recording using Web Speech API or simulated response
  const transcribeRecording = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    
    try {
      // In a real implementation, we would use actual Web Speech API or server-side transcription
      // Since browser speech recognition is limited, for demo purposes we'll simulate a response
      // based on the question
      
      // Simulated responses based on question types (better than random text)
      let simulatedText = '';
      
      if (question.includes('artistic hobbies') || question.includes('painting')) {
        simulatedText = "I enjoy several artistic hobbies. I particularly like painting with watercolors and sketching landscapes. I find it really relaxing, and it helps me express my creativity. I've been doing it since I was in school, but I'm still learning new techniques.";
      }
      else if (question.includes('art lessons') || question.includes('school')) {
        simulatedText = "In my school, we had art lessons twice a week. We learned different techniques like drawing, painting, and sometimes sculpting with clay. Our teacher was quite passionate about art history too, so we learned about famous artists alongside practical skills.";
      }
      else if (question.includes('traditional') || question.includes('new')) {
        simulatedText = "I'd say our art lessons were a mix of both traditional and new approaches. We learned classical techniques like perspective drawing and color theory, but our teacher also encouraged digital art and mixed media projects, which felt more contemporary.";
      }
      else if (question.includes('useful') || question.includes('study art')) {
        simulatedText = "I think studying art at school is very useful because it develops creativity and problem-solving skills that can be applied to many areas of life. It also teaches patience and attention to detail, which are valuable in any profession. Art education helps students express themselves in non-verbal ways too.";
      }
      else {
        simulatedText = "I think that's an interesting question. Based on my experience, I would say it depends on various factors. There are certainly advantages and disadvantages to consider, and different people might have different perspectives on this issue.";
      }
      
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
