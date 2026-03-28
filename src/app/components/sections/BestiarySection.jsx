"use client";

import { useRef, useState, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CREATURES = [
  { id: "bukre", img: "bukre-dragon" },
  { id: "itbarak", img: "itbarak" },
  { id: "tulpar", img: "tulpar" },
  { id: "tepegoz", img: "tepegoz" },
  { id: "arcura", img: "arcura" },
  { id: "asena", img: "asena" },
  { id: "alkarisi", img: "alkarisi" },
  { id: "kayberen", img: "kayberen" },
];

function getCreatureName(id, t) {
  return t(`bestiary.${id}.name`);
}

function getCreatureType(id, t) {
  return t(`bestiary.${id}.type`);
}

function getCreatureDesc(id, t) {
  return t(`bestiary.${id}.desc`);
}

function getCreatureLoreTitle(id, t) {
  return t(`bestiary.${id}.loreTitle`);
}

function getCreatureLore1(id, t) {
  return t(`bestiary.${id}.lore1`);
}

function getCreatureLore2(id, t) {
  return t(`bestiary.${id}.lore2`);
}

function getCreatureConnection(id, t) {
  return t(`bestiary.${id}.connection`);
}

const BestiarySection = forwardRef(function BestiarySection({ t }, ref) {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const bukreBgRef = useRef(null);

  // Kaydırma Takip State'leri
  const currentScroll = useRef(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const { contextSafe } = useGSAP({ scope: containerRef });

  useGSAP(() => {
    // Bükre Ejderhası Arka Plan Animasyonu (Aynı kalıyor)
    if (bukreBgRef.current) {
      gsap.to(bukreBgRef.current, {
        xPercent: 30,
        y: -20,
        yoyo: true,
        repeat: -1,
        duration: 25,
        ease: "sine.inOut",
      });
    }

    // Görünür olma efektleri (Reveal)
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

  // Ok butonlarına tıklandığında çalışacak akıllı kaydırma fonksiyonu
  const scrollTrack = contextSafe((direction) => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    // Bir kartın genişliği (380px) + Gap (30px CSS'den geliyor)
    const cardWidth = track.children[0].offsetWidth + 30;

    // 3 kart birden atla (sayfalı kaydırma)
    const groupWidth = cardWidth * 3;

    // Gidilebilecek maksimum mesafe
    const maxScroll = track.scrollWidth - wrapper.offsetWidth;

    let newScroll = currentScroll.current + (direction * groupWidth);

    // Sınırları aşmayı engelle
    if (newScroll < 0) newScroll = 0;
    if (newScroll > maxScroll) newScroll = maxScroll;

    currentScroll.current = newScroll;

    // GSAP ile pürüzsüz kaydırma
    gsap.to(track, {
      x: -newScroll,
      duration: 0.9,
      ease: "power3.inOut"
    });

    // Butonların görünürlük durumlarını güncelle
    setIsAtStart(newScroll <= 0);
    setIsAtEnd(newScroll >= maxScroll - 5); // 5px tolerans payı
  });

  return (
    <section id="bestiary" className="section" ref={(el) => {
      containerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <span className="section-tag">{t("bestiary.tag")}</span>
          <h2 className="heading-xl">
            {t("bestiary.heading")} <span className="gold">{t("bestiary.headingGold")}</span>
          </h2>
          <p className="body-lg" style={{ maxWidth: 600, margin: "16px auto 0" }}>
            {t("bestiary.desc")}
          </p>
        </div>
      </div>

      {/* Kaydırma Çerçevesi */}
      <div
        className="bestiary-wrapper"
        ref={wrapperRef}
      >
        <img
          src="/images/bukre-dragon.png"
          className="bukre-bg-anim"
          ref={bukreBgRef}
          alt="Bükre Dragon Background"
        />

        {/* SOL OK (Geri) */}
        <button
          type="button"
          aria-label={t("common.prev", "Önceki")}
          onClick={() => scrollTrack(-1)}
          disabled={isAtStart}
          className={`bestiary-nav-btn prev ${isAtStart ? "disabled" : ""}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>

        {/* KARTLARIN OLDUĞU TREN */}
        <div
          className="bestiary-track"
          ref={trackRef}
          style={{ position: "relative", zIndex: 1, width: "max-content" }}
        >
          {CREATURES.map((c) => (
            <article className="creature-card" key={c.id}>
              <div className="creature-card-inner">
                <img
                  className="creature-image"
                  src={`/images/${c.img}.png`}
                  alt={getCreatureName(c.id, t)}
                />
                <div className="creature-info">
                  <h3 className="creature-name">{getCreatureName(c.id, t)}</h3>
                  <span className="creature-type">{getCreatureType(c.id, t)}</span>
                  <p className="creature-desc">{getCreatureDesc(c.id, t)}</p>
                </div>
                <div className="lore-overlay">
                  <h4>{getCreatureLoreTitle(c.id, t)}</h4>
                  <p>{getCreatureLore1(c.id, t)}</p>
                  <p>{getCreatureLore2(c.id, t)}</p>
                  <span className="lore-connection">{getCreatureConnection(c.id, t)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* SAĞ OK (İleri) */}
        <button
          type="button"
          aria-label={t("common.next", "Sonraki")}
          onClick={() => scrollTrack(1)}
          disabled={isAtEnd}
          className={`bestiary-nav-btn next ${isAtEnd ? "disabled" : ""}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>

      </div>
    </section>
  );
});

export default BestiarySection;