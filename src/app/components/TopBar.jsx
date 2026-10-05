"use client";

import { forwardRef, useState, useEffect, useRef } from "react";
import Link from "next/link";

const EXPLORE_LINKS = [
  { href: "/sozluk", labelKey: "glossary.title" },
  { href: "/soy-agaci", labelKey: "familyTree.title" },
  { href: "/yeralti-varliklari", labelKey: "nav.compendium" },
  { href: "/kaynakca", labelKey: "nav.sources" },
];

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

  // Keşfet menüsü: dışarı tıklayınca veya Esc ile kapanır
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    if (!isExploreOpen) return;
    const onDown = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setIsExploreOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setIsExploreOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isExploreOpen]);

  return (
    <>
      <header className="top-bar" ref={ref}>
        <Link href="/" className="top-bar-logo" style={{ textDecoration: 'none', color: 'inherit' }} aria-label={t("nav.home")}>
          <div className="logo-icon">𐱅</div>
          <span>{t("topBar.title")}</span>
        </Link>
        
        <div className="top-bar-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          
          {/* Desktop Links */}
          <div className="top-bar-links-desktop">
            <Link href="/kozmoloji" className="custom-link nav-link">
              {t("nav.cosmos")}
            </Link>

            {/* Keşfet açılır menüsü */}
            <div className="nav-dropdown" ref={dropdownRef}>
              <button
                type="button"
                className="custom-link nav-link nav-dropdown-btn"
                aria-expanded={isExploreOpen}
                aria-haspopup="true"
                onClick={() => setIsExploreOpen((o) => !o)}
              >
                {t("nav.explore")} <span aria-hidden="true">▾</span>
              </button>
              {isExploreOpen && (
                <div className="nav-dropdown-menu" role="menu">
                  {EXPLORE_LINKS.map((l) => (
                    <Link key={l.href} href={l.href} role="menuitem" onClick={() => setIsExploreOpen(false)}>
                      {t(l.labelKey)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

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
        <Link href="/kozmoloji" className="custom-link" onClick={closeMenu} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
          {t("nav.cosmos")}
        </Link>
        <Link href="/yeralti-varliklari" className="custom-link" onClick={closeMenu} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
          {t("nav.compendium")}
        </Link>
        <Link href="/kaynakca" className="custom-link" onClick={closeMenu} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
          {t("nav.sources")}
        </Link>
        <div className="realm-indicator" style={{ marginTop: 'auto', alignSelf: 'flex-start', color: 'var(--celestial-gold)' }}>
          {t("realms.origin")}
        </div>
      </div>
    </>
  );
});

export default TopBar;
