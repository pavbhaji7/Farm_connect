"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import ta from '@/locales/ta.json';

const dictionaries: Record<string, Record<string, string>> = { en, hi, ta };

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, fallback?: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('farm-connect-lang');
    if (saved && dictionaries[saved]) {
      setLocaleState(saved);
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: string) => {
    if (dictionaries[newLocale]) {
      setLocaleState(newLocale);
      localStorage.setItem('farm-connect-lang', newLocale);
    }
  };

  const t = (key: string, fallback?: string) => {
    if (!mounted) return fallback || key;
    return dictionaries[locale][key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
