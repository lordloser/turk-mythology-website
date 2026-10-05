"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import "@/i18n";
import SubPageTopBar from "@/app/components/SubPageTopBar";
import { SOURCES, SOURCE_GROUPS } from "@/data/sources";
import { ENTITIES, entityHref } from "@/data/entities";

/* Her kaynağa dayanan varlıklar (kaynak kartlarında gösterilir) */
const ENTITIES_BY_SOURCE = ENTITIES.reduce((acc, e) => {
  (e.sources || []).forEach((id) => (acc[id] ||= []).push(e));
  return acc;
}, {});

export default function SourcesView() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const lang = i18n.language === "en" ? "en" : "tr";

  useGSAP(() => {
    gsap.from(".page-header > *", { y: -30, opacity: 0, duration: 1.1, stagger: 0.15, ease: "power3.out" });
    gsap.from(".source-card", { y: 20, opacity: 0, duration: 0.6, stagger: 0.05, ease: "power2.out", delay: 0.3 });
  }, { scope: containerRef });

  return (
    <>
      <SubPageTopBar />
      <main ref={containerRef} className="content-page">
        <header className="page-header">
          <span className="page-tag">{t("sourcesPage.tag")}</span>
          <h1 className="page-title">
            {t("sourcesPage.title")} <span className="text-gold">{t("sourcesPage.titleGold")}</span>
          </h1>
          <p className="page-desc">{t("sourcesPage.desc")}</p>
        </header>

        {SOURCE_GROUPS.map((group) => (
          <section key={group.id} className="source-group">
            <h2 className="source-group-title">{t(`sourcesPage.${group.id}`)}</h2>
            <ol className="source-list">
              {SOURCES.filter((s) => s.group === group.id).map((s) => {
                const used = ENTITIES_BY_SOURCE[s.id] || [];
                return (
                  <li key={s.id} id={s.id} className="source-card">
                    <p className="source-cite">
                      {s.author !== "—" && <span className="src-author">{s.author}. </span>}
                      <cite>{s.title}</cite>
                      <span className="src-meta">
                        {" "}· {s.year}
                        {s.publisher ? ` · ${s.publisher}` : ""}
                      </span>
                    </p>
                    <p className="source-note">{s.note[lang]}</p>
                    {used.length > 0 && (
                      <p className="source-used">
                        <span>{t("sourcesPage.usedBy")}</span>{" "}
                        {used.map((e, i) => (
                          <span key={e.slug}>
                            <Link href={entityHref(e.slug)}>{t(e.name)}</Link>
                            {i < used.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}

        <p className="source-disclaimer">{t("sourcesPage.disclaimer")}</p>

        <footer className="entity-footer">
          <Link href="/" className="entity-link">{t("entity.backHome")}</Link>
        </footer>
      </main>
    </>
  );
}
