"use client";

import Link from "next/link";
import { useRef, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ParticleCanvas from "../ParticleCanvas";
import { TreeSpirit } from "../../utils/particles";

gsap.registerPlugin(ScrollTrigger);

const TREE_COLORS = ["74,158,97", "45,107,63", "218,165,32", "212,168,67"];

const REALM_CARDS = [
  { id: "upper", hash: "#pantheon", tone: "upper" },
  { id: "middle", hash: "#bestiary", tone: "middle" },
  { id: "lower", hash: "#shadow-realm", tone: "lower" },
];

function scrollToRealm(hash, e) {
  if (e?.metaKey || e?.ctrlKey) return;
  e?.preventDefault();
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const WorldTreeSection = forwardRef(function WorldTreeSection({ t }, ref) {
  const containerRef = useRef(null);
  const treeImageRef = useRef(null);
  const treeInfoRef = useRef(null);

  useGSAP(() => {
    // Tree image fade in
    gsap.to(treeImageRef.current, {
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Info panel slide in
    gsap.to(treeInfoRef.current, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });

    // Tree image parallax
    gsap.to(treeImageRef.current, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section id="world-tree" className="section texture-stone" ref={(el) => {
      containerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    }}>
      <ParticleCanvas
        ParticleClass={TreeSpirit}
        colors={TREE_COLORS}
        countDivisor={12000}
        maxCount={80}
        sectionId="world-tree"
      />
      <div className="section-inner">
        <div className="tree-container">
          <div className="tree-visual">
            <img src="/images/bayterek.webp" alt="Bayterek" ref={treeImageRef} loading="lazy" decoding="async" />
          </div>
          <div className="tree-info" id="treeInfo" ref={treeInfoRef}>
            <h2 className="heading-xl">
              {t("worldTree.heading")}
              <br />
              <small style={{ fontSize: "0.5em", color: "var(--text-muted)" }}>
                {t("worldTree.sub")}
              </small>
            </h2>
            <p dangerouslySetInnerHTML={{ __html: t("worldTree.p1") }} />
            <p>{t("worldTree.p2")}</p>
            <p className="tree-axis-note">{t("worldTree.axisNote")}</p>
            <p
              className="tree-visitor-blurb"
              dangerouslySetInnerHTML={{ __html: t("worldTree.visitorBlurb") }}
            />
            <div className="tree-realm-cards" role="list">
              {REALM_CARDS.map((card) => (
                <div
                  key={card.id}
                  className={`tree-realm-card tree-realm-card--${card.tone}`}
                  role="listitem"
                >
                  <div className="tree-realm-card__head">{t(`worldTree.${card.id}`)}</div>
                  <p className="tree-realm-card__desc">{t(`worldTree.${card.id}Desc`)}</p>
                  <a
                    href={card.hash}
                    className="tree-realm-card__link"
                    onClick={(e) => scrollToRealm(card.hash, e)}
                  >
                    {t("worldTree.realmCta")} <span aria-hidden>→</span>
                  </a>
                </div>
              ))}
            </div>
            <Link href="/kozmoloji" className="detail-link" style={{ marginTop: 28 }}>
              {t("worldTreeCta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

export default WorldTreeSection;
