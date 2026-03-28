"use client";

import { useRef, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ParticleCanvas from "../ParticleCanvas";
import { SagaFlake } from "../../utils/particles";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

const SAGAS = [
  { key: "ergenekon", img: "ergenekon", index: "I", textId: "sagaText1" },
  { key: "oghuz", img: "oghuz-khagan", index: "II", textId: "sagaText2", reversed: true },
  { key: "asena", img: "asena", index: "III", textId: "sagaText3" },
  { key: "manas", img: "manas", index: "IV", textId: "sagaText4", reversed: true },
];

const SagasSection = forwardRef(function SagasSection({ t }, ref) {
  const containerRef = useRef(null);
  const sagaTextRefs = useRef([]);
  const sagaImgRefs = useRef([]);
  const sagaIndexRefs = useRef([]);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Image fade-in and parallax
    sagaImgRefs.current.forEach((img) => {
      if (!img) return;
      gsap.to(img, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: img,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      const block = img.closest(".saga-block");
      if (block) {
        gsap.to(img, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: block,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    // Text fade in
    sagaTextRefs.current.forEach((textEl) => {
      if (!textEl) return;
      gsap.to(textEl, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textEl,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Index parallax
    sagaIndexRefs.current.forEach((idx) => {
      if (!idx) return;
      const block = idx.closest(".saga-block");
      if (block) {
        gsap.to(idx, {
          yPercent: -40,
          ease: "none",
          scrollTrigger: {
            trigger: block,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    // Reveal elements
    const reveals = container.querySelectorAll(".reveal");
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
    <section id="sagas" className="section" ref={(el) => {
      containerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    }}>
      <ParticleCanvas
        ParticleClass={SagaFlake}
        countDivisor={14000}
        maxCount={70}
        sectionId="sagas"
      />
      <div className="section-inner">
        <div className="section-header reveal">
          <span className="section-tag">{t("sagas.tag")}</span>
          <h2 className="heading-xl">
            {t("sagas.heading")} <span className="gold">{t("sagas.headingGold")}</span>
          </h2>
          <p className="body-lg" style={{ maxWidth: 600, margin: "16px auto 0" }}>
            {t("sagas.desc")}
          </p>
        </div>
        {SAGAS.map((saga, i) => (
          <div
            className={`saga-block${saga.reversed ? " reversed" : ""}`}
            key={saga.key}
          >
            <div className="saga-visual">
              <img
                src={`/images/${saga.img}.png`}
                alt={t(`sagas.${saga.key}.title`)}
                ref={(el) => { sagaImgRefs.current[i] = el; }}
              />
              <div className="saga-visual-overlay" />
            </div>
            <div
              className="saga-text"
              ref={(el) => { sagaTextRefs.current[i] = el; }}
            >
              <div
                className="saga-index"
                ref={(el) => { sagaIndexRefs.current[i] = el; }}
              >
                {saga.index}
              </div>
              <h3 className="heading-lg">{t(`sagas.${saga.key}.title`)}</h3>
              <p dangerouslySetInnerHTML={{ __html: t(`sagas.${saga.key}.p1`) }} />
              <p dangerouslySetInnerHTML={{ __html: t(`sagas.${saga.key}.p2`) }} />
              <Link href={`/sagas/${saga.key}`} passHref>
                <button className="saga-link">
                  <span>{t("sagas.explore")}</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default SagasSection;
