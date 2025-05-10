
// Audio with delay interface
export interface AudioWithDelay {
  src: string;
  delayAfter?: number;
  onEnd?: () => void;
}

// Return type for useAudioPlayer hook
export interface UseAudioPlayerReturn {
  isPlaying: boolean;
  isReady: boolean;
  hasUserInteracted: boolean;
  audioError: string | null;
  playAudio: (src?: string) => Promise<boolean | void>;
  queueAudioWithDelays: (audioSequence: AudioWithDelay[]) => Promise<void>;
  stopAudio: () => void;
  pauseAudio: () => void;
  simulateUserInteraction: () => void;
  cleanupAudio: () => void;
  getCurrentSrc: () => string;
}
