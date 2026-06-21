"use client";

import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';

export default function Header() {
  const { cartCount } = useCart();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          🌱 Farm Connect
        </div>
        <nav>
          <ul className="nav-links">
            <li><a href="/" className="nav-link">{t('nav.home', 'Home')}</a></li>
            <li><a href="/shop" className="nav-link">{t('nav.shop', 'Shop')}</a></li>
            <li><a href="/about" className="nav-link">{t('nav.about', 'About Us')}</a></li>
            <li><a href="/contact" className="nav-link">{t('nav.contact', 'Contact')}</a></li>
          </ul>
        </nav>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href="/cart" className="cart-icon" style={{ textDecoration: 'none' }}>
            🛒
            {mounted && cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </a>
          <a href="/login" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>{t('nav.login', 'Login')}</a>
        </div>
      </div>
    </header>
  );
}
