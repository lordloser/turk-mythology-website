"use client";

import { useTranslation } from "react-i18next";
import "@/i18n";
import SagaPageTemplate from "../../components/SagaPageTemplate";

export default function AsenaEpic() {
  const { t } = useTranslation();

  return (
    <SagaPageTemplate
      heroImage="/images/asena.webp"
      subtitleKey="epic.asena.subtitle"
      titleKey="epic.asena.title"
    >
      <p className="epic-paragraph" style={{ marginBottom: "30px" }}>{t("epic.asena.p1")}</p>
      <p className="epic-paragraph" style={{ marginBottom: "30px" }}>{t("epic.asena.p2")}</p>

      <h3 className="epic-paragraph" style={{ color: "var(--steppe-emerald-light)", fontSize: "1.8rem", marginTop: "50px", marginBottom: "20px", fontFamily: "var(--font-display)" }}>
        {t("epic.asena.h2")}
      </h3>

      <p className="epic-paragraph" style={{ marginBottom: "30px" }}>{t("epic.asena.p3")}</p>
      <p className="epic-paragraph" style={{ marginBottom: "30px", padding: "20px", borderLeft: "3px solid var(--celestial-gold)", background: "rgba(212, 168, 67, 0.05)", color: "var(--text-primary)", fontStyle: "italic" }}>
        {t("epic.asena.p4")}
      </p>
    </SagaPageTemplate>
  );
}
