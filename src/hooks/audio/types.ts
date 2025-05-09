
export interface AudioWithDelay {
  src: string;
  delayAfter?: number;
  onEnd?: () => void;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  isReady: boolean;
  hasUserInteracted: boolean;
  audioError: string | null;
}

export interface UseAudioPlayerReturn {
  isPlaying: boolean;
  isReady: boolean;
  hasUserInteracted: boolean;
  audioError: string | null;
  playAudio: (src?: string) => Promise<boolean>;
  queueAudioWithDelays: (audioSequence: AudioWithDelay[]) => Promise<void>;
  stopAudio: () => void;
  pauseAudio: () => void;
  simulateUserInteraction: () => void;
  cleanupAudio: () => void;
}
