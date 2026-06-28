"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const NODES = [
  {
    id: "tengri",
    x: 500,
    y: 58,
    r: 22,
    fill: "var(--celestial-gold-bright)",
    hash: "#pantheon",
    labelKey: "nexusLabels.tengri",
  },
  {
    id: "kayra",
    x: 500,
    y: 158,
    r: 28,
    fill: "var(--celestial-gold)",
    hash: "#pantheon",
    labelKey: "nexusLabels.kayra",
  },
  {
    id: "ulgen",
    x: 215,
    y: 298,
    r: 20,
    fill: "var(--celestial-azure-light)",
    hash: "#pantheon",
    labelKey: "nexusLabels.ulgen",
  },
  {
    id: "erlik",
    x: 500,
    y: 318,
    r: 20,
    fill: "var(--abyss-crimson)",
    hash: "#shadow-realm",
    labelKey: "nexusLabels.erlik",
  },
  {
    id: "mergen",
    x: 785,
    y: 268,
    r: 18,
    fill: "#5DADE2",
    hash: "#pantheon",
    labelKey: "nexusLabels.mergen",
  },
  {
    id: "umay",
    x: 785,
    y: 388,
    r: 18,
    fill: "#DDA0DD",
    hash: "#umay",
    labelKey: "nexusLabels.umay",
  },
  {
    id: "middleWorld",
    x: 500,
    y: 548,
    r: 24,
    fill: "var(--steppe-emerald-light)",
    hash: "#world-tree",
    labelKey: "footer.influenceMap.middleWorld",
  },
];

const LINKS = [
  { from: "tengri", to: "kayra", kind: "gold", dashed: false },
  { from: "kayra", to: "ulgen", kind: "azure", dashed: false },
  { from: "kayra", to: "erlik", kind: "crimson", dashed: true },
  { from: "kayra", to: "mergen", kind: "wisdom", dashed: false },
  { from: "ulgen", to: "umay", kind: "orchid", dashed: false },
  { from: "ulgen", to: "middleWorld", kind: "steppe", dashed: false },
  { from: "umay", to: "middleWorld", kind: "orchid", dashed: true },
  { from: "erlik", to: "middleWorld", kind: "crimson", dashed: true },
  { from: "mergen", to: "middleWorld", kind: "wisdom", dashed: true },
];

function getNode(id) {
  return NODES.find((n) => n.id === id);
}

function scrollToHash(hash, e) {
  if (!hash) return;
  if (e?.metaKey || e?.ctrlKey) return;
  e?.preventDefault();
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function FooterSection({ t }) {
  const [hoveredId, setHoveredId] = useState(null);
  const rootRef = useRef(null);

  const isLinkActive = useCallback(
    (link) => {
      if (!hoveredId) return false;
      return link.from === hoveredId || link.to === hoveredId;
    },
    [hoveredId]
  );

  const isNodeConnected = useCallback(
    (nodeId) => {
      if (!hoveredId) return true;
      if (nodeId === hoveredId) return true;
      return LINKS.some(
        (l) =>
          (l.from === hoveredId && l.to === nodeId) || (l.to === hoveredId && l.from === nodeId)
      );
    },
    [hoveredId]
  );

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const lines = root.querySelectorAll(".inf-link-draw");
      lines.forEach((line, i) => {
        const len = line.getTotalLength?.() ?? 0;
        if (!len) return;
        line.style.strokeDasharray = String(len);
        line.style.strokeDashoffset = String(len);
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 1.05,
          delay: i * 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <footer ref={rootRef} className="influence-map" aria-labelledby="influence-map-title">
      <h2 id="influence-map-title" className="influence-title">
        {t("footer.influenceMap.title")}
      </h2>
      <p className="influence-desc">{t("footer.influenceMap.desc")}</p>
      <p className="influence-hint">{t("footer.influenceMap.interactHint")}</p>

      <svg
        className="influence-svg"
        viewBox="0 0 1000 640"
        role="img"
        aria-label={t("footer.influenceMap.svgAria")}
      >
        <g className="inf-links-layer">
          {LINKS.map((link) => {
            const a = getNode(link.from);
            const b = getNode(link.to);
            if (!a || !b) return null;
            const active = isLinkActive(link);
            const faded = hoveredId && !active;
            const drawClass = link.dashed ? "" : " inf-link-draw";
            return (
              <line
                key={`${link.from}-${link.to}`}
                className={`inf-link inf-link--${link.kind}${drawClass}${active ? " active" : ""}${
                  faded ? " inf-link--faded" : ""
                }`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                strokeDasharray={link.dashed ? "7 6" : undefined}
              />
            );
          })}
        </g>

        <g className="inf-nodes-layer">
          {NODES.map((node) => {
            const dim = hoveredId && !isNodeConnected(node.id);
            const label = t(node.labelKey);
            const hitH = node.r * 2 + 56;
            const hitW = 168;
            return (
              <a
                key={node.id}
                href={node.hash}
                className="inf-node-anchor"
                onClick={(e) => scrollToHash(node.hash, e)}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(node.id)}
                onBlur={() => setHoveredId(null)}
              >
                <g
                  className={`inf-node${dim ? " inf-node--dim" : ""}`}
                  transform={`translate(${node.x}, ${node.y})`}
                >
                  <rect
                    x={-hitW / 2}
                    y={-node.r - 10}
                    width={hitW}
                    height={hitH}
                    fill="transparent"
                    className="inf-node-hit"
                  />
                  <circle r={node.r} fill={node.fill} className="inf-node-circle" />
                  <text
                    y={node.r + 22}
                    fill="var(--text-primary)"
                    fontSize={node.id === "tengri" || node.id === "kayra" ? 13 : 11}
                    textAnchor="middle"
                    fontFamily="var(--font-display), Cinzel, serif"
                    className="inf-node-label"
                  >
                    {label}
                  </text>
                </g>
              </a>
            );
          })}
        </g>
      </svg>

      <nav className="footer-nav" aria-label={t("footer.navAria", "Site haritası")}>
        <Link href="/sozluk">{t("glossary.title")}</Link>
        <Link href="/soy-agaci">{t("familyTree.title")}</Link>
        <Link href="/yeralti-varliklari">
          {t("kulliyat.title")} {t("kulliyat.titleAccent")}
        </Link>
        <a href="#sagas" onClick={(e) => scrollToHash("#sagas", e)}>{t("runeNav.sagas")}</a>
      </nav>

      <div className="influence-footer-meta">
        {t("footer.copyright")} •{" "}
        <span className="influence-source">{t("footer.source")}</span>
      </div>
    </footer>
  );
}
