"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import TopBar from "./TopBar";

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared chrome for the 5 saga pages (hero image, GSAP reveal animations,
 * back link, article wrapper). Each page only supplies its hero art and
 * article body; everything structural that was previously copy-pasted
 * across asena/ergenekon/goc/manas/oghuz lives here once.
 */
export default function SagaPageTemplate({
  heroImage,
  heroHeight = "60vh",
  heroImagePosition = "center",
  heroOpacity = 0.4,
  heroFilter = "brightness(0.6)",
  overlayGradient = "linear-gradient(to bottom, transparent, var(--bg-dark))",
  extraHeroLayer,
  subtitleKey,
  subtitleDefault,
  titleKey,
  titleDefault,
  title,
  titleFontSize = "clamp(2.5rem, 6vw, 4.5rem)",
  badge,
  backHref = "/#sagas",
  backTextKey = "common.back",
  backTextDefault,
  showTopBar = true,
  children,
}) {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);

  const switchLang = (lng) => i18n.changeLanguage(lng);

  useGSAP(() => {
    gsap.from(".epic-header", { y: -50, opacity: 0, duration: 1.5, ease: "power3.out" });

    const paragraphs = gsap.utils.toArray(".epic-paragraph");
    paragraphs.forEach((p) => {
      gsap.from(p, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        scrollTrigger: {
          trigger: p,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} style={{ background: "var(--bg-dark)", minHeight: "100vh", color: "var(--text-primary)", paddingBottom: "100px" }}>
      {showTopBar && <TopBar t={t} lang={i18n.language} onSwitchLang={switchLang} />}

      <div
        className="epic-hero"
        style={{
          position: "relative",
          height: heroHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          marginTop: showTopBar ? "60px" : 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${heroImage}')`,
            backgroundSize: "cover",
            backgroundPosition: heroImagePosition,
            opacity: heroOpacity,
            filter: heroFilter,
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: overlayGradient }} />
        {extraHeroLayer}

        <div className="epic-header" style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 20px" }}>
          <span style={{ color: "var(--celestial-gold)", letterSpacing: "4px", fontSize: "0.9rem", textTransform: "uppercase" }}>
            {subtitleKey ? t(subtitleKey, subtitleDefault) : subtitleDefault}
          </span>
          <h1 style={{ fontSize: titleFontSize, fontFamily: "var(--font-display)", margin: "10px 0", color: "var(--text-primary)", textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}>
            {title ?? (titleKey ? t(titleKey, titleDefault) : titleDefault)}
          </h1>
          {badge}
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <Link href={backHref} style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", letterSpacing: "1px", transition: "color 0.3s" }} className="hover-gold">
          <span>←</span> {t(backTextKey, backTextDefault)}
        </Link>
      </div>

      <article style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px", fontSize: "1.15rem", lineHeight: "1.8", color: "var(--text-secondary)" }}>
        {children}
      </article>
    </main>
  );
}
