import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { TimerDisplay } from './TimerDisplay';
import { TimerControls } from './TimerControls';
import { LanguageToggle } from './LanguageToggle';
import { useTranslation } from '@/hooks/useTranslation';

const PRESET_TIMES = [3, 5, 7, 10, 15, 20, 30];

export const TimerTaskPane = () => {
  const { toast } = useToast();
  const { t, currentLanguage } = useTranslation();
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  const handleInsertTimer = async (minutes: number) => {
    try {
      await PowerPoint.run(async (context) => {
        const slide = context.presentation.getActiveSlide();
        // Add a shape to hold the timer
        const shape = slide.shapes.addTextBox("00:00");
        shape.left = 100;
        shape.top = 100;
        shape.width = 200;
        shape.height = 100;
        
        await context.sync();
        
        toast({
          title: t('timerInserted'),
          description: t('timerInsertedDesc', { minutes }),
        });
      });
    } catch (error) {
      console.error('Error inserting timer:', error);
      toast({
        variant: "destructive",
        title: t('error'),
        description: t('errorInsertingTimer'),
      });
    }
  };

  return (
    <div className={`p-4 h-full ${currentLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-ms-dark">{t('countdownTimer')}</h1>
        <LanguageToggle />
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold mb-3">{t('presetTimers')}</h2>
          <div className="grid grid-cols-3 gap-2">
            {PRESET_TIMES.map((minutes) => (
              <Button
                key={minutes}
                variant="outline"
                className="w-full"
                onClick={() => handleInsertTimer(minutes)}
              >
                {minutes} {t('minutes')}
              </Button>
            ))}
          </div>
        </section>

        {selectedTime && (
          <>
            <TimerDisplay minutes={selectedTime} />
            <TimerControls />
          </>
        )}
      </div>
    </div>
  );
};