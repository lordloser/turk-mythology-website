"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import "../../i18n";
import SubPageTopBar from "../components/SubPageTopBar";

gsap.registerPlugin(ScrollTrigger);

const CREATURE_KEYS = ["alkarisi", "abasi", "kamos"];

export default function YeraltiVarliklariPage() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!hash) return;
    const id = hash.slice(1);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  useGSAP(
    () => {
      gsap.from(".kulliyat-header", {
        y: -40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".kulliyat-toc", {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.15,
      });

      gsap.from(".kulliyat-back", {
        opacity: 0,
        x: -12,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.2,
      });

      const articles = gsap.utils.toArray(".creature-article");
      articles.forEach((art) => {
        gsap.from(art, {
          opacity: 0,
          y: 36,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: art,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.from(".kulliyat-page-footer", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".kulliyat-page-footer",
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className="kulliyat-page">
      <SubPageTopBar />
      <div className="section-inner kulliyat-page-inner">
        <header className="kulliyat-header kulliyat-hero">
          <p className="kulliyat-hero__eyebrow">
            {t("shadow.tag")} · Tamag
          </p>
          <h1 className="kulliyat-hero__title">
            <span className="kulliyat-hero__title-main">{t("kulliyat.title")}</span>{" "}
            <span className="kulliyat-hero__title-accent">{t("kulliyat.titleAccent")}</span>
          </h1>
          <p className="kulliyat-hero__intro">{t("kulliyat.subtitle")}</p>
        </header>

        <Link href="/#shadow-realm" className="kulliyat-back back-link">
          <span aria-hidden>←</span> {t("kulliyat.backToRealm")}
        </Link>

        <nav className="kulliyat-toc" aria-labelledby="kulliyat-toc-heading">
          <h2 id="kulliyat-toc-heading" className="kulliyat-toc__heading">
            {t("kulliyat.tocTitle")}
          </h2>
          <ol className="kulliyat-toc__list">
            {CREATURE_KEYS.map((key) => (
              <li key={key}>
                <a href={`#${key}`} className="kulliyat-toc__link">
                  {t(`kulliyat.creatures.${key}.title`)}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {CREATURE_KEYS.map((key) => {
          const title = t(`kulliyat.creatures.${key}.title`);
          const sub = t(`kulliyat.creatures.${key}.sub`);
          const imgAlt = `${title} — ${sub}`;

          return (
            <article
              key={key}
              id={key}
              className="creature-article"
              aria-labelledby={`creature-heading-${key}`}
            >
              <header className="creature-article__header">
                <h2 id={`creature-heading-${key}`} className="creature-article__title">
                  {title}
                </h2>
                <p className="creature-article__tagline">{sub}</p>
              </header>

              <dl className="creature-meta">
                <div className="creature-meta__group">
                  <dt className="creature-meta__label">{t("kulliyat.categoryLabel")}</dt>
                  <dd className="creature-meta__value">{t(`kulliyat.creatures.${key}.cat`)}</dd>
                </div>
                <div className="creature-meta__group">
                  <dt className="creature-meta__label">{t("kulliyat.weaknessLabel")}</dt>
                  <dd className="creature-meta__value">{t(`kulliyat.creatures.${key}.weak`)}</dd>
                </div>
              </dl>

              <figure className="creature-figure">
                <img
                  src={`/images/${key}.webp`}
                  alt={imgAlt}
                  className="creature-figure__img"
                  width={800}
                  height={800}
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              <p className="creature-lead">{t(`kulliyat.creatures.${key}.desc`)}</p>

              <section className="creature-lore" aria-labelledby={`lore-heading-${key}`}>
                <h3 id={`lore-heading-${key}`} className="creature-lore__title">
                  {t(`bestiary.${key}.loreTitle`)}
                </h3>
                <div className="creature-lore__body">
                  <p>{t(`bestiary.${key}.lore1`)}</p>
                  <p>{t(`bestiary.${key}.lore2`)}</p>
                </div>
              </section>

              <aside className="creature-callout">
                <span className="creature-callout__label">{t("kulliyat.connectionLabel")}</span>
                <p className="creature-callout__text">{t(`kulliyat.creatures.${key}.connection`)}</p>
              </aside>
            </article>
          );
        })}

        <footer className="kulliyat-page-footer">
          <p>{t("kulliyat.footer")}</p>
        </footer>
      </div>
    </main>
  );
}
