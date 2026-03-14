"use client";

import { useRef, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CREATURES = [
  { id: "bukre", img: "bukre-dragon" },
  { id: "tulpar", img: "tulpar" },
  { id: "tepegoz", img: "tepegoz" },
  { id: "arcura", img: "arcura" },
  { id: "asena", img: "asena" },
  { id: "alkarisi", img: "alkarisi" },
];

function getCreatureName(id, t) {
  if (id === "alkarisi") return t("shadow.alkarisi");
  if (id === "bukre") return t("shadow.bukre.name");
  return t(`bestiary.${id}.name`);
}

function getCreatureType(id, t) {
  if (id === "alkarisi") return "Demon of the Abyss";
  if (id === "bukre") return t("shadow.bukre.type");
  return t(`bestiary.${id}.type`);
}

function getCreatureDesc(id, t) {
  if (id === "alkarisi") return t("shadow.alkarisiDesc");
  if (id === "bukre") return t("shadow.bukre.desc");
  return t(`bestiary.${id}.desc`);
}

function getCreatureLoreTitle(id, t) {
  if (id === "alkarisi") return t("shadow.alkarisi");
  if (id === "bukre") return t("shadow.bukre.title");
  return t(`bestiary.${id}.loreTitle`);
}

function getCreatureLore1(id, t) {
  if (id === "alkarisi") return t("shadow.alkarisiDesc");
  if (id === "bukre") return t("shadow.bukre.desc");
  return t(`bestiary.${id}.lore1`);
}

function getCreatureLore2(id, t) {
  if (id === "alkarisi") return "Drawn to the vulnerable, particularly during childbirth.";
  if (id === "bukre") return "A guardian of the underworld's deepest secrets, snaking through Tamag.";
  return t(`bestiary.${id}.lore2`);
}

function getCreatureConnection(id, t) {
  if (id === "alkarisi") return "Minion of Erlik Han";
  if (id === "bukre") return "Guardian of the Deep";
  return t(`bestiary.${id}.connection`);
}

const BestiarySection = forwardRef(function BestiarySection({ t }, ref) {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const bukreBgRef = useRef(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const totalW = track.scrollWidth - wrapper.offsetWidth;

    gsap.to(track, {
      x: -totalW,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top 30%",
        end: () => `+=${totalW}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

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

    // Reveal elements
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
      </div>
      <div
        className="bestiary-scroll-wrapper"
        ref={wrapperRef}
        style={{ position: "relative", width: "100%", overflow: "hidden", marginTop: "20px" }}
      >
        <img
          src="/images/bukre-dragon.png"
          className="bukre-bg-anim"
          ref={bukreBgRef}
          alt="Bükre Dragon Background"
          style={{
            position: "absolute",
            top: "10%",
            left: "-20%",
            width: "140%",
            height: "80%",
            objectFit: "contain",
            opacity: 0.15,
            pointerEvents: "none",
            zIndex: 0,
            filter: "grayscale(40%) blur(1px)",
            transform: "rotate(-5deg)",
          }}
        />
        <div
          className="bestiary-track"
          ref={trackRef}
          style={{ position: "relative", zIndex: 1 }}
        >
          {CREATURES.map((c) => (
            <article className="creature-card" key={c.id}>
              <div className="creature-card-inner">
                <img
                  className="creature-image"
                  src={`/images/${c.img}.png`}
                  alt={getCreatureName(c.id, t)}
                />
                <div className="creature-info">
                  <h3 className="creature-name">{getCreatureName(c.id, t)}</h3>
                  <span className="creature-type">{getCreatureType(c.id, t)}</span>
                  <p className="creature-desc">{getCreatureDesc(c.id, t)}</p>
                </div>
                <div className="lore-overlay">
                  <h4>{getCreatureLoreTitle(c.id, t)}</h4>
                  <p>{getCreatureLore1(c.id, t)}</p>
                  <p>{getCreatureLore2(c.id, t)}</p>
                  <span className="lore-connection">{getCreatureConnection(c.id, t)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

export default BestiarySection;
