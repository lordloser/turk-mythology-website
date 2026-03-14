"use client";

import { useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const RUNE_ITEMS = [
  { glyph: "𐰃", target: "origin", tipKey: "runeNav.origin" },
  { glyph: "𐰸", target: "migration", tipKey: "runeNav.migration" },
  { glyph: "𐰖", target: "world-tree", tipKey: "runeNav.worldTree" },
  { glyph: "𐱅", target: "pantheon", tipKey: "runeNav.pantheon" },
  { glyph: "𐰉", target: "bestiary", tipKey: "runeNav.bestiary" },
  { glyph: "𐰼", target: "shadow-realm", tipKey: "runeNav.shadowRealm" },
  { glyph: "𐰘", target: "sagas", tipKey: "runeNav.sagas" },
];

const SECTION_IDS = ["origin", "world-tree", "pantheon", "bestiary", "shadow-realm", "sagas"];

export default function RuneNav({ t, sectionRefs }) {
  const navRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Show/hide nav based on scroll position
    ScrollTrigger.create({
      trigger: "#origin",
      start: "bottom 80%",
      onEnter: () => nav.classList.add("visible"),
      onLeaveBack: () => nav.classList.remove("visible"),
    });

    // Track active section
    SECTION_IDS.forEach((id, idx) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIdx(idx),
        onEnterBack: () => setActiveIdx(idx),
      });
    });
  }, { scope: navRef });

  const handleClick = useCallback((target) => {
    const el = sectionRefs?.[target]?.current;
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [sectionRefs]);

  return (
    <nav className="rune-nav" ref={navRef}>
      {RUNE_ITEMS.map((r, i) => (
        <div
          key={r.target}
          className={`rune-nav-item${activeIdx === i ? " active" : ""}`}
          data-target={r.target}
          onClick={() => handleClick(r.target)}
        >
          <span className="rune-glyph">{r.glyph}</span>
          <span className="rune-tooltip">{t(r.tipKey)}</span>
        </div>
      ))}
    </nav>
  );
}
