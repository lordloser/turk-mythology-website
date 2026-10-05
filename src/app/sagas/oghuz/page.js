"use client";

import { useTranslation } from "react-i18next";
import "@/i18n";
import SagaPageTemplate from "../../components/SagaPageTemplate";

export default function OghuzEpic() {
  const { t } = useTranslation();

  return (
    <SagaPageTemplate
      heroImage="/images/oghuz-khagan.webp"
      subtitleKey="epic.oghuz.subtitle"
      titleKey="epic.oghuz.title"
    >
      <p className="epic-paragraph" style={{ marginBottom: "30px" }}>{t("epic.oghuz.p1")}</p>
      <p className="epic-paragraph" style={{ marginBottom: "30px" }}>{t("epic.oghuz.p2")}</p>

      <h3 className="epic-paragraph" style={{ color: "var(--celestial-gold-bright)", fontSize: "1.8rem", marginTop: "50px", marginBottom: "20px", fontFamily: "var(--font-display)" }}>
        {t("epic.oghuz.h2")}
      </h3>

      <p className="epic-paragraph" style={{ marginBottom: "30px" }}>{t("epic.oghuz.p3")}</p>
      <p className="epic-paragraph" style={{ marginBottom: "30px", padding: "20px", borderLeft: "3px solid var(--celestial-gold)", background: "rgba(212, 168, 67, 0.05)", color: "var(--text-primary)", fontStyle: "italic" }}>
        {t("epic.oghuz.p4")}
      </p>
    </SagaPageTemplate>
  );
}
