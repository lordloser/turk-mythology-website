"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import "@/i18n";
import SubPageTopBar from "@/app/components/SubPageTopBar";
import { ENTITIES_BY_SLUG, entityHref } from "@/data/entities";
import { SOURCES_BY_ID } from "@/data/sources";

export default function EntityView({ slug }) {
  const { t, i18n } = useTranslation();
  // Bazı varlıkların efsane/bağlantı metni yok; olmayan anahtarı ekrana basma
  const has = (key) => Boolean(key) && i18n.exists(key);
  const containerRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const entity = ENTITIES_BY_SLUG[slug];

  useGSAP(() => {
    gsap.from(".entity-hero > *", { y: 30, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out" });
    gsap.from(".entity-portrait", { scale: 1.08, opacity: 0, duration: 1.4, ease: "power2.out" });
  }, { scope: containerRef });

  async function share() {
    const url = window.location.href;
    const title = t(entity.name);
    try {
      if (navigator.share) {
        await navigator.share({ title, text: t(entity.type), url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Kullanıcı paylaşımı iptal etti; bir şey yapma
    }
  }

  const related = (entity.related || []).map((s) => ENTITIES_BY_SLUG[s]).filter(Boolean);
  const sources = (entity.sources || []).map((id) => SOURCES_BY_ID[id]).filter(Boolean);

  return (
    <>
      <SubPageTopBar />
      <main ref={containerRef} className={`entity-page realm-${entity.realm}`}>
        <article className="entity-layout">
          <div className="entity-portrait-wrap">
            <img className="entity-portrait" src={`/images/${entity.img}.webp`} alt={t(entity.name)} fetchPriority="high" />
          </div>

          <div className="entity-body">
            <header className="entity-hero">
              <div className="entity-badges">
                <Link href={`/kozmoloji#${entity.realm}`} className={`entity-badge realm-badge-${entity.realm}`}>
                  {t(`entity.realm.${entity.realm}`)}
                </Link>
                <span className="entity-badge">{t(`entity.kind.${entity.kind}`)}</span>
              </div>
              <h1 className="entity-name">{t(entity.name)}</h1>
              <p className="entity-type">{t(entity.type)}</p>
              <p className="entity-desc">{t(entity.desc)}</p>
            </header>

            {entity.lore?.some(has) && (
              <section className="entity-lore">
                <h2>{has(entity.loreTitle) ? t(entity.loreTitle) : t("entity.lore")}</h2>
                {entity.lore.filter(has).map((k) => (
                  <p key={k}>{t(k)}</p>
                ))}
              </section>
            )}

            {has(entity.connection) && <p className="entity-connection">{t(entity.connection)}</p>}

            <div className="entity-actions">
              <button type="button" className="entity-share" onClick={share}>
                {copied ? t("entity.copied") : t("entity.share")}
              </button>
              <Link href={`/kozmoloji#${entity.realm}`} className="entity-link">
                {t("entity.exploreCosmos")}
              </Link>
            </div>

            {sources.length > 0 && (
              <section className="entity-sources">
                <h2>{t("entity.sources")}</h2>
                <ul>
                  {sources.map((s) => (
                    <li key={s.id}>
                      <Link href={`/kaynakca#${s.id}`}>
                        {s.author !== "—" && <span className="src-author">{s.author}, </span>}
                        <em>{s.title}</em> ({s.year})
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/kaynakca" className="entity-link">{t("entity.allSources")}</Link>
              </section>
            )}
          </div>
        </article>

        {related.length > 0 && (
          <section className="entity-related">
            <h2>{t("entity.related")}</h2>
            <div className="entity-grid">
              {related.map((r) => (
                <Link key={r.slug} href={entityHref(r.slug)} className={`entity-card realm-${r.realm}`}>
                  <img src={`/images/${r.img}.webp`} alt="" loading="lazy" decoding="async" />
                  <span className="entity-card-name">{t(r.name)}</span>
                  <span className="entity-card-type">{t(r.type)}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className="entity-footer">
          <Link href="/" className="entity-link">{t("entity.backHome")}</Link>
        </footer>
      </main>
    </>
  );
}
