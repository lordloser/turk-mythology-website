"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CodexModal({ isOpen, onClose, data, t }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(modalRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(contentRef.current, 
        { scale: 0.9, y: 30, opacity: 0 }, 
        { scale: 1, y: 0, opacity: 1, duration: 0.6, delay: 0.1, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen || !data) return null;

  return (
    <div className="codex-modal-overlay" ref={modalRef} onClick={onClose}>
      <div 
        className="codex-modal-content" 
        ref={contentRef} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-modal" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        
        <div className="modal-header">
          <div className="modal-header-visual">
            <img src={`/images/${data.img}.png`} alt={t(`${data.type === 'creature' ? 'bestiary' : 'pantheon'}.${data.id}.name`)} />
          </div>
          <div className="modal-header-info">
            <span className="modal-tag">{t(`${data.type === 'creature' ? 'bestiary' : 'pantheon'}.${data.id}.type`) || t(`${data.type === 'creature' ? 'bestiary' : 'pantheon'}.${data.id}.role`)}</span>
            <h2 className="modal-title">{t(`${data.type === 'creature' ? 'bestiary' : 'pantheon'}.${data.id}.name`)}</h2>
            <p className="modal-brief">{t(`${data.type === 'creature' ? 'bestiary' : 'pantheon'}.${data.id}.desc`)}</p>
          </div>
        </div>

        <div className="modal-body">
          <div className="lore-section">
            <h3>{t(`${data.type === 'creature' ? 'bestiary' : 'pantheon'}.${data.id}.loreTitle`) || t('common.loreTitle', 'Kadim Hikaye')}</h3>
            <p>{t(`${data.type === 'creature' ? 'bestiary' : 'pantheon'}.${data.id}.lore1`)}</p>
            <p>{t(`${data.type === 'creature' ? 'bestiary' : 'pantheon'}.${data.id}.lore2`)}</p>
          </div>
          
          <div className="modal-footer-info">
            <span className="connection-info">
              <strong>{t('common.connection', 'Bağlantı')}:</strong> {t(`${data.type === 'creature' ? 'bestiary' : 'pantheon'}.${data.id}.connection`)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
