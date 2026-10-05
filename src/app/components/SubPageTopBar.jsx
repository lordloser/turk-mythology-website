"use client";

import { useTranslation } from "react-i18next";
import "@/i18n";
import TopBar from "./TopBar";

/* Alt sayfalarda kullanılan, dil değiştirmeyi kendisi yöneten üst bar */
export default function SubPageTopBar() {
  const { t, i18n } = useTranslation();
  return <TopBar t={t} lang={i18n.language} onSwitchLang={(lng) => i18n.changeLanguage(lng)} />;
}
