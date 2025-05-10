
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
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  onPlay,
  onPause,
  isPlaying,
  className,
  isCurrentTrack,
  label,
  disabled = false
}) => {
  const handlePlayPause = async () => {
    if (isPlaying && isCurrentTrack) {
      onPause();
    } else {
      await onPlay(src);
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        onClick={handlePlayPause}
        variant="outline" 
        size="sm"
        disabled={disabled}
        className={cn(
          "flex items-center gap-2 bg-white",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {isPlaying && isCurrentTrack ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
        <Volume2 className="h-4 w-4" />
        {label && <span>{label}</span>}
      </Button>
    </div>
  );
};

export default AudioPlayer;
