"use client";

import { useState } from "react";

export default function RitualSection({ t }) {
  const [activePortal, setActivePortal] = useState(null);

  const togglePortal = (key) => {
    setActivePortal((prev) => (prev === key ? null : key));
  };

  return (
    <section id="ritual" className="section texture-mist">
      <div className="section-inner" style={{ textAlign: "center", position: "relative" }}>
        <div className="section-header reveal">
          <span className="section-tag">{t("ritual.tag")}</span>
          <h2 className="heading-xl">
            {t("ritual.heading")} <span className="gold">{t("ritual.headingGold")}</span>
          </h2>
          <p className="body-lg" style={{ maxWidth: "600px", margin: "16px auto 0" }}>
            {t("ritual.desc")}
          </p>
        </div>

        <div
          className="drum-container mt-12"
          style={{
            position: "relative",
            margin: "40px auto 0",
            width: "400px",
            height: "400px",
            maxWidth: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/images/shamanic-drum.png"
            alt="Shamanic Drum"
            className="shamanic-drum pulse-hover"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "50%",
              boxShadow: "0 0 40px rgba(212,168,67,0.15)",
            }}
          />

          <div className="drum-symbols" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {[
              { key: "sun", symbol: "☼", className: "symbol-sun" },
              { key: "moon", symbol: "☽", className: "symbol-moon" },
              { key: "eagle", symbol: "🦅", className: "symbol-eagle" },
              { key: "forest", symbol: "🌳", className: "symbol-tree" },
              { key: "wolf", symbol: "🐺", className: "symbol-wolf" },
              { key: "water", symbol: "💧", className: "symbol-water" },
            ].map((s) => (
              <div
                key={s.key}
                className={`drum-symbol ${s.className}`}
                onClick={() => togglePortal(s.key)}
                style={{
                  pointerEvents: "auto",
                  position: "absolute",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                }}
                title={t(`ritual.symbols.${s.key}`)}
              >
                {s.symbol}
              </div>
            ))}
          </div>
        </div>

        <div
          className="ritual-lore-cards"
          style={{
            display: "flex",
            minHeight: "220px",
            justifyContent: "center",
            marginTop: "40px",
            paddingBottom: "40px",
          }}
        >
          {activePortal && (
            <div
              className="lore-card border-spring"
              style={{
                padding: "24px",
                background: "rgba(10,15,30,0.85)",
                borderRadius: "12px",
                maxWidth: "500px",
                border: "1px solid var(--celestial-gold-bright)",
                textAlign: "center",
                animation: "fadeIn 0.5s ease",
              }}
            >
              <h3
                className="heading-lg"
                style={{
                  color: "var(--celestial-gold-bright)",
                  fontSize: "1.6rem",
                  marginBottom: "12px",
                }}
              >
                {t(`ritual.portals.${activePortal}.title`)}
              </h3>
              <p style={{ fontSize: "1.05rem", lineHeight: "1.6", color: "var(--text-primary)" }}>
                {t(`ritual.portals.${activePortal}.desc`)}
              </p>
              <p
                style={{
                  color: "var(--steppe-emerald-light)",
                  fontSize: "0.95rem",
                  marginTop: 16,
                  fontStyle: "italic",
                }}
              >
                {t(`ritual.portals.${activePortal}.offering`)}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
