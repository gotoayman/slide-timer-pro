import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

export const LanguageToggle = () => {
  const { currentLanguage, setLanguage } = useTranslation();

  return (
    <Button
      variant="outline"
      onClick={() => setLanguage(currentLanguage === 'en' ? 'ar' : 'en')}
    >
      {currentLanguage === 'en' ? 'العربية' : 'English'}
    </Button>
  );
};