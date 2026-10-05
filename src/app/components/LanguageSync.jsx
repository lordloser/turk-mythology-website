"use client";

import { useEffect } from "react";
import i18n, { LANG_STORAGE_KEY, SUPPORTED_LANGS } from "@/i18n";

/* Kullanıcının seçtiği dili sayfa yenilemelerinde ve sayfalar arasında korur */
export default function LanguageSync() {
  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(LANG_STORAGE_KEY);
    } catch {}
    if (saved && SUPPORTED_LANGS.includes(saved) && saved !== i18n.language) {
      i18n.changeLanguage(saved);
    }
  }, []);

  return null;
}
