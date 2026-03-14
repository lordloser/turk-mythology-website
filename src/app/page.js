"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import "../i18n";
import { useGSAP } from "@gsap/react";
/* ── Components ─────────────────────────────── */
import Loader from "./components/Loader";
import TopBar from "./components/TopBar";
import OriginSection from "./components/sections/OriginSection";
import MigrationSection from "./components/sections/MigrationSection";
import WorldTreeSection from "./components/sections/WorldTreeSection";
import RitualSection from "./components/sections/RitualSection";
import PantheonSection from "./components/sections/PantheonSection";
import BestiarySection from "./components/sections/BestiarySection";
import ShadowRealmSection from "./components/sections/ShadowRealmSection";
import SagasSection from "./components/sections/SagasSection";
import FooterSection from "./components/sections/FooterSection";

/* ── Register GSAP plugin once at module level ─ */
gsap.registerPlugin(ScrollTrigger);

/* ================================================================
   THE INFINITE CYCLE — Main Page Orchestrator
   ================================================================ */
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { t, i18n } = useTranslation();

  // DÜZELTME 1: State artık "tr" ile başlıyor
  const [lang, setLang] = useState("tr");

  /* ── Refs for cross-component communication ── */
  const topBarRef = useRef(null);
  const realmRef = useRef(null);

  const sectionRefs = {
    origin: useRef(null),
    migration: useRef(null),
    "world-tree": useRef(null),
    pantheon: useRef(null),
    bestiary: useRef(null),
    "shadow-realm": useRef(null),
    sagas: useRef(null),
  };

  /* ── Language Switch ─────────────────────── */
  function switchLang(lng) {
    i18n.changeLanguage(lng);
    setLang(lng);
  }
  // DÜZELTME 2: Geri dönüşlerdeki GSAP kayma sorununun çözümü
  useGSAP(() => {
    // Tarayıcı ortamında mıyız ve URL'de bir "#" (hash) var mı?
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash; // Örn: "#sagas"

      // GSAP'in yatay kaydırma boşluklarını hesaplaması için yarım saniye süre veriyoruz
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, []);

  return (
    <>
      <Loader t={t} />

      <TopBar
        ref={topBarRef}
        t={t}
        lang={lang}
        onSwitchLang={switchLang}
        realmRef={realmRef}
      />


      <OriginSection
        ref={sectionRefs.origin}
        t={t}
        migrationRef={sectionRefs.migration}
      />

      <MigrationSection ref={sectionRefs.migration} t={t} />

      <WorldTreeSection ref={sectionRefs["world-tree"]} t={t} />

      <RitualSection t={t} />

      <PantheonSection ref={sectionRefs.pantheon} t={t} />

      <BestiarySection ref={sectionRefs.bestiary} t={t} />

      <ShadowRealmSection
        ref={sectionRefs["shadow-realm"]}
        t={t}
        topBarRef={topBarRef}
      />

      <SagasSection ref={sectionRefs.sagas} t={t} />

      <FooterSection t={t} />
    </>
  );
}
