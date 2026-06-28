"use client";

import { forwardRef, useState, useEffect, useRef } from "react";
import Link from "next/link";

const TopBar = forwardRef(function TopBar({ t, lang, onSwitchLang, realmRef }, ref) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuPanelRef = useRef(null);
  const menuBtnRef = useRef(null);

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

  // Escape-to-close + simple focus trap while the mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const panel = menuPanelRef.current;
    const focusables = panel
      ? panel.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
      : [];
    focusables[0]?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        menuBtnRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

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
            <Link href="/sozluk" className="top-bar-link">
              {t("glossary.title")}
            </Link>
            <Link href="/soy-agaci" className="top-bar-link">
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
            type="button"
            ref={menuBtnRef}
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-panel"
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
      <div
        id="mobile-menu-panel"
        ref={menuPanelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("topBar.title")}
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}
      >
        <Link href="/sozluk" className="custom-link" onClick={closeMenu} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
          {t("glossary.title")}
        </Link>
        <Link href="/soy-agaci" className="custom-link" onClick={closeMenu} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
          {t("familyTree.title")}
        </Link>
        <div className="mobile-menu-realm">
          <span className="mobile-menu-realm-label">{t("topBar.currentRealm", "Şu an")}</span>
          <span className="mobile-menu-realm-value">{t("realms.origin")}</span>
        </div>
      </div>
    </>
  );
});

export default TopBar;
