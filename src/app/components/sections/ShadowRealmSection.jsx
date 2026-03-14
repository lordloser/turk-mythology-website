"use client";

import { useRef, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ParticleCanvas from "../ParticleCanvas";
import { ShadowEmber } from "../../utils/particles";

gsap.registerPlugin(ScrollTrigger);

const SHADOW_COLORS = ["255,69,0", "220,20,60", "139,0,0", "255,140,0"];

const SPIRIT_THREADS = [
  { icon: "👁️", nameKey: "shadow.alkarisi", descKey: "shadow.alkarisiDesc" },
  { icon: "🌑", nameKey: "shadow.karabura", descKey: "shadow.karaburaDesc" },
  { icon: "⚖️", nameKey: "shadow.judgment", descKey: "shadow.judgmentDesc" },
];

const ShadowRealmSection = forwardRef(function ShadowRealmSection({ t, topBarRef }, ref) {
  const containerRef = useRef(null);
  const erlikImageRef = useRef(null);
  const alkarisiImageRef = useRef(null);
  const shadowInfoRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Erlik image fade-in
    gsap.fromTo(
      erlikImageRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Alkarisi image fade-in
    gsap.fromTo(
      alkarisiImageRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Shadow info slide-in
    gsap.fromTo(
      shadowInfoRef.current,
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: shadowInfoRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Spirit thread items stagger
    const threads = container.querySelectorAll(".spirit-thread-item");
    threads.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: shadowInfoRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Top-bar border color change via ref
    if (topBarRef?.current) {
      ScrollTrigger.create({
        trigger: container,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          topBarRef.current.style.borderBottom = "1px solid rgba(139,0,0,0.3)";
        },
        onLeave: () => {
          topBarRef.current.style.borderBottom = "";
        },
        onEnterBack: () => {
          topBarRef.current.style.borderBottom = "1px solid rgba(139,0,0,0.3)";
        },
        onLeaveBack: () => {
          topBarRef.current.style.borderBottom = "";
        },
      });
    }

    // Decay flash effect — using GSAP instead of classList + setTimeout
    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      onEnter: () => {
        document.body.classList.add("decay-active");
        gsap.delayedCall(0.6, () => document.body.classList.remove("decay-active"));
      },
    });
  }, { scope: containerRef });

  return (
    <section
      id="shadow-realm"
      className="section"
      style={{ minHeight: "auto", paddingBottom: "40px" }}
      ref={(el) => {
        containerRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
    >
      <ParticleCanvas
        ParticleClass={ShadowEmber}
        colors={SHADOW_COLORS}
        countDivisor={15000}
        maxCount={60}
        sectionId="shadow-realm"
      />
      <div className="decay-border" />
      <div className="section-inner">
        <div className="section-header reveal">
          <span
            className="section-tag"
            style={{ borderColor: "var(--abyss-crimson)", color: "var(--abyss-crimson-bright)" }}
          >
            {t("shadow.tag")}
          </span>
          <h2 className="heading-xl" style={{ color: "var(--abyss-crimson-bright)" }}>
            {t("shadow.heading")}{" "}
            <span style={{ color: "var(--abyss-magma)" }}>{t("shadow.headingAccent")}</span>
          </h2>
          <p
            className="body-lg"
            style={{ maxWidth: 600, margin: "16px auto 0", color: "rgba(232,226,214,0.5)" }}
          >
            {t("shadow.desc")}
          </p>
        </div>
        <div className="shadow-realm-layout">
          <div className="erlik-visual" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ position: "relative" }}>
              <div className="erlik-aura" />
              <img
                src="/images/erlik-han.png"
                alt="Erlik Han"
                ref={erlikImageRef}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  position: "relative",
                  zIndex: 1,
                  filter: "contrast(1.1) saturate(1.2)",
                  boxShadow: "0 0 60px rgba(139, 0, 0, 0.3)",
                }}
              />
            </div>
            <div
              ref={alkarisiImageRef}
              style={{
                position: "relative",
                width: "100%",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(139,0,0,0.3)",
                boxShadow: "0 0 40px rgba(139,0,0,0.2)",
              }}
            >
              <img
                src="/images/alkarisi.png"
                alt="Alkarısı"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: "brightness(1) contrast(1.1)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "24px",
                  background: "linear-gradient(to top, rgba(10,10,10,0.95), transparent)",
                  color: "var(--abyss-crimson-bright)",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontSize: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <span>{t("shadow.alkarisi")}</span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", letterSpacing: "1px" }}>
                  {t("shadow.tag")}
                </span>
              </div>
            </div>
          </div>
          <div
            className="shadow-info"
            ref={shadowInfoRef}
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
          >
            <h2 className="heading-xl">{t("shadow.erlikTitle")}</h2>
            <p dangerouslySetInnerHTML={{ __html: t("shadow.erlikP1") }} />
            <p dangerouslySetInnerHTML={{ __html: t("shadow.erlikP2") }} />
            <div className="spirit-threads">
              {SPIRIT_THREADS.map((st) => (
                <div className="spirit-thread-item" key={st.nameKey}>
                  <span className="thread-icon">{st.icon}</span>
                  <div>
                    <div className="thread-name">{t(st.nameKey)}</div>
                    <div className="thread-desc">{t(st.descKey)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ShadowRealmSection;
