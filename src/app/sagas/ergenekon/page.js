"use client";

import { useTranslation } from "react-i18next";
import SagaPageTemplate from "../../components/SagaPageTemplate";

export default function ErgenekonEpic() {
  const { t } = useTranslation();

  return (
    <SagaPageTemplate
      heroImage="/images/migration-2.webp"
      showTopBar={false}
      titleFontSize="clamp(3rem, 6vw, 5rem)"
      subtitleKey="sagas.ergenekon.subtitle"
      subtitleDefault="Demir Dağ Hapishanesi"
      title="ERGENEKON DESTANI"
      backTextDefault="Diyarlara Dön"
    >
      <p className="epic-paragraph" style={{ marginBottom: "30px" }}>{t("epic.ergenekon.p1")}</p>
      <p className="epic-paragraph" style={{ marginBottom: "30px" }}>{t("epic.ergenekon.p2")}</p>
      <h3 className="epic-paragraph" style={{ color: "var(--steppe-emerald-light)", fontSize: "1.8rem", marginTop: "50px", marginBottom: "20px", fontFamily: "var(--font-display)" }}>
        {t("epic.ergenekon.h2", "Demir Dağın Erimesi")}
      </h3>
      <p className="epic-paragraph" style={{ marginBottom: "30px" }}>{t("epic.ergenekon.p3")}</p>
      <p className="epic-paragraph" style={{ marginBottom: "30px" }}>{t("epic.ergenekon.p4")}</p>
      <p className="epic-paragraph" style={{ marginBottom: "30px", padding: "20px", borderLeft: "3px solid var(--celestial-gold)", background: "rgba(212, 168, 67, 0.05)", color: "var(--text-primary)", fontStyle: "italic" }}>
        {t("epic.ergenekon.p5")}
      </p>
    </SagaPageTemplate>
  );
}
