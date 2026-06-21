"use client";

import { useLanguage } from '@/context/LanguageContext';

export default function FeedbackArea() {
  const { t } = useLanguage();

  return (
    <section className="section" style={{ backgroundColor: 'var(--white)' }}>
      <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
        <h2 className="section-title">{t('feedback.title', "We'd Love Your Feedback")}</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '32px', fontSize: '1.1rem' }}>
          {t('feedback.subtitle', "Got a question or suggestion? Reach out to us directly!")}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '1.1rem', fontWeight: 500 }}>
            <span>📧</span>
            <span>{t('feedback.email', "Email us at: farmconnect@gmail.com")}</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '1.1rem', fontWeight: 500 }}>
            <span>📞</span>
            <span>{t('feedback.phone', "Call us: +(91) 97895-58225")}</span>
          </div>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
          <textarea 
            rows={4} 
            className="form-input" 
            placeholder={t('feedback.placeholder', "Write your feedback here...")}
            style={{ resize: 'vertical' }}
            required
          ></textarea>
          <button type="submit" className="btn btn-primary" style={{ padding: '12px 32px' }}>
            {t('feedback.submit', "Submit Feedback")}
          </button>
        </form>
      </div>
    </section>
  );
}
