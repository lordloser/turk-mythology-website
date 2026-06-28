"use client";

import { useRef, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link"; // Link bileşenini ekledik
import ParticleCanvas from "../ParticleCanvas";
import { ShadowEmber } from "../../utils/particles";

gsap.registerPlugin(ScrollTrigger);

const SHADOW_COLORS = ["255,69,0", "220,20,60", "139,0,0", "255,140,0"];

// Alkarısı'nı buradan kaldırdık, sadece Erlik Han'ın genel temaları kaldı
const SPIRIT_THREADS = [
  { icon: "🌑", nameKey: "shadow.karabura", descKey: "shadow.karaburaDesc" },
  { icon: "⚖️", nameKey: "shadow.judgment", descKey: "shadow.judgmentDesc" },
];

const UNDERWORLD_ENTITY_KEYS = ["alkarisi", "abasi", "kamos"];

const ShadowRealmSection = forwardRef(function ShadowRealmSection({ t, topBarRef }, ref) {
  const containerRef = useRef(null);
  const erlikImageRef = useRef(null);
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

    const previews = container.querySelectorAll(".shadow-explore-preview-link");
    previews.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.2 + i * 0.08,
          scrollTrigger: {
            trigger: shadowInfoRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    const mainCta = container.querySelector(".shadow-explore-main-cta");
    if (mainCta) {
      gsap.fromTo(
        mainCta,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          delay: 0.35,
          scrollTrigger: {
            trigger: shadowInfoRef.current,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Decay flash effect
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
      style={{ minHeight: "auto", paddingBottom: "60px" }}
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
          <span className="section-tag shadow-header-tag">
            {t("shadow.tag")}
          </span>
          <h2 className="heading-xl shadow-heading-main">
            {t("shadow.heading")}{" "}
            <span className="shadow-heading-accent">{t("shadow.headingAccent")}</span>
          </h2>
        </div>

        <div className="shadow-realm-layout">
          <div className="erlik-visual erlik-layout">
            <div style={{ position: "relative" }}>
              <div className="erlik-aura" />
              <img
                src="/images/erlik-han.webp"
                alt="Erlik Han"
                ref={erlikImageRef}
                className="erlik-image-style"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div
            className="shadow-info shadow-info-container"
            ref={shadowInfoRef}
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

            <div className="shadow-explore-block">
              <p className="shadow-explore-intro">{t("shadow.exploreIntro")}</p>
              <div className="shadow-explore-preview-grid" role="list">
                {UNDERWORLD_ENTITY_KEYS.map((key) => (
                  <Link
                    key={key}
                    href={`/yeralti-varliklari#${key}`}
                    className={`shadow-explore-preview-link shadow-explore-preview-link--${key}`}
                    role="listitem"
                  >
                    <span
                      className="shadow-explore-preview-thumb"
                      style={{ backgroundImage: `url('/images/${key}.webp')` }}
                      aria-hidden
                    />
                    <span className="shadow-explore-preview-text">
                      <span className="shadow-explore-preview-name">
                        {t(`kulliyat.creatures.${key}.title`)}
                      </span>
                      <span className="shadow-explore-preview-sub">
                        {t(`kulliyat.creatures.${key}.sub`)}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/yeralti-varliklari"
                className="shadow-realm-explore-btn shadow-explore-main-cta"
              >
                <span className="shadow-explore-cta-label">{t("shadow.exploreCreatures")}</span>
                <span className="shadow-explore-cta-hint">{t("shadow.exploreCtaHint")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ShadowRealmSection;