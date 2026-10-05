"use client";

import { useRef } from "react";
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
import UmaySection from "./components/sections/UmaySection";
import ShadowRealmSection from "./components/sections/ShadowRealmSection";
import SagasSection from "./components/sections/SagasSection";
import FooterSection from "./components/sections/FooterSection";

/* ── Register GSAP plugin once at module level ─ */
gsap.registerPlugin(ScrollTrigger);

/* ================================================================
   THE INFINITE CYCLE — Main Page Orchestrator
   ================================================================ */

export default function Home() {
  const { t, i18n } = useTranslation();

  /* ── Refs for cross-component communication ── */
  const topBarRef = useRef(null);
  const realmRef = useRef(null);

  const originRef = useRef(null);
  const migrationRef = useRef(null);
  const worldTreeRef = useRef(null);
  const pantheonRef = useRef(null);
  const bestiaryRef = useRef(null);
  const shadowRealmRef = useRef(null);
  const sagasRef = useRef(null);

  /* ── Language Switch ─────────────────────── */
  function switchLang(lng) {
    i18n.changeLanguage(lng);
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
        lang={i18n.language}
        onSwitchLang={switchLang}
        realmRef={realmRef}
      />


      <OriginSection
        ref={originRef}
        t={t}
        migrationRef={migrationRef}
      />

      <MigrationSection ref={migrationRef} t={t} />

      <WorldTreeSection ref={worldTreeRef} t={t} />

      <RitualSection t={t} />

      <PantheonSection ref={pantheonRef} t={t} />

      <UmaySection t={t} />

      <BestiarySection ref={bestiaryRef} t={t} />

      <ShadowRealmSection
        ref={shadowRealmRef}
        t={t}
        topBarRef={topBarRef}
      />

      <SagasSection ref={sagasRef} t={t} />

      <FooterSection t={t} />
    </>
  );
}
