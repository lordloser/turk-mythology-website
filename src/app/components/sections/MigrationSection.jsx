"use client";

import { useRef, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PAW_SVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
  <path d="M12 2C10.5 2 9 3.5 9 5.5C9 7.5 10.5 9 12 9C13.5 9 15 7.5 15 5.5C15 3.5 13.5 2 12 2Z" fill="var(--celestial-gold-bright)"/>
  <path d="M6 6C4.5 6 3 7.5 3 9.5C3 11.5 4.5 13 6 13C7.5 13 9 11.5 9 9.5C9 7.5 7.5 6 6 6Z" fill="var(--celestial-gold-bright)"/>
  <path d="M18 6C16.5 6 15 7.5 15 9.5C15 11.5 16.5 13 18 13C19.5 13 21 11.5 21 9.5C21 7.5 19.5 6 18 6Z" fill="var(--celestial-gold-bright)"/>
  <path d="M12 11C8.5 11 5 13.5 5 17.5C5 21.5 8.5 22 12 22C15.5 22 19 21.5 19 17.5C19 13.5 15.5 11 12 11Z" fill="var(--celestial-gold-bright)"/>
</svg>`;

const MigrationSection = forwardRef(function MigrationSection({ t }, ref) {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const bgRef = useRef(null);
  const pawRefs = useRef([]);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const bg = bgRef.current;
    if (!wrapper || !track || !bg) return;

    // Kaydırma mesafelerini dinamik olarak hesaplıyoruz
    const trackScrollWidth = track.scrollWidth - window.innerWidth;
    const bgScrollWidth = bg.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: () => `+=${trackScrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        // İŞTE EKSİK OLAN SİHİR BURASI:
        snap: {
          snapTo: 1 / 2, // 3 vagonumuz (resmimiz) var, yani 2 aralık var. (1 / 2 = 0.5 yani %0, %50, %100 noktalarına yapışır)
          duration: { min: 0.3, max: 0.8 }, // Hizalama animasyonunun süresi
          delay: 0.1, // Kullanıcı scroll'u bıraktıktan 0.1 saniye sonra mıknatıs devreye girer
          ease: "power2.inOut" // Kaymanın yağ gibi yumuşak olması için
        }
      },
    });

    // 1:1 Eşleşme Sırrı: Hem yazıyı hem arka planı aynı anda, tam olarak kendi sonlarına kadar kaydırıyoruz!
    tl.to(track, { x: -trackScrollWidth, ease: "none" }, 0);
    tl.to(bg, { x: -bgScrollWidth, ease: "none" }, 0);

    // Patiler için animasyon
    pawRefs.current.forEach((paw) => {
      if (!paw) return;
      gsap.to(paw, {
        opacity: 0.8,
        scale: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: paw,
          containerAnimation: tl,
          start: "left center",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Metin bloklarının ekrana girince belirmesi (Fade In)
    const blocks = containerRef.current?.querySelectorAll(".migration-block");
    blocks?.forEach((block) => {
      gsap.to(block, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: block,
          containerAnimation: tl,
          start: "left 70%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section id="migration" ref={(el) => {
      containerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    }}>
      <div className="migration-wrapper" ref={wrapperRef} style={{ position: "relative", height: "100vh", overflow: "hidden" }}>

        {/* ARKA PLAN TRENI */}
        <div className="migration-layer" ref={bgRef} style={{ display: "flex", position: "absolute", top: 0, left: 0, height: "100vh" }}>
          {/*object-fit: cover özelliği eklendi*/}
          <div className="migration-bg-panel migration-bg-1" style={{ width: "100vw", height: "100vh", flexShrink: 0, backgroundSize: "cover", backgroundPosition: "center", objectFit: "cover" }} />
          <div className="migration-bg-panel migration-bg-2" style={{ width: "100vw", height: "100vh", flexShrink: 0, backgroundSize: "cover", backgroundPosition: "center", objectFit: "cover" }} />
          <div className="migration-bg-panel migration-bg-3" style={{ width: "100vw", height: "100vh", flexShrink: 0, backgroundSize: "cover", backgroundPosition: "center", objectFit: "cover" }} />
        </div>
        <div className="wolf-path">
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={i}
              ref={(el) => { pawRefs.current[i] = el; }}
              className="paw-print"
              style={{
                position: "absolute",
                left: `${10 + i * 18}vw`,
                bottom: i % 2 === 0 ? "5%" : "15%",
                opacity: 0,
                transform: "scale(0.5)",
                zIndex: 5
              }}
              dangerouslySetInnerHTML={{ __html: PAW_SVG }}
            />
          ))}
        </div>

        {/* METİN TRENİ */}
        <div className="migration-content" ref={trackRef} style={{ display: "flex", height: "100vh", position: "relative", zIndex: 10 }}>

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
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

export default MigrationSection;