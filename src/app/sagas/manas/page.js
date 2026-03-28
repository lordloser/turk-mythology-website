"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import "@/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function ManasEpic() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".epic-header", {
      y: -50,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out"
    });

    const paragraphs = gsap.utils.toArray(".epic-paragraph");
    paragraphs.forEach((p) => {
      gsap.from(p, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        scrollTrigger: {
          trigger: p,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} style={{ background: "var(--bg-dark)", minHeight: "100vh", color: "var(--text-primary)", paddingBottom: "100px" }}>

      {/* HERO */}
      <div className="epic-hero" style={{ position: "relative", height: "65vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginTop: "60px" }}>
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "url('/images/manas.png')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            opacity: 0.5,
            filter: "brightness(0.55) contrast(1.1)"
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2), var(--bg-dark))" }} />

        {/* Atmospheric crimson glow */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(139,20,20,0.15) 0%, transparent 70%)" }} />

        <div className="epic-header" style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 20px" }}>
          <span style={{ color: "var(--celestial-gold)", letterSpacing: "6px", fontSize: "0.85rem", textTransform: "uppercase" }}>
            {t("epic.manas.subtitle", "The Eternal Champion of the Steppes")}
          </span>
          <h1 style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", fontFamily: "var(--font-display)", margin: "12px 0", color: "var(--text-primary)", textShadow: "0 4px 30px rgba(0,0,0,0.9)" }}>
            {t("epic.manas.title", "THE EPIC OF MANAS")}
          </h1>
          {/* IV badge */}
          <span style={{ display: "inline-block", marginTop: "12px", padding: "4px 20px", border: "1px solid rgba(212,168,67,0.4)", color: "rgba(212,168,67,0.7)", fontSize: "0.8rem", letterSpacing: "4px" }}>
            SAGA IV
          </span>
        </div>
      </div>

      {/* BACK LINK */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <Link href="/#sagas" style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", letterSpacing: "1px", transition: "color 0.3s" }} className="hover-gold">
          <span>←</span> {t("common.back", "Back to Sagas")}
        </Link>
      </div>

      {/* CONTENT */}
      <article style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px", fontSize: "1.15rem", lineHeight: "1.9", color: "var(--text-secondary)" }}>

        <p className="epic-paragraph" style={{ marginBottom: "30px" }}>
          {t("epic.manas.p1")}
        </p>
        <p className="epic-paragraph" style={{ marginBottom: "30px" }}>
          {t("epic.manas.p2")}
        </p>

        <h3 className="epic-paragraph" style={{ color: "var(--celestial-gold)", fontSize: "1.8rem", marginTop: "60px", marginBottom: "20px", fontFamily: "var(--font-display)", borderBottom: "1px solid rgba(212,168,67,0.2)", paddingBottom: "12px" }}>
          {t("epic.manas.h2", "The Forty Heroes — Kyrk Choro")}
        </h3>

        <p className="epic-paragraph" style={{ marginBottom: "30px" }}>
          {t("epic.manas.p3")}
        </p>
        <p className="epic-paragraph" style={{ marginBottom: "30px" }}>
          {t("epic.manas.p4")}
        </p>

        {/* Final cinematic quote block */}
        <p className="epic-paragraph" style={{ marginBottom: "30px", padding: "24px 28px", borderLeft: "3px solid var(--celestial-gold)", background: "rgba(212, 168, 67, 0.05)", color: "var(--text-primary)", fontStyle: "italic", borderRadius: "0 8px 8px 0" }}>
          {t("epic.manas.p5")}
        </p>
      </article>
    </main>
  );
}
