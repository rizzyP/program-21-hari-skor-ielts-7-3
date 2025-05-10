
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  src: string;
  onPlay: (src: string) => Promise<void | boolean>;
  onPause: () => void;
  isPlaying: boolean;
  className?: string;
  isCurrentTrack: boolean;
  label?: string;
  disabled?: boolean;
  audioCompleted?: boolean;
  onAudioComplete?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  onPlay,
  onPause,
  isPlaying,
  className,
  isCurrentTrack,
  label,
  disabled = false,
  audioCompleted = false,
  onAudioComplete
}) => {
  const handlePlayPause = async () => {
    // If audio is already completed, don't allow replay
    if (audioCompleted) {
      return;
    }
    
    if (isPlaying && isCurrentTrack) {
      onPause();
    } else {
      await onPlay(src);
      
      // If onAudioComplete is provided and this is not already playing,
      // set up a listener to call onAudioComplete when the audio finishes
      if (onAudioComplete && !isPlaying) {
        const audio = new Audio(src);
        audio.addEventListener('ended', onAudioComplete);
      }
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        onClick={handlePlayPause}
        variant="outline" 
        size="sm"
        disabled={disabled || audioCompleted}
        className={cn(
          "flex items-center gap-2 bg-white",
          (disabled || audioCompleted) && "opacity-50 cursor-not-allowed"
        )}
      >
        {isPlaying && isCurrentTrack ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
        <Volume2 className="h-4 w-4" />
        {label && <span>{label}</span>}
        {audioCompleted && <span className="text-green-600 text-xs ml-1">(Completed)</span>}
      </Button>
    </div>
  );
};

export default AudioPlayer;
