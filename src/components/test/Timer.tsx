
import React, { useEffect, useState } from 'react';
import { useTest } from '@/context/TestContext';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface TimerProps {
  onTimeUp?: () => void;
  className?: string;
}

const Timer: React.FC<TimerProps> = ({ onTimeUp, className }) => {
  const { timeRemaining, setTimeRemaining, isTestActive } = useTest();
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isTestActive && timeRemaining > 0) {
      interval = setInterval(() => {
        // Fix: Use the number directly instead of the updater function
        // since the TestContext expects a direct number value
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0 && onTimeUp) {
      onTimeUp();
    }

    // Set warning state when less than 5 minutes remain
    setIsWarning(timeRemaining > 0 && timeRemaining <= 300);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timeRemaining, isTestActive, setTimeRemaining, onTimeUp]);

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
      <span>{formatTime(timeRemaining)}</span>
    </div>
  );
};

export default Timer;
