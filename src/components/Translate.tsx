"use client";

import { useLanguage } from '@/context/LanguageContext';

export default function Translate({ tKey, fallback }: { tKey: string; fallback?: string }) {
  const { t } = useLanguage();
  return <>{t(tKey, fallback)}</>;
}
