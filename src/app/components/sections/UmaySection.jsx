"use client";

import { useRef, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ParticleCanvas from "../ParticleCanvas";
import { PantheonStar } from "../../utils/particles";

gsap.registerPlugin(ScrollTrigger);

const UMAY_COLORS = ["245,209,107", "255,255,220", "220,190,255", "255,240,200"];

const UmaySection = forwardRef(function UmaySection({ t }, ref) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const infoRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Image parallax + fade in
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.92, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Info text slide in
    gsap.fromTo(
      infoRef.current,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Connection items stagger
    const connections = container.querySelectorAll(".umay-connection");
    connections.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Golden aura pulse animation
    gsap.to(container.querySelector(".umay-aura"), {
      scale: 1.08,
      opacity: 0.6,
      yoyo: true,
      repeat: -1,
      duration: 3,
      ease: "sine.inOut",
    });
  }, { scope: containerRef });

  return (
    <section
      id="umay"
      className="section umay-section"
      ref={(el) => {
        containerRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
    >
      <ParticleCanvas
        ParticleClass={PantheonStar}
        colors={UMAY_COLORS}
        countDivisor={12000}
        maxCount={80}
        sectionId="umay"
      />

      <div className="umay-bg-gradient" />

      <div className="section-inner">
        <div className="section-header umay-header">
          <span className="section-tag umay-tag">{t("umaySection.tag")}</span>
          <h2 className="heading-xl umay-title">
            {t("umaySection.heading")}{" "}
            <span className="umay-gold">{t("umaySection.headingGold")}</span>
          </h2>
          <p className="body-lg umay-desc">{t("umaySection.desc")}</p>
        </div>

        <div className="umay-layout">
          {/* Left — Image */}
          <div className="umay-visual">
            <div className="umay-aura" />
            <img
              ref={imageRef}
              src="/images/umay-ana.png"
              alt="Umay Ana"
              className="umay-image"
            />
          </div>

          {/* Right — Info */}
          <div className="umay-info" ref={infoRef}>
            <p className="umay-lore">{t("umaySection.lore1")}</p>
            <p className="umay-lore">{t("umaySection.lore2")}</p>

            <div className="umay-connections">
              <div className="umay-connection">
                <span className="umay-connection-icon">☀️</span>
                <div>
                  <div className="umay-connection-title">{t("umaySection.connection1Title")}</div>
                  <div className="umay-connection-desc">{t("umaySection.connection1Desc")}</div>
                </div>
              </div>
              <div className="umay-connection">
                <span className="umay-connection-icon">🛡️</span>
                <div>
                  <div className="umay-connection-title">{t("umaySection.connection2Title")}</div>
                  <div className="umay-connection-desc">{t("umaySection.connection2Desc")}</div>
                </div>
              </div>
            </div>

            <div className="umay-offering">
              <span>{t("umaySection.offering")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default UmaySection;
