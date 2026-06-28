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

  const category = data.type === 'creature' ? 'bestiary' : 'pantheon';
  
  // Safe translate function to avoid rendering raw keys
  const safeT = (key) => {
    const res = t(key);
    // return null if result falls back to key
    return res && typeof res === 'string' && res !== key ? res : null;
  };

  const name = safeT(`${category}.${data.id}.name`);
  const typeOrRole = safeT(`${category}.${data.id}.type`) || safeT(`${category}.${data.id}.role`);
  const desc = safeT(`${category}.${data.id}.desc`);
  const loreTitle = safeT(`${category}.${data.id}.loreTitle`) || t('common.loreTitle', 'Kadim Hikaye');
  const lore1 = safeT(`${category}.${data.id}.lore1`);
  const lore2 = safeT(`${category}.${data.id}.lore2`);
  const connection = safeT(`${category}.${data.id}.connection`);

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
            <img src={`/images/${data.img}.png`} alt={name} />
          </div>
          <div className="modal-header-info">
            {typeOrRole && <span className="modal-tag">{typeOrRole}</span>}
            <h2 className="modal-title">{name}</h2>
            <p className="modal-brief">{desc}</p>
          </div>
        </div>

        <div className="modal-body">
          {(lore1 || lore2) && (
            <div className="lore-section">
              <h3>{loreTitle}</h3>
              {lore1 && <p>{lore1}</p>}
              {lore2 && <p>{lore2}</p>}
            </div>
          )}
          
          {connection && (
            <div className="modal-footer-info">
              <span className="connection-info">
                <strong>{t('common.connection', 'Bağlantı')}:</strong> {connection}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
