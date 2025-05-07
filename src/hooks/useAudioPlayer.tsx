
import { useEffect } from 'react';
import { useAudioPlayback } from './useAudioPlayback';
import { useAudioOperations } from './useAudioOperations';
import { useAudioQueue } from './useAudioQueue';

export const useAudioPlayer = () => {
  // Use the basic audio playback hook
  const {
    isPlaying,
    setIsPlaying,
    isReady,
    setIsReady,
    audioRef,
    ensureAudioElement,
    stopAudio,
    cleanupAudio
  } = useAudioPlayback();

  // Use the audio operations hook
  const { playAudio, forcePlayAudio } = useAudioOperations({
    audioRef,
    setIsPlaying,
    setIsReady,
    ensureAudioElement
  });

  // Use the audio queue hook
  const {
    audioQueue,
    handleAudioEnded,
    setupAudioEndedListener,
    queueAudioWithDelays
  } = useAudioQueue({
    audioRef,
    setIsPlaying,
    ensureAudioElement,
    playAudio
  });

  // Setup the event listener for audio ended
  useEffect(() => {
    return setupAudioEndedListener();
  }, [setupAudioEndedListener]);

  return {
    isPlaying,
    isReady,
    playAudio,
    forcePlayAudio,
    queueAudioWithDelays,
    stopAudio,
    cleanupAudio,
    audioRef
  };
};
