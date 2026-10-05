"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import "../i18n";
import { useGSAP } from "@gsap/react";
/* ── Above-the-fold / ref-wired components (eager) ─
   Origin is the hero; Migration receives migrationRef (read by Origin
   for its scroll-down action), so both stay in the initial bundle. */
import Loader from "./components/Loader";
import TopBar from "./components/TopBar";
import OriginSection from "./components/sections/OriginSection";
import MigrationSection from "./components/sections/MigrationSection";

/* ── Below-the-fold, ref-less sections (code-split) ─
   None of these need a forwarded ref, so next/dynamic splits them
   into separate chunks without breaking any wiring. */
const WorldTreeSection = dynamic(() => import("./components/sections/WorldTreeSection"));
const RitualSection = dynamic(() => import("./components/sections/RitualSection"));
const PantheonSection = dynamic(() => import("./components/sections/PantheonSection"));
const UmaySection = dynamic(() => import("./components/sections/UmaySection"));
const BestiarySection = dynamic(() => import("./components/sections/BestiarySection"));
const ShadowRealmSection = dynamic(() => import("./components/sections/ShadowRealmSection"));
const SagasSection = dynamic(() => import("./components/sections/SagasSection"));
const FooterSection = dynamic(() => import("./components/sections/FooterSection"));

/* ── Register GSAP plugin once at module level ─ */
gsap.registerPlugin(ScrollTrigger);

/* ================================================================
   THE INFINITE CYCLE — Main Page Orchestrator
   ================================================================ */

export default function Home() {
  const { t, i18n } = useTranslation();

  /* ── Refs for cross-component communication ──
     Only the refs that are actually read live here. Section anchors
     for hash navigation use DOM ids, not refs. */
  const topBarRef = useRef(null);
  const realmRef = useRef(null);
  const migrationRef = useRef(null);

  /* ── Language Switch ─────────────────────── */
  // Seçilen dil i18n.js tarafından kaydedilir ve <html lang> güncellenir
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


      <OriginSection t={t} migrationRef={migrationRef} />

      <MigrationSection ref={migrationRef} t={t} />

      <WorldTreeSection t={t} />

      <RitualSection t={t} />

      <PantheonSection t={t} />

      <UmaySection t={t} />

      <BestiarySection t={t} />

      <ShadowRealmSection t={t} topBarRef={topBarRef} />

      <SagasSection t={t} />

      <FooterSection t={t} />
    </>
  );
}
