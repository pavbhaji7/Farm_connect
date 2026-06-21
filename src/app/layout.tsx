import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Farm Connect | Pure Like Mom's Love",
  description: "There is always no substitute for moms love and food, but I found one which is no where lesser than mom's food... None other than Farm Connect.",
};

import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Translate from "@/components/Translate";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <CartProvider>
            <Header />

            <main>{children}</main>

            <footer className="footer">
              <div className="container">
                <div className="footer-grid">
                  <div>
                    <h3 className="footer-title">🌱 Farm Connect</h3>
                    <p style={{ color: 'var(--text-light)', marginBottom: '16px' }}>
                      <Translate tKey="hero.subtitle" fallback="There is always no substitute for moms love and food, but I found one which is no where lesser than mom's food..." />
                    </p>
                  </div>
                  <div>
                    <h3 className="footer-title"><Translate tKey="footer.quickLinks" fallback="Quick Links" /></h3>
                    <ul className="footer-links">
                      <li><a href="/shop"><Translate tKey="footer.shopAll" fallback="Shop All" /></a></li>
                      <li><a href="/about"><Translate tKey="nav.about" fallback="About Us" /></a></li>
                      <li><a href="/contact"><Translate tKey="nav.contact" fallback="Contact Us" /></a></li>
                    </ul>
                    <LanguageSwitcher />
                  </div>
                  <div>
                    <h3 className="footer-title"><Translate tKey="footer.categories" fallback="Categories" /></h3>
                    <ul className="footer-links">
                      <li><a href="/category/baby-foods">Organic Baby Foods</a></li>
                      <li><a href="/category/diabetic">Diabetic Supplements</a></li>
                      <li><a href="/category/snacks">Healthy Snacks</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="footer-title"><Translate tKey="footer.contact" fallback="Contact" /></h3>
                    <ul className="footer-links">
                      <li>Farm Connect, chengalpattu - 603001</li>
                      <li>+(91) 99999-99999</li>
                      <li>farmconnect@gmail.com</li>
                    </ul>
                  </div>
                </div>
                <div className="footer-bottom">
                  <p>&copy; {new Date().getFullYear()} Farm Connect. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
