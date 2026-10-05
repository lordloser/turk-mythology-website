"use client";

import Link from "next/link";

const SAGAS = ["ergenekon", "oghuz", "asena", "manas"];
const REALM_LINKS = ["sky", "middle", "under"];

export default function FooterSection({ t }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Kozmoloji haritasına çağrı */}
        <Link href="/kozmoloji" className="footer-cta">
          <span className="footer-cta-tag">{t("cosmos.tag")}</span>
          <span className="footer-cta-title">{t("footer.cosmosCta")}</span>
          <span className="footer-cta-desc">{t("footer.cosmosCtaDesc")}</span>
          <span className="footer-cta-arrow" aria-hidden="true">→</span>
        </Link>

        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">𐱅</span>
              <span>{t("footer.title")}</span>
            </div>
            <p>{t("footer.subtitle")}</p>
          </div>

          <nav className="footer-col" aria-label={t("footer.explore")}>
            <h3>{t("footer.explore")}</h3>
            <Link href="/kozmoloji">{t("nav.cosmos")}</Link>
            <Link href="/sozluk">{t("glossary.title")}</Link>
            <Link href="/soy-agaci">{t("familyTree.title")}</Link>
            <Link href="/yeralti-varliklari">
              {t("kulliyat.title")} {t("kulliyat.titleAccent")}
            </Link>
            <Link href="/kaynakca">{t("nav.sources")}</Link>
          </nav>

          <nav className="footer-col" aria-label={t("footer.sagasTitle")}>
            <h3>{t("footer.sagasTitle")}</h3>
            {SAGAS.map((s) => (
              <Link key={s} href={`/sagas/${s}`}>
                {t(`sagas.${s}.title`)}
              </Link>
            ))}
          </nav>

          <nav className="footer-col" aria-label={t("footer.realmsTitle")}>
            <h3>{t("footer.realmsTitle")}</h3>
            {REALM_LINKS.map((r) => (
              <Link key={r} href={`/kozmoloji#${r}`}>
                {t(`entity.realm.${r}`)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <span>{t("footer.copyright")}</span>
          <Link href="/kaynakca">{t("footer.source")}</Link>
        </div>
      </div>
    </footer>
  );
}
