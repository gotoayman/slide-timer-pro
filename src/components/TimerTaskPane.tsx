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
      // Ensure we're in a PowerPoint context
      await Office.context.document.getSelectedDataAsync(Office.CoercionType.Text, (result) => {
        if (result.status === Office.AsyncResultStatus.Failed) {
          throw new Error('Failed to access PowerPoint context');
        }
      });

      // Get the current slide
      Office.context.document.setSelectedDataAsync("00:00", {
        coercionType: Office.CoercionType.Text,
        asyncContext: minutes
      }, (asyncResult) => {
        if (asyncResult.status === Office.AsyncResultStatus.Failed) {
          console.error('Error:', asyncResult.error.message);
          toast({
            variant: "destructive",
            title: t('error'),
            description: t('errorInsertingTimer'),
          });
        } else {
          toast({
            title: t('timerInserted'),
            description: t('timerInsertedDesc', { minutes }),
          });
        }
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