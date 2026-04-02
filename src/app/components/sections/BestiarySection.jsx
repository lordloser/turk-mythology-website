"use client";

import { useRef, useState, forwardRef, useMemo, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import debounce from "lodash.debounce";
import { CREATURES } from "../../../data/mythology";
import CodexModal from "../CodexModal";

gsap.registerPlugin(ScrollTrigger);

// Helper to get translated values safely
const safeTranslate = (id, field, t) => {
  const result = t(`bestiary.${id}.${field}`);
  return result && !result.includes(`bestiary.${id}`) ? result : "";
};

const BestiarySection = forwardRef(function BestiarySection({ t }, ref) {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const bukreBgRef = useRef(null);

  // States
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCreature, setSelectedCreature] = useState(null);
  
  // Scroller tracking
  const currentScroll = useRef(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const { contextSafe } = useGSAP({ scope: containerRef });

  // Filtering Logic
  const filteredCreatures = useMemo(() => {
    return CREATURES.filter(c => {
      const matchesTab = activeTab === "all" || c.realm === activeTab;
      
      const name = safeTranslate(c.id, "name", t).toLowerCase();
      const type = safeTranslate(c.id, "type", t).toLowerCase();
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || name.includes(q) || type.includes(q);
      
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, t]);

  // Debounced search handler for performance
  const handleSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      // Reset scroll position when filtering
      if (trackRef.current) {
         currentScroll.current = 0;
         gsap.to(trackRef.current, { x: 0, duration: 0.5 });
         setIsAtStart(true);
         setTimeout(checkScrollBounds, 600);
      }
    }, 300),
    []
  );

  const checkScrollBounds = () => {
     if(!trackRef.current || !wrapperRef.current) return;
     const trackWidth = trackRef.current.scrollWidth;
     const wrapperWidth = wrapperRef.current.offsetWidth;
     const maxScroll = Math.max(0, trackWidth - wrapperWidth);
     
     setIsAtStart(currentScroll.current <= 0);
     setIsAtEnd(currentScroll.current >= maxScroll - 5);
  };

  useGSAP(() => {
    // Background Animation
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

    // Reveal Elements
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

  // Update cards when filter changes
  useEffect(() => {
    gsap.fromTo(".creature-card", 
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "back.out(1.5)" }
    );
    checkScrollBounds();
  }, [filteredCreatures.length]);

  const scrollTrack = contextSafe((direction) => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    const cards = track.children;
    if(cards.length === 0) return;

    // Bir kartın genişliği (380px) + Gap (30px CSS'den geliyor)
    const cardWidth = cards[0].offsetWidth + 30;

    // 3 kart birden atla (sayfalı kaydırma)
    const groupWidth = cardWidth * 3;

    // Gidilebilecek maksimum mesafe
    const maxScroll = Math.max(0, track.scrollWidth - wrapper.offsetWidth);

    let newScroll = currentScroll.current + (direction * groupWidth);

    // Sınırları aşmayı engelle
    newScroll = Math.max(0, Math.min(newScroll, maxScroll));
    currentScroll.current = newScroll;

    gsap.to(track, {
      x: -newScroll,
      duration: 0.9,
      ease: "power3.inOut"
    });

    setIsAtStart(newScroll <= 0);
    setIsAtEnd(newScroll >= maxScroll - 5);
  });

  const openModal = (creature) => {
    setSelectedCreature({ ...creature, type: 'creature' });
  };

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

        {/* Filters and Search - NEW ADDITION */}
        <div className="bestiary-controls reveal">
          <div className="pantheon-tabs bestiary-tabs">
            <button className={`pantheon-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>Tümü</button>
            <button className={`pantheon-tab ${activeTab === 'sky' ? 'active' : ''}`} onClick={() => setActiveTab('sky')}>Gök Varlıkları</button>
            <button className={`pantheon-tab ${activeTab === 'earth' ? 'active' : ''}`} onClick={() => setActiveTab('earth')}>Doğa İyeleri</button>
            <button className={`pantheon-tab ${activeTab === 'underworld' ? 'active' : ''}`} onClick={() => setActiveTab('underworld')}>Karanlık Ruhlar</button>
          </div>
          <div className="search-wrapper">
             <input 
               type="text" 
               className="myth-search-input" 
               placeholder="Varlık Ara..." 
               onChange={(e) => handleSearch(e.target.value)}
             />
             <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>
      </div>

      <div className="bestiary-wrapper" ref={wrapperRef}>
        <img src="/images/bukre-dragon.png" className="bukre-bg-anim" ref={bukreBgRef} alt="Background" />

        <button
          type="button"
          aria-label={t("common.prev", "Önceki")}
          onClick={() => scrollTrack(-1)}
          disabled={isAtStart || filteredCreatures.length === 0}
          className={`bestiary-nav-btn prev ${isAtStart || filteredCreatures.length === 0 ? "disabled" : ""}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>

        <div className="bestiary-track" ref={trackRef} style={{ position: "relative", zIndex: 1, width: "max-content" }}>
          {filteredCreatures.length > 0 ? (
            filteredCreatures.map((c) => (
              <article className="creature-card" key={c.id} onClick={() => openModal(c)}>
                <div className="creature-card-inner">
                  <img
                    className="creature-image"
                    src={`/images/${c.img}.png`}
                    alt={safeTranslate(c.id, "name", t)}
                  />
                  <div className="creature-info">
                    <h3 className="creature-name">{safeTranslate(c.id, "name", t)}</h3>
                    <span className="creature-type">{safeTranslate(c.id, "type", t)}</span>
                    <p className="creature-desc">{safeTranslate(c.id, "desc", t)}</p>
                  </div>
                  <div className="lore-overlay">
                    <h4>{t("common.clickToRead", "Kadim Kitabı Aç")}</h4>
                    <span className="read-more-btn">Sırları Keşfet ⟶</span>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="no-results-msg">
               <h3 className="heading-lg">Varlık Bulunamadı</h3>
               <p>Kadim ormanların ve diyarların derinliklerinde böyle bir ruh bilinmiyor.</p>
            </div>
          )}
        </div>

        <button
          type="button"
          aria-label={t("common.next", "Sonraki")}
          onClick={() => scrollTrack(1)}
          disabled={isAtEnd || filteredCreatures.length === 0}
          className={`bestiary-nav-btn next ${isAtEnd || filteredCreatures.length === 0 ? "disabled" : ""}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>

      <CodexModal 
        isOpen={!!selectedCreature} 
        onClose={() => setSelectedCreature(null)} 
        data={selectedCreature} 
        t={t} 
      />
    </section>
  );
});

export default BestiarySection;