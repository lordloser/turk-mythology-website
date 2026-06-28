"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "../../../../i18n"; // ensure i18next is initialized on client

export default function ClientLoreView({ data, category, slug }) {
  const containerRef = useRef(null);
  const visualRef = useRef(null);
  const contentRef = useRef(null);
  
  // Optional: We can still use the i18next for 'common' strings or buttons
  const { t } = useTranslation();

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Animate background image entering
    tl.fromTo(visualRef.current, 
      { scale: 1.1, opacity: 0, filter: 'blur(10px)' }, 
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }
    );

    // Fade in text content from bottom
    tl.fromTo(contentRef.current.children, 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
      "-=1.0"
    );
  }, { scope: containerRef });

  return (
    <div className="lore-page-container" ref={containerRef}>
      {/* Background Visual Element */}
      <div className="lore-page-visual-wrap" ref={visualRef}>
        <img src={`/images/${data.img}.png`} alt={data.name} className="lore-page-visual" />
        <div className="lore-page-vignette" />
      </div>

      <div className="lore-page-content-wrap">
        <Link href="/" className="back-btn">
           ⟵ {t('common.backToHome', 'Ana Sayfaya Dön')}
        </Link>
        <div className="lore-page-content" ref={contentRef}>
          <span className="lore-tag">{data.typeId}</span>
          <h1 className="lore-title">{data.name}</h1>
          
          <div className="lore-divider" />
          
          <p className="lore-brief">{data.desc}</p>
          
          { (data.lore1 || data.lore2) && (
             <div className="lore-deep">
                <h2>{data.loreTitle || t('common.loreTitle', 'Kadim Hikaye')}</h2>
                {data.lore1 && <p>{data.lore1}</p>}
                {data.lore2 && <p>{data.lore2}</p>}
             </div>
          )}
          
          {data.connection && (
             <div className="lore-connection">
               <span><strong>{t('common.connection', 'Bağlantı')}:</strong> {data.connection}</span>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
