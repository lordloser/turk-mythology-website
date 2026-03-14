"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import TopBar from "../../components/TopBar";

gsap.registerPlugin(ScrollTrigger);

export default function AsenaEpic() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);

  const switchLang = (lng) => {
    i18n.changeLanguage(lng);
  };

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
      <TopBar t={t} lang={i18n.language} onSwitchLang={switchLang} />

      <div className="epic-hero" style={{ position: "relative", height: "60vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginTop: "60px" }}>
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "url('/images/asena.png')",
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: 0.4, filter: "brightness(0.6)"
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, var(--bg-dark))" }} />

        <div className="epic-header" style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 20px" }}>
          <span style={{ color: "var(--celestial-gold)", letterSpacing: "4px", fontSize: "0.9rem", textTransform: "uppercase" }}>
            {t("epic.asena.subtitle")}
          </span>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontFamily: "var(--font-display)", margin: "10px 0", color: "var(--text-primary)", textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}>
            {t("epic.asena.title")}
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <Link href="/#sagas" style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", letterSpacing: "1px", transition: "color 0.3s" }} className="hover-gold">
          <span>←</span> {t("common.back")}
        </Link>
      </div>

      <article style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px", fontSize: "1.15rem", lineHeight: "1.8", color: "var(--text-secondary)" }}>
        <p className="epic-paragraph" style={{ marginBottom: "30px" }}>{t("epic.asena.p1")}</p>
        <p className="epic-paragraph" style={{ marginBottom: "30px" }}>{t("epic.asena.p2")}</p>
        
        <h3 className="epic-paragraph" style={{ color: "var(--steppe-emerald-light)", fontSize: "1.8rem", marginTop: "50px", marginBottom: "20px", fontFamily: "var(--font-display)" }}>
          {t("epic.asena.h2")}
        </h3>
        
        <p className="epic-paragraph" style={{ marginBottom: "30px" }}>{t("epic.asena.p3")}</p>
        <p className="epic-paragraph" style={{ marginBottom: "30px", padding: "20px", borderLeft: "3px solid var(--celestial-gold)", background: "rgba(212, 168, 67, 0.05)", color: "var(--text-primary)", fontStyle: "italic" }}>
          {t("epic.asena.p4")}
        </p>
      </article>
    </main>
  );
}
