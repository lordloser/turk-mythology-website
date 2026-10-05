"use client";

import { useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import "@/i18n";
import SubPageTopBar from "@/app/components/SubPageTopBar";
import { REALMS, entitiesInRealm, entityHref } from "@/data/entities";

/* ── SVG geometrisi (viewBox 0 0 400 720) ───────────────── */
const BANDS = {
  sky: { y: 0, h: 262 },
  middle: { y: 262, h: 178 },
  under: { y: 440, h: 280 },
};

// Gök: 17 kat, aşağıdan yukarıya daralan yaylar
const SKY_ARCS = Array.from({ length: 17 }, (_, i) => {
  const y = 250 - i * 13.5;
  const half = 185 - i * 7;
  return `M ${200 - half} ${y} Q 200 ${y - 22} ${200 + half} ${y}`;
});

// Yeraltı: 9 kat, aşağı doğru daralan huni
const UNDER_ARCS = Array.from({ length: 9 }, (_, i) => {
  const y = 456 + i * 28;
  const half = 180 - i * 17;
  return `M ${200 - half} ${y} Q 200 ${y + 20} ${200 + half} ${y}`;
});

const STARS = [
  [40, 40], [90, 70], [330, 50], [360, 110], [60, 140], [300, 160], [130, 30], [250, 80], [20, 210], [380, 200],
];

/* Seçili katman URL hash'inde tutulur (#sky / #middle / #under); paylaşılabilir bağlantı olur */
function subscribeHash(callback) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}
const getHash = () => window.location.hash.replace("#", "");
const getServerHash = () => "";

export default function CosmosView() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const panelRef = useRef(null);
  const hash = useSyncExternalStore(subscribeHash, getHash, getServerHash);
  const active = REALMS.includes(hash) ? hash : "sky";

  useGSAP(() => {
    gsap.from(".page-header > *", { y: -30, opacity: 0, duration: 1.1, stagger: 0.15, ease: "power3.out" });
    gsap.from(".cosmos-band", { opacity: 0, duration: 1.2, stagger: 0.2, ease: "power2.out" });
    gsap.from(".cosmos-tree", { scaleY: 0, transformOrigin: "50% 100%", duration: 1.6, ease: "power3.out", delay: 0.3 });
  }, { scope: containerRef });

  /* Katman değişince paneli yeniden canlandır */
  useGSAP(() => {
    if (!panelRef.current) return;
    gsap.fromTo(
      panelRef.current.children,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out" }
    );
  }, { dependencies: [active], scope: containerRef });

  function select(realm) {
    history.replaceState(null, "", `#${realm}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  function onKey(e, realm) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(realm);
    }
  }

  const facts = t(`cosmos.layers.${active}.facts`, { returnObjects: true });
  const beings = entitiesInRealm(active);

  return (
    <>
      <SubPageTopBar />
      <main ref={containerRef} className="content-page cosmos-page">
        <header className="page-header">
          <span className="page-tag">{t("cosmos.tag")}</span>
          <h1 className="page-title">
            {t("cosmos.title")} <span className="text-gold">{t("cosmos.titleGold")}</span>
          </h1>
          <p className="page-desc">{t("cosmos.desc")}</p>
        </header>

        <div className="cosmos-layout">
          <div className="cosmos-map-wrap">
            <svg className="cosmos-map" viewBox="0 0 400 720" role="group" aria-label={t("cosmos.hint")}>
              <defs>
                <linearGradient id="g-sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0b1630" />
                  <stop offset="100%" stopColor="#1B3A6B" />
                </linearGradient>
                <linearGradient id="g-middle" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#24452f" />
                  <stop offset="100%" stopColor="#3a2c22" />
                </linearGradient>
                <linearGradient id="g-under" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2a0606" />
                  <stop offset="100%" stopColor="#050505" />
                </linearGradient>
                <radialGradient id="g-star">
                  <stop offset="0%" stopColor="#F5D16B" />
                  <stop offset="100%" stopColor="rgba(245,209,107,0)" />
                </radialGradient>
              </defs>

              {REALMS.map((realm) => (
                <g
                  key={realm}
                  className={`cosmos-band band-${realm}${active === realm ? " active" : ""}`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={active === realm}
                  aria-label={t(`cosmos.layers.${realm}.title`)}
                  onClick={() => select(realm)}
                  onKeyDown={(e) => onKey(e, realm)}
                >
                  <rect x="0" y={BANDS[realm].y} width="400" height={BANDS[realm].h} fill={`url(#g-${realm})`} />
                  {realm === "sky" && (
                    <>
                      {SKY_ARCS.map((d, i) => (
                        <path key={i} d={d} className="cosmos-arc sky-arc" />
                      ))}
                      {STARS.map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r="1.6" className="cosmos-star" />
                      ))}
                    </>
                  )}
                  {realm === "middle" && (
                    <>
                      <path d="M0 330 L60 290 L95 315 L150 270 L190 305 L240 280 L290 310 L340 285 L400 320 L400 440 L0 440 Z" className="cosmos-mountains" />
                      <path d="M20 420 C 90 395, 140 435, 200 410 S 320 385, 390 415" className="cosmos-river" />
                    </>
                  )}
                  {realm === "under" &&
                    UNDER_ARCS.map((d, i) => <path key={i} d={d} className="cosmos-arc under-arc" />)}
                  <text x="16" y={BANDS[realm].y + 30} className="cosmos-label">
                    {t(`cosmos.layers.${realm}.title`)}
                  </text>
                </g>
              ))}

              {/* Bayterek: kökler yeraltında, dallar gökte */}
              <g className="cosmos-tree" pointerEvents="none">
                <path d="M200 690 L200 60" className="tree-trunk" />
                <path d="M200 140 C 170 120, 140 110, 110 85 M200 140 C 230 120, 260 110, 290 85 M200 100 C 180 85, 165 70, 150 50 M200 100 C 220 85, 235 70, 250 50 M200 190 C 160 175, 120 170, 85 150 M200 190 C 240 175, 280 170, 315 150" className="tree-branch" />
                <path d="M200 520 C 175 545, 150 560, 120 590 M200 520 C 225 545, 250 560, 280 590 M200 600 C 185 625, 170 640, 150 670 M200 600 C 215 625, 230 640, 250 670" className="tree-root" />
                <circle cx="200" cy="34" r="18" fill="url(#g-star)" />
                <circle cx="200" cy="34" r="4" className="cosmos-polaris" />
                <text x="212" y="30" className="cosmos-small">{t("cosmos.polaris")}</text>
                <text x="208" y="360" className="cosmos-small">{t("cosmos.tree")}</text>
              </g>
            </svg>
            <p className="cosmos-hint">{t("cosmos.hint")}</p>
          </div>

          <aside className={`cosmos-panel realm-${active}`} ref={panelRef} aria-live="polite">
            <span className="page-tag">{t(`cosmos.layers.${active}.sub`)}</span>
            <h2 className="cosmos-panel-title">{t(`cosmos.layers.${active}.title`)}</h2>
            <p className="cosmos-panel-desc">{t(`cosmos.layers.${active}.desc`)}</p>
            {Array.isArray(facts) && (
              <ul className="cosmos-facts">
                {facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            )}
            <h3 className="cosmos-beings-title">{t("cosmos.beings")}</h3>
            <div className="entity-grid compact">
              {beings.map((e) => (
                <Link key={e.slug} href={entityHref(e.slug)} className={`entity-card realm-${e.realm}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/${e.img}.webp`} alt="" loading="lazy" decoding="async" />
                  <span className="entity-card-name">{t(e.name)}</span>
                  <span className="entity-card-type">{t(e.type)}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
