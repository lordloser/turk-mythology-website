"use client";

import { useRef, useState, forwardRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const MigrationSection = forwardRef(function MigrationSection({ t }, ref) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const bgRef = useRef(null);

  // Slider State (0, 1, 2)
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 3;

  const { contextSafe } = useGSAP({ scope: containerRef });

  // Sadece ekrana ilk giriş animasyonları (ScrollTrigger ile)
  useGSAP(() => {
    // Metinleri yukarıdan yumuşakça indir
    const blocks = containerRef.current?.querySelectorAll(".migration-block");
    blocks?.forEach((block) => {
      gsap.to(block, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      });
    });
  }, { scope: containerRef });

  // Butonlara basıldığında çalışacak GSAP Slider Animasyonu
  const goToSlide = contextSafe((index) => {
    if (index < 0 || index >= totalSlides) return;
    setCurrentIndex(index);

    const xPos = `-${index * 100}vw`;

    // Metni ve Arka Planı aynı anda kaydırıyoruz
    gsap.to([trackRef.current, bgRef.current], {
      x: xPos,
      duration: 1.2,
      ease: "power3.inOut",
    });
  });

  return (
    <section id="migration" ref={(el) => {
      containerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    }}>
      <div className="migration-wrapper" style={{ position: "relative", height: "100vh", overflow: "hidden" }}>

        {/* ARKA PLAN TRENI */}
        <div className="migration-layer" ref={bgRef} style={{ display: "flex", position: "absolute", top: 0, left: 0, height: "100vh", width: "300vw" }}>
          <div className="migration-bg-panel migration-bg-1" style={{ width: "100vw", height: "100vh", flexShrink: 0, backgroundSize: "cover", backgroundPosition: "center", objectFit: "cover" }} />
          <div className="migration-bg-panel migration-bg-2" style={{ width: "100vw", height: "100vh", flexShrink: 0, backgroundSize: "cover", backgroundPosition: "center", objectFit: "cover" }} />
          <div className="migration-bg-panel migration-bg-3" style={{ width: "100vw", height: "100vh", flexShrink: 0, backgroundSize: "cover", backgroundPosition: "center", objectFit: "cover" }} />
        </div>

        {/* KONTROL BUTONLARI (Oklar ve Noktalar) */}
        <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none" }}>

          {/* Sol Ok (Geri) */}
          <button
            type="button"
            onClick={() => goToSlide(currentIndex - 1)}
            disabled={currentIndex === 0}
            style={{
              position: "absolute",
              left: "2vw",
              top: "50%",
              transform: "translateY(-50%)",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "rgba(10,10,10,0.6)",
              border: "1px solid var(--celestial-gold)",
              color: "var(--celestial-gold-bright)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: currentIndex === 0 ? "default" : "pointer",
              opacity: currentIndex === 0 ? 0 : 1,
              transition: "all 0.3s",
              pointerEvents: currentIndex === 0 ? "none" : "auto"
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          {/* Sağ Ok (İleri) */}
          <button
            type="button"
            onClick={() => goToSlide(currentIndex + 1)}
            disabled={currentIndex === 2}
            style={{
              position: "absolute",
              right: "2vw",
              top: "50%",
              transform: "translateY(-50%)",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "rgba(10,10,10,0.6)",
              border: "1px solid var(--celestial-gold)",
              color: "var(--celestial-gold-bright)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: currentIndex === 2 ? "default" : "pointer",
              opacity: currentIndex === 2 ? 0 : 1,
              transition: "all 0.3s",
              pointerEvents: currentIndex === 2 ? "none" : "auto"
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>

          {/* İndikatör Noktaları (Dots) */}
          <div style={{ position: "absolute", bottom: "5%", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "12px", pointerEvents: "auto" }}>
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                style={{ padding: 0, width: "12px", height: "12px", borderRadius: "50%", border: "1px solid var(--celestial-gold)", background: currentIndex === idx ? "var(--celestial-gold-bright)" : "transparent", cursor: "pointer", transition: "all 0.3s", boxShadow: currentIndex === idx ? "0 0 10px var(--celestial-gold)" : "none" }}
              />
            ))}
          </div>
        </div>

        {/* METİN TRENİ */}
        <div className="migration-content" ref={trackRef} style={{ display: "flex", width: "300vw", height: "100vh", position: "relative", zIndex: 10 }}>

          {/* VAGON 1 */}
          <div className="text-panel" style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", paddingLeft: "10vw", flexShrink: 0 }}>
            <div className="migration-block" style={{ opacity: 0, transform: "translateY(30px)", maxWidth: "500px" }}>
              <span className="section-tag">{t("migration.tag")}</span>
              <h2 className="heading-xl">
                {t("migration.heading")} <span className="gold">{t("migration.headingGold")}</span>
              </h2>
              <p>{t("migration.desc")}</p>
            </div>
          </div>

          {/* VAGON 2 */}
          <div className="text-panel" style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <div className="migration-block" style={{ opacity: 0, transform: "translateY(30px)", maxWidth: "500px" }}>
              <h3 className="heading-lg" style={{ color: "var(--text-secondary)" }}>
                {t("migration.ergenekon.subtitle")}
              </h3>
              <h2 className="heading-xl">{t("migration.ergenekon.title")}</h2>
              <p>{t("migration.ergenekon.text")}</p>
              <Link href="/sagas/ergenekon" passHref>
                <button type="button" className="saga-link" style={{ marginTop: "20px", pointerEvents: "auto" }}>
                  <span>{t("sagas.explore")}</span>
                </button>
              </Link>
            </div>
          </div>

          {/* VAGON 3 */}
          <div className="text-panel" style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "10vw", flexShrink: 0 }}>
            <div className="migration-block" style={{ opacity: 0, transform: "translateY(30px)", maxWidth: "500px" }}>
              <h3 className="heading-lg" style={{ color: "var(--steppe-emerald-light)" }}>
                {t("migration.goc.subtitle")}
              </h3>
              <h2 className="heading-xl">{t("migration.goc.title")}</h2>
              <p>{t("migration.goc.text")}</p>
              <Link href="/sagas/goc" passHref>
                <button type="button" className="saga-link" style={{ marginTop: "20px", pointerEvents: "auto" }}>
                  <span>{t("sagas.explore")}</span>
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

export default MigrationSection;