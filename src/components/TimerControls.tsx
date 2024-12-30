import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export const TimerControls = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center space-x-2">
      <Button variant="outline" size="icon">
        <Play className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Pause className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
};