"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import "../i18n";

/* ── Components ─────────────────────────────── */
import Loader from "./components/Loader";
import TopBar from "./components/TopBar";
import RuneNav from "./components/RuneNav";
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
export default function Home() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("en");

  /* ── Refs for cross-component communication ── */
  const topBarRef = useRef(null);
  const realmRef = useRef(null);

  /* ── Section refs for RuneNav scrolling ──── */
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

      <RuneNav t={t} sectionRefs={sectionRefs} />

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
