"use client";

import { useRef, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ParticleCanvas from "../ParticleCanvas";
import { PantheonStar } from "../../utils/particles";
import NexusWeb from "../NexusWeb";

gsap.registerPlugin(ScrollTrigger);

const DEITIES = [
  { key: "ulgen", img: "ulgen" },
  { key: "kayra", img: "kayra-han" },
  { key: "kyzagan", img: "kyzagan" },
];

const PantheonSection = forwardRef(function PantheonSection({ t }, ref) {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Deity cards stagger in
    const cards = containerRef.current?.querySelectorAll(".deity-card");
    cards?.forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Reveal elements
    const reveals = containerRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section id="pantheon" className="section texture-noise" ref={(el) => {
      containerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    }}>
      <ParticleCanvas
        ParticleClass={PantheonStar}
        countDivisor={10000}
        maxCount={100}
        sectionId="pantheon"
      />
      <div className="section-inner">
        <div className="section-header reveal">
          <span className="section-tag">{t("pantheon.tag")}</span>
          <h2 className="heading-xl">
            {t("pantheon.heading")} <span className="gold">{t("pantheon.headingGold")}</span>
          </h2>
          <p className="body-lg" style={{ maxWidth: 600, margin: "16px auto 0" }}>
            {t("pantheon.desc")}
          </p>
        </div>
        <div className="deity-grid">
          {DEITIES.map(({ key, img }) => (
            <article className="deity-card" key={key}>
              <img
                className="deity-card-image"
                src={`/images/${img}.png`}
                alt={t(`pantheon.${key}.name`)}
              />
              <div className="deity-card-overlay">
                <h3 className="deity-card-title">{t(`pantheon.${key}.name`)}</h3>
                <span className="deity-card-role">{t(`pantheon.${key}.role`)}</span>
                <p className="deity-card-desc">{t(`pantheon.${key}.desc`)}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="nexus-container reveal">
          <div className="nexus-title">
            <h3 className="heading-lg">{t("pantheon.nexusTitle")}</h3>
          </div>
          <p className="nexus-subtitle">{t("pantheon.nexusDesc")}</p>
          <NexusWeb />
        </div>
      </div>
    </section>
  );
});

export default PantheonSection;
