
import { AudioWithDelay } from './types';

/**
 * Creates and returns an audio element if it doesn't exist
 */
export const createAudioElement = (): HTMLAudioElement => {
  return new Audio();
};

/**
 * Attempts to unlock audio playback on mobile devices
 */
export const unlockAudioContext = (): void => {
  const context = window.AudioContext || (window as any).webkitAudioContext;
  if (context) {
    const audioContext = new context();
    audioContext.resume().then(() => {
      console.log('AudioContext unlocked');
    });
  }
};

/**
 * Tries to play and immediately pause audio to unlock audio playback
 */
export const silentPlayToUnlock = (audio: HTMLAudioElement): void => {
  try {
    audio.volume = 0; // Silent
    audio.play().then(() => {
      setTimeout(() => {
        audio.pause();
        audio.volume = 1.0; // Reset volume
      }, 1);
    }).catch(e => {
      // Expected error, browser still requires real user interaction
      console.log('Manual unlock still required:', e);
    });
  } catch (error) {
    console.error('Error during audio unlock attempt:', error);
  }
};

/**
 * Check if audio file exists before playing
 */
export const checkAudioExists = async (src: string): Promise<boolean> => {
  try {
    const response = await fetch(src, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error(`Error checking audio file ${src}:`, error);
    return false;
  }
};

/**
 * Formats audio sequence for queueing
 */
export const formatAudioSequence = (
  audioSequence: AudioWithDelay[]
): AudioWithDelay[] => {
  return audioSequence.filter(item => item.src).map(item => ({
    src: item.src,
    delayAfter: item.delayAfter || 0,
    onEnd: item.onEnd
  }));
};
