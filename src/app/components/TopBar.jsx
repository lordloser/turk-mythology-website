"use client";

import { forwardRef, useState, useEffect } from "react";
import Link from "next/link";

const TopBar = forwardRef(function TopBar({ t, lang, onSwitchLang, realmRef }, ref) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menu on resize to avoid stuck states
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="top-bar" ref={ref}>
        <div className="top-bar-logo">
          <div className="logo-icon">𐱅</div>
          <span>{t("topBar.title")}</span>
        </div>
        
        <div className="top-bar-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          
          {/* Desktop Links */}
          <div className="top-bar-links-desktop">
            <Link href="/sozluk" className="custom-link" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }}>
              {t("glossary.title")}
            </Link>
            <Link href="/soy-agaci" className="custom-link" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }}>
              {t("familyTree.title")}
            </Link>
            <div className="realm-indicator" ref={realmRef}>
              {t("realms.origin")}
            </div>
          </div>

          {/* Lang Toggle (Always visible) */}
          <div className="lang-toggle">
            <button
              className={`lang-btn${lang === "tr" ? " active" : ""}`}
              onClick={() => { onSwitchLang("tr"); closeMenu(); }}
            >
              TR
            </button>
            <button
              className={`lang-btn${lang === "en" ? " active" : ""}`}
              onClick={() => { onSwitchLang("en"); closeMenu(); }}
            >
              EN
            </button>
          </div>

          {/* Hamburger Button (Mobile Only) */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Mobile Overlay Background */}
      <div 
        className={`mobile-menu-overlay-bg ${isMobileMenuOpen ? "open" : ""}`} 
        onClick={closeMenu}
      />

      {/* Mobile Menu Panel */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}>
        <Link href="/sozluk" className="custom-link" onClick={closeMenu} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
          {t("glossary.title")}
        </Link>
        <Link href="/soy-agaci" className="custom-link" onClick={closeMenu} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
          {t("familyTree.title")}
        </Link>
        <div className="realm-indicator" style={{ marginTop: 'auto', alignSelf: 'flex-start', color: 'var(--celestial-gold)' }}>
          {t("realms.origin")}
        </div>
      </div>
    </>
  );
});

export default TopBar;
