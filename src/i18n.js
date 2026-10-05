import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import tr from "./locales/tr.json";

export const SUPPORTED_LANGS = ["tr", "en"];
export const LANG_STORAGE_KEY = "lang";

if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
        resources: {
            en: { translation: en },
            tr: { translation: tr },
        },
        // Statik HTML her zaman TR üretilir; kayıtlı dil LanguageSync ile client'ta uygulanır
        lng: "tr",
        fallbackLng: "tr",
        interpolation: {
            escapeValue: false,
        },
    });

    i18n.on("languageChanged", (lng) => {
        if (typeof window === "undefined") return;
        document.documentElement.lang = lng;
        try {
            localStorage.setItem(LANG_STORAGE_KEY, lng);
        } catch {}
    });
}

export default i18n;
