import React, { useEffect, useState } from 'react';
import { useTest } from '@/context/TestContext';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface TimerProps {
  onTimeUp?: () => void;
  className?: string;
  seconds?: number; // Optional prop to set a specific time
  onTick?: (timeRemaining: number) => void; // Callback for each tick
}

const Timer: React.FC<TimerProps> = ({ 
  onTimeUp, 
  className,
  seconds,
  onTick
}) => {
  const { timeRemaining: contextTimeRemaining, setTimeRemaining: setContextTimeRemaining, isTestActive } = useTest();
  const [localTimeRemaining, setLocalTimeRemaining] = useState(seconds || contextTimeRemaining);
  const [isWarning, setIsWarning] = useState(false);

  // If the seconds prop changes, update the local time
  useEffect(() => {
    if (seconds !== undefined) {
      setLocalTimeRemaining(seconds);
    } else {
      setLocalTimeRemaining(contextTimeRemaining);
    }
  }, [seconds, contextTimeRemaining]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    // Always use our local timer when seconds are provided
    // Otherwise fall back to the context timer
    if ((seconds !== undefined || isTestActive) && localTimeRemaining > 0) {
      interval = setInterval(() => {
        const newTime = localTimeRemaining - 1;
        setLocalTimeRemaining(newTime);
        
        // Only update context if we're not using a local timer
        if (seconds === undefined) {
          setContextTimeRemaining(newTime);
        }
        
        // Call onTick callback if provided
        if (onTick) {
          onTick(newTime);

          // Call onTimeUp when timer reaches zero
          if (newTime === 0 && onTimeUp) {
            onTimeUp();
          }
        }
      }, 1000);
    }

    // Set warning state when less than 1 minute remains
    setIsWarning(localTimeRemaining > 0 && localTimeRemaining <= 60);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [localTimeRemaining, isTestActive, setContextTimeRemaining, onTimeUp, seconds, onTick]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className={cn(
        "flex items-center gap-2 font-mono text-lg bg-white rounded-md px-3 py-1 border", 
        isWarning 
          ? "border-red-300 text-red-700 animate-pulse-light" 
          : "border-gray-200 text-gray-700",
        className
      )}
    >
      <Clock className="text-current" />
      <span>{formatTime(localTimeRemaining)}</span>
    </div>
  );
};

export default Timer;
