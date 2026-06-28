"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function normalizeLang(code) {
  if (!code) return "tr";
  const base = String(code).split("-")[0].toLowerCase();
  return base === "en" ? "en" : "tr";
}

export default function FloatingLangToggle({ className = "" }) {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("tr");

  useEffect(() => {
    setLang(normalizeLang(i18n.language));
    const onChange = (lng) => setLang(normalizeLang(lng));
    i18n.on("languageChanged", onChange);
    return () => i18n.off("languageChanged", onChange);
  }, [i18n]);

  const switchLang = (lng) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  return (
    <div
      className={`floating-lang-toggle ${className}`.trim()}
      role="toolbar"
      aria-label={t("common.langToolbarAria")}
    >
      <div className="lang-toggle">
        <button
          type="button"
          className={`lang-btn${lang === "tr" ? " active" : ""}`}
          onClick={() => switchLang("tr")}
          aria-pressed={lang === "tr"}
        >
          TR
        </button>
        <button
          type="button"
          className={`lang-btn${lang === "en" ? " active" : ""}`}
          onClick={() => switchLang("en")}
          aria-pressed={lang === "en"}
        >
          EN
        </button>
      </div>
    </div>
  );
}
