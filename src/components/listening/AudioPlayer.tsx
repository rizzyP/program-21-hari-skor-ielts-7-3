
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface AudioPlayerProps {
  isPlaying: boolean;
  audioProgress: number;
  audioMuted: boolean;
  currentSectionIndex: number;
  userInteracted: boolean;
  handleManualPlay: () => void;
  toggleMute: () => void;
  handleSkipSection: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  audioProgress,
  audioMuted,
  currentSectionIndex,
  userInteracted,
  handleManualPlay,
  toggleMute,
  handleSkipSection
}) => {
  return (
    <div className="bg-slate-100 rounded-md p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">
          Audio Player - Section {currentSectionIndex + 1}
          {currentSectionIndex === 0 ? " (listening-1.mp3)" : " (listening-2.mp3)"}
        </span>
        <span className={`text-xs px-2 py-1 ${isPlaying ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} rounded-full`}>
          {isPlaying ? 'Playing...' : 'Paused'}
        </span>
      </div>
      <Progress value={audioProgress} className="h-2 mb-2" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Admin play button - hidden from test takers */}
          <Button
            onClick={handleManualPlay}
            variant="outline"
            size="sm"
            className="hidden"
          >
            Admin: Play/Pause
          </Button>
          
          <button
            onClick={toggleMute}
            className="p-1 rounded hover:bg-slate-200 transition-colors"
          >
            {audioMuted ? (
              <VolumeX className="text-gray-600 w-5 h-5" />
            ) : (
              <Volume2 className="text-blue-600 w-5 h-5" />
            )}
          </button>
        </div>
        <span className="text-xs text-slate-500">
          {!userInteracted && !isPlaying ? 
            "Audio will start automatically" : 
            "Listening to authentic audio recording"}
        </span>
        {/* Skip button for demo purposes (would not exist in real test) */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSkipSection}
          className="text-xs"
        >
          Demo: Skip Audio
        </Button>
      </div>
    </div>
  );
};
