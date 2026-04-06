"use client";

import { useRef, useState, forwardRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ParticleCanvas from "../ParticleCanvas";
import { PantheonStar } from "../../utils/particles";
import NexusWeb from "../NexusWeb";
import { DEITIES } from "../../../data/mythology";
import CodexModal from "../CodexModal";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  { id: "sky", labelKey: "pantheon.tabs.sky" },
  { id: "earth", labelKey: "pantheon.tabs.earth" }
];

// Helper to get translated values safely
const safeTranslate = (id, field, t) => {
  const result = t(`pantheon.${id}.${field}`);
  return result && !result.includes(`pantheon.${id}`) ? result : "";
};

const PantheonSection = forwardRef(function PantheonSection({ t }, ref) {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("sky");
  const [selectedDeity, setSelectedDeity] = useState(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleTabClick = contextSafe((tabId) => {
    if (tabId === activeTab) return;
    
    // Animate out current cards
    gsap.to(".deity-card", {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(tabId);
      }
    });
  });

  // Animate in new cards when tab changes
  useEffect(() => {
    gsap.fromTo(".deity-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, [activeTab]);

  useGSAP(() => {
    // Initial reveal trigger for the grid container so it fades in when scrolled
    gsap.to(".deity-grid-wrapper", {
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".deity-grid-wrapper",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
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

  const openModal = (deity) => {
      setSelectedDeity({ ...deity, type: 'god' });
  };

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

        {/* Pantheon Tabs */}
        <div className="pantheon-tabs reveal">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`pantheon-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        {/* Cards Wrapper */}
        <div className="deity-grid-wrapper" style={{ opacity: 0 }}>
          <div className="deity-grid">
            {DEITIES.filter(d => d.realm === activeTab).map((deity) => (
              <article className="deity-card" key={deity.id} onClick={() => openModal(deity)}>
                <img
                  className="deity-card-image"
                  src={`/images/${deity.img}.png`}
                  alt={safeTranslate(deity.id, "name", t)}
                />
                <div className="deity-card-overlay">
                  <h3 className="deity-card-title">{safeTranslate(deity.id, "name", t)}</h3>
                  <span className="deity-card-role">{safeTranslate(deity.id, "role", t)}</span>
                  <p className="deity-card-desc">{safeTranslate(deity.id, "desc", t)}</p>
                  <Link 
                    href={`/ansiklopedi/tanrilar/${deity.id}`} 
                    className="deity-read-more"
                    onClick={(e) => { 
                      if(e.button === 0 && !e.ctrlKey && !e.metaKey) {
                         e.preventDefault(); 
                         openModal(deity); 
                      }
                    }}
                    style={{ marginTop: '15px', display: 'inline-block', fontSize: '0.85rem', color: 'var(--celestial-gold-bright)' }}
                  >
                    Detayları Görüntüle ⟶
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="nexus-container reveal">
          <div className="nexus-title">
            <h3 className="heading-lg">{t("pantheon.nexusTitle")}</h3>
          </div>
          <p className="nexus-subtitle">{t("pantheon.nexusDesc")}</p>
          <NexusWeb />
        </div>
      </div>
      
      <CodexModal 
        isOpen={!!selectedDeity} 
        onClose={() => setSelectedDeity(null)} 
        data={selectedDeity} 
        t={t} 
      />
    </section>
  );
});

export default PantheonSection;
