"use client";

import { useRef, useState, forwardRef, useMemo, useCallback, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import debounce from "lodash.debounce";
import Link from "next/link";
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
  
  // Scroller tracking (per tab so "Tümü" sonu diğer sekmeleri etkilemez)
  const currentScroll = useRef(0);
  const scrollOffsetByTabRef = useRef({ all: 0, sky: 0, earth: 0, underworld: 0 });
  const activeTabRef = useRef(activeTab);
  // "Latest ref" senkronizasyonu; ref'ler render çıktısını etkilemez,
  // react-hooks/refs burada false positive verir.
  // eslint-disable-next-line react-hooks/refs
  activeTabRef.current = activeTab;
  const suppressCardClickRef = useRef(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const selectTab = useCallback((tab) => {
    if (tab === activeTabRef.current) return;
    scrollOffsetByTabRef.current[activeTabRef.current] = currentScroll.current;
    setActiveTab(tab);
  }, []);

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

  // Debounced search handler for performance.
  // Bu callback yalnızca kullanıcı girişiyle (debounce sonrası) çalışır,
  // render anında değil; react-hooks/refs burada false positive verir.
  const handleSearch = useMemo(
    () =>
      // eslint-disable-next-line react-hooks/refs
      debounce((query) => {
        setSearchQuery(query);
        const tab = activeTabRef.current;
        scrollOffsetByTabRef.current[tab] = 0;
        if (trackRef.current) {
          currentScroll.current = 0;
          gsap.to(trackRef.current, { x: 0, duration: 0.5 });
          setIsAtStart(true);
          setTimeout(checkScrollBounds, 600);
        }
      }, 300),
    []
  );

  const getBestiaryGapPx = () => {
    if (typeof window === "undefined") return 30;
    return window.innerWidth <= 768 ? 16 : 30;
  };

  const cardsPerScrollGroup = () => {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    if (w <= 640) return 1;
    if (w <= 1024) return 2;
    return 3;
  };

  const checkScrollBounds = () => {
     if(!trackRef.current || !wrapperRef.current) return;
     const trackWidth = trackRef.current.scrollWidth;
     const wrapperWidth = wrapperRef.current.offsetWidth;
     const maxScroll = Math.max(0, trackWidth - wrapperWidth);
     
     setIsAtStart(currentScroll.current <= 0);
     setIsAtEnd(currentScroll.current >= maxScroll - 5);
  };

  useEffect(() => {
    const onResize = debounce(() => {
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      if (!track || !wrapper) return;
      const maxScroll = Math.max(0, track.scrollWidth - wrapper.offsetWidth);
      if (currentScroll.current > maxScroll) {
        currentScroll.current = maxScroll;
        gsap.set(track, { x: -maxScroll });
      }
      scrollOffsetByTabRef.current[activeTabRef.current] = currentScroll.current;
      checkScrollBounds();
    }, 120);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

  useLayoutEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    let saved = scrollOffsetByTabRef.current[activeTab] ?? 0;
    const maxScroll = Math.max(0, track.scrollWidth - wrapper.offsetWidth);
    saved = Math.min(Math.max(0, saved), maxScroll);
    currentScroll.current = saved;
    scrollOffsetByTabRef.current[activeTab] = saved;
    gsap.set(track, { x: -saved });
    setIsAtStart(saved <= 0);
    setIsAtEnd(saved >= maxScroll - 5);
  }, [activeTab]);

  // Update cards when filter changes
  useEffect(() => {
    gsap.fromTo(".creature-card", 
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "back.out(1.5)" }
    );
    checkScrollBounds();
  }, [filteredCreatures.length]);

  // Ok butonlarına tıklandığında çalışacak akıllı kaydırma fonksiyonu.
  // contextSafe yalnızca event-handler üretir; ref'ler render'da değil,
  // tıklama anında okunur. react-hooks/refs burada false positive verir.
  // eslint-disable-next-line react-hooks/refs
  const scrollTrack = contextSafe((direction) => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    const cards = track.children;
    if(cards.length === 0) return;

    const gap = getBestiaryGapPx();
    const cardWidth = cards[0].offsetWidth + gap;
    const groupWidth = cardWidth * cardsPerScrollGroup();

    // Gidilebilecek maksimum mesafe
    const maxScroll = Math.max(0, track.scrollWidth - wrapper.offsetWidth);

    let newScroll = currentScroll.current + (direction * groupWidth);

    // Sınırları aşmayı engelle
    newScroll = Math.max(0, Math.min(newScroll, maxScroll));
    currentScroll.current = newScroll;
    scrollOffsetByTabRef.current[activeTabRef.current] = newScroll;

    gsap.to(track, {
      x: -newScroll,
      duration: 0.9,
      ease: "power3.inOut"
    });

    setIsAtStart(newScroll <= 0);
    setIsAtEnd(newScroll >= maxScroll - 5);
  });

  const scrollTrackRef = useRef(scrollTrack);
  // "Latest ref" senkronizasyonu; ref'ler render çıktısını etkilemez,
  // react-hooks/refs burada false positive verir.
  // eslint-disable-next-line react-hooks/refs
  scrollTrackRef.current = scrollTrack;

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const SWIPE_MIN_DX = 50;
    const LOCK_HORIZ = 14;
    let startX = 0;
    let startY = 0;
    let tracking = false;
    let lockedHorizontal = false;

    const isMobileCarousel = () =>
      typeof window !== "undefined" && window.matchMedia("(max-width: 1024px)").matches;

    const onTouchStart = (e) => {
      if (!isMobileCarousel() || e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
      lockedHorizontal = false;
      suppressCardClickRef.current = false;
    };

    const onTouchMove = (e) => {
      if (!tracking || !isMobileCarousel() || e.touches.length !== 1) return;
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const dx = x - startX;
      const dy = y - startY;
      if (!lockedHorizontal && (Math.abs(dx) > LOCK_HORIZ || Math.abs(dy) > LOCK_HORIZ)) {
        lockedHorizontal = Math.abs(dx) > Math.abs(dy);
      }
      if (lockedHorizontal) {
        e.preventDefault();
      }
    };

    const onTouchEnd = (e) => {
      if (!tracking || !isMobileCarousel()) {
        tracking = false;
        return;
      }
      tracking = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      lockedHorizontal = false;
      if (Math.abs(dx) < SWIPE_MIN_DX || Math.abs(dx) < Math.abs(dy)) return;
      suppressCardClickRef.current = true;
      if (dx < 0) scrollTrackRef.current(1);
      else scrollTrackRef.current(-1);
      window.setTimeout(() => {
        suppressCardClickRef.current = false;
      }, 320);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

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
            <button type="button" className={`pantheon-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => selectTab('all')}>Tümü</button>
            <button type="button" className={`pantheon-tab ${activeTab === 'sky' ? 'active' : ''}`} onClick={() => selectTab('sky')}>Gök Varlıkları</button>
            <button type="button" className={`pantheon-tab ${activeTab === 'earth' ? 'active' : ''}`} onClick={() => selectTab('earth')}>Doğa İyeleri</button>
            <button type="button" className={`pantheon-tab ${activeTab === 'underworld' ? 'active' : ''}`} onClick={() => selectTab('underworld')}>Karanlık Ruhlar</button>
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

      {/* Kaydırma Çerçevesi */}
      <div
        className="bestiary-wrapper"
        ref={wrapperRef}
      >
        <img
          src="/images/bukre-dragon.webp"
          className="bukre-bg-anim"
          ref={bukreBgRef}
          alt="Bükre Dragon Background"
          loading="lazy"
          decoding="async"
        />

        <button
          type="button"
          aria-label={t("common.prev", "Önceki")}
          onClick={() => scrollTrack(-1)}
          disabled={isAtStart || filteredCreatures.length === 0}
          className={`bestiary-nav-btn prev ${isAtStart || filteredCreatures.length === 0 ? "disabled" : ""}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>

        {/* KARTLARIN OLDUĞU TREN */}
        <div className="bestiary-track" ref={trackRef} style={{ position: "relative", zIndex: 1, width: "max-content" }}>
          {filteredCreatures.length > 0 ? (
            filteredCreatures.map((c) => (
              <article
                className="creature-card"
                key={c.id}
                onClick={() => {
                  if (suppressCardClickRef.current) return;
                  openModal(c);
                }}
              >
                <div className="creature-card-inner">
                  <img
                    className="creature-image"
                    src={`/images/${c.img}.webp`}
                    alt={safeTranslate(c.id, "name", t)}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="creature-info">
                    <h3 className="creature-name">{safeTranslate(c.id, "name", t)}</h3>
                    <span className="creature-type">{safeTranslate(c.id, "type", t)}</span>
                    <p className="creature-desc">{safeTranslate(c.id, "desc", t)}</p>
                  </div>
                  <div className="lore-overlay">
                    <h4>{t("common.clickToRead", "Kadim Kitabı Aç")}</h4>
                    <Link
                       href={`/ansiklopedi/yaratiklar/${c.id}`}
                       className="read-more-btn"
                       onClick={(e) => {
                         // For normal left clicks, open modal for better UX.
                         // Middle clicks or "Open in new tab" will use the actual href.
                         if(e.button === 0 && !e.ctrlKey && !e.metaKey) {
                            e.preventDefault();
                            openModal(c);
                         }
                       }}
                    >
                      Sırları Keşfet ⟶
                    </Link>
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