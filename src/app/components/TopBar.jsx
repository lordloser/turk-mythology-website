"use client";

import { forwardRef } from "react";

const TopBar = forwardRef(function TopBar({ t, lang, onSwitchLang, realmRef }, ref) {
  return (
    <header className="top-bar" ref={ref}>
      <div className="top-bar-logo">
        <div className="logo-icon">𐱅</div>
        <span>{t("topBar.title")}</span>
      </div>
      <div className="top-bar-right">
        <div className="realm-indicator" ref={realmRef}>
          {t("realms.origin")}
        </div>
        <div className="lang-toggle">
          <button
            className={`lang-btn${lang === "tr" ? " active" : ""}`}
            onClick={() => onSwitchLang("tr")}
          >
            TR
          </button>
          <button
            className={`lang-btn${lang === "en" ? " active" : ""}`}
            onClick={() => onSwitchLang("en")}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
});

export default TopBar;
