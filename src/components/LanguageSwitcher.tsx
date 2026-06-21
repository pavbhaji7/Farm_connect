"use client";

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div style={{ marginTop: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
      <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Language:</span>
      <select 
        value={locale} 
        onChange={(e) => setLocale(e.target.value)}
        style={{
          background: 'transparent',
          color: 'var(--primary)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer'
        }}
      >
        <option value="en" style={{ color: '#000' }}>English</option>
        <option value="hi" style={{ color: '#000' }}>हिंदी (Hindi)</option>
        <option value="ta" style={{ color: '#000' }}>தமிழ் (Tamil)</option>
      </select>
    </div>
  );
}
