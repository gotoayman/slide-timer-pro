import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface TimerDisplayProps {
  minutes: number;
}

export const TimerDisplay = ({ minutes }: TimerDisplayProps) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const { t } = useTranslation();

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (timeLeft / (minutes * 60)) * 100;
  const getProgressColor = () => {
    if (progressPercentage <= 10) return 'bg-ms-error';
    if (progressPercentage <= 30) return 'bg-ms-warning';
    return 'bg-ms-blue';
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  return (
    <div className="space-y-2">
      <div className="text-4xl font-bold text-center font-mono">
        {formatTime(timeLeft)}
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-1000",
            getProgressColor()
          )}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};