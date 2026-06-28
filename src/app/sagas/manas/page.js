"use client";

import { useTranslation } from "react-i18next";
import SagaPageTemplate from "../../components/SagaPageTemplate";

export default function ManasEpic() {
  const { t } = useTranslation();

  return (
    <SagaPageTemplate
      heroImage="/images/manas.webp"
      showTopBar={false}
      heroHeight="65vh"
      heroImagePosition="center top"
      heroOpacity={0.5}
      heroFilter="brightness(0.55) contrast(1.1)"
      overlayGradient="linear-gradient(to bottom, rgba(0,0,0,0.2), var(--bg-dark))"
      extraHeroLayer={
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(139,20,20,0.15) 0%, transparent 70%)" }} />
      }
      titleFontSize="clamp(3rem, 7vw, 5.5rem)"
      subtitleKey="epic.manas.subtitle"
      subtitleDefault="The Eternal Champion of the Steppes"
      titleKey="epic.manas.title"
      titleDefault="THE EPIC OF MANAS"
      badge={
        <span style={{ display: "inline-block", marginTop: "12px", padding: "4px 20px", border: "1px solid rgba(212,168,67,0.4)", color: "rgba(212,168,67,0.7)", fontSize: "0.8rem", letterSpacing: "4px" }}>
          SAGA IV
        </span>
      }
      backTextDefault="Back to Sagas"
    >
      <p className="epic-paragraph" style={{ marginBottom: "30px" }}>
        {t("epic.manas.p1")}
      </p>
      <p className="epic-paragraph" style={{ marginBottom: "30px" }}>
        {t("epic.manas.p2")}
      </p>

      <h3 className="epic-paragraph" style={{ color: "var(--celestial-gold)", fontSize: "1.8rem", marginTop: "60px", marginBottom: "20px", fontFamily: "var(--font-display)", borderBottom: "1px solid rgba(212,168,67,0.2)", paddingBottom: "12px" }}>
        {t("epic.manas.h2", "The Forty Heroes — Kyrk Choro")}
      </h3>

      <p className="epic-paragraph" style={{ marginBottom: "30px" }}>
        {t("epic.manas.p3")}
      </p>
      <p className="epic-paragraph" style={{ marginBottom: "30px" }}>
        {t("epic.manas.p4")}
      </p>

      <p className="epic-paragraph" style={{ marginBottom: "30px", padding: "24px 28px", borderLeft: "3px solid var(--celestial-gold)", background: "rgba(212, 168, 67, 0.05)", color: "var(--text-primary)", fontStyle: "italic", borderRadius: "0 8px 8px 0" }}>
        {t("epic.manas.p5")}
      </p>
    </SagaPageTemplate>
  );
}
