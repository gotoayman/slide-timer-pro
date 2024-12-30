import { create } from 'zustand';

interface TranslationStore {
  currentLanguage: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
}

const translations = {
  en: {
    countdownTimer: 'Countdown Timer',
    presetTimers: 'Preset Timers',
    minutes: 'min',
    timerInserted: 'Timer Inserted',
    timerInsertedDesc: 'Timer for {{minutes}} minutes has been inserted',
    error: 'Error',
    errorInsertingTimer: 'Failed to insert timer. Please try again.',
  },
  ar: {
    countdownTimer: 'مؤقت تنازلي',
    presetTimers: 'مؤقتات مسبقة',
    minutes: 'دقيقة',
    timerInserted: 'تم إدراج المؤقت',
    timerInsertedDesc: 'تم إدراج مؤقت لمدة {{minutes}} دقيقة',
    error: 'خطأ',
    errorInsertingTimer: 'فشل في إدراج المؤقت. يرجى المحاولة مرة أخرى.',
  },
};

const useTranslationStore = create<TranslationStore>((set) => ({
  currentLanguage: 'en',
  setLanguage: (lang) => set({ currentLanguage: lang }),
}));

export const useTranslation = () => {
  const { currentLanguage, setLanguage } = useTranslationStore();

  const t = (key: keyof typeof translations.en, params?: Record<string, any>) => {
    let text = translations[currentLanguage][key] || key;
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        text = text.replace(`{{${key}}}`, value);
      });
    }
    return text;
  };

  return { t, currentLanguage, setLanguage };
};