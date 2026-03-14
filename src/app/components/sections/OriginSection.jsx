"use client";

import { useRef, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ParticleCanvas from "../ParticleCanvas";
import { HeroParticle } from "../../utils/particles";

gsap.registerPlugin(ScrollTrigger);

const HERO_COLORS = ["212,168,67", "245,209,107", "46,95,161", "240,237,228"];

const OriginSection = forwardRef(function OriginSection({ t, migrationRef }, ref) {
  const containerRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroLoreRef = useRef(null);
  const heroBtnRef = useRef(null);
  const scrollIndRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroContentRef = useRef(null);

  useGSAP(() => {
    // Hero entrance timeline
    const tl = gsap.timeline({ delay: 2.6 }); // delay accounts for loader
    tl.to(heroSubRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      .to(heroTitleRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.6")
      .to(heroLoreRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.6")
      .to(heroBtnRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .to(scrollIndRef.current, { opacity: 0.6, duration: 1, ease: "power2.out" }, "-=0.4");

    // Hero image parallax
    gsap.to(heroImageRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Hero content fade-out on scroll
    gsap.to(heroContentRef.current, {
      opacity: 0,
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "60% top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  const handleScroll = () => {
    migrationRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="origin" className="section texture-noise" ref={(el) => {
      containerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    }}>
      <ParticleCanvas
        ParticleClass={HeroParticle}
        colors={HERO_COLORS}
        countDivisor={6000}
        maxCount={200}
        sectionId="origin"
        drawConnections={true}
        connectionColor="212,168,67"
        connectionDistance={100}
        mouseInteractive={true}
      />
      <div className="hero-image-wrapper">
        <img src="/images/ak-ana.png" alt="Ak Ana" ref={heroImageRef} />
      </div>
      <div className="hero-content" ref={heroContentRef}>
        <p className="hero-subtitle" ref={heroSubRef}>{t("hero.subtitle")}</p>
        <h1 className="hero-title" ref={heroTitleRef}>{t("hero.title")}</h1>
        <p className="hero-lore" ref={heroLoreRef} dangerouslySetInnerHTML={{ __html: t("hero.lore") }} />
        <button className="btn-liquid" ref={heroBtnRef} onClick={handleScroll}>
          <span>{t("hero.btn")}</span><span>↓</span>
        </button>
      </div>
      <div className="scroll-indicator" ref={scrollIndRef}>
        <span>{t("hero.scroll")}</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
});

export default OriginSection;
