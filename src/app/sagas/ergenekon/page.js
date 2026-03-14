"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function ErgenekonEpic() {
    const { t } = useTranslation();
    const containerRef = useRef(null);

    useGSAP(() => {
        // Sayfa açıldığında başlığın ve geri butonunun yumuşakça gelmesi
        gsap.from(".epic-header", {
            y: -50,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out"
        });

        // Paragrafların scroll yaptıkça sırayla belirmesi
        const paragraphs = gsap.utils.toArray(".epic-paragraph");
        paragraphs.forEach((p, i) => {
            gsap.from(p, {
                opacity: 0,
                y: 40,
                duration: 1.2,
                scrollTrigger: {
                    trigger: p,
                    start: "top 85%", // Paragraf ekrana %85 girdiğinde başlasın
                    toggleActions: "play none none reverse"
                }
            });
        });
    }, { scope: containerRef });

    return (
        <main ref={containerRef} style={{ background: "var(--bg-dark)", minHeight: "100vh", color: "var(--text-primary)", paddingBottom: "100px" }}>

            {/* ÜST KISIM (HERO) */}
            <div className="epic-hero" style={{ position: "relative", height: "60vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {/* Daha önce genişlettiğimiz resmi burada kullanabilirsin */}
                <div
                    style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "url('/images/migration-2.jpg')", // Resim yolunu kendine göre ayarla
                        backgroundSize: "cover", backgroundPosition: "center",
                        opacity: 0.4, filter: "brightness(0.6)"
                    }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, var(--bg-dark))" }} />

                <div className="epic-header" style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 20px" }}>
                    <span style={{ color: "var(--celestial-gold)", letterSpacing: "4px", fontSize: "0.9rem", textTransform: "uppercase" }}>
                        {t("sagas.ergenekon.subtitle", "Demir Dağ Hapishanesi")}
                    </span>
                    <h1 style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontFamily: "var(--font-display)", margin: "10px 0", color: "var(--text-primary)", textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}>
                        ERGENEKON DESTANI
                    </h1>
                </div>
            </div>

            {/* GERİ DÖN BUTONU */}
            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
                {/* SİHİRLİ DOKUNUŞ: href="/" yerine href="/#sagas" yapıyoruz */}
                <Link href="/#sagas" style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", letterSpacing: "1px", transition: "color 0.3s" }} className="hover-gold">
                    <span>←</span> {t("common.back", "Diyarlara Dön")}
                </Link>
            </div>

            {/* DESTAN METNİ */}
            <article style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px", fontSize: "1.15rem", lineHeight: "1.8", color: "var(--text-secondary)" }}>

                <p className="epic-paragraph" style={{ marginBottom: "30px" }}>
                    {t("epic.ergenekon.p1", "Büyük bir yenilginin ardından, Türk boylarından geriye sadece Kıyan ve Nüküz adında iki kişi ve eşleri kalmıştı. Düşmanlardan kaçarken, sarp dağların arasında, sadece bir geyiğin geçebileceği kadar dar bir geçit buldular.")}
                </p>

                <p className="epic-paragraph" style={{ marginBottom: "30px" }}>
                    {t("epic.ergenekon.p2", "Bu geçitten geçtiklerinde, karşılarına akarsuların, meyve ağaçlarının ve av hayvanlarının bol olduğu, her tarafı aşılmaz yüksek dağlarla çevrili gizli ve cennet gibi bir vadi çıktı. Bu yere, 'maden yeri' anlamına gelen Ergenekon adını verdiler.")}
                </p>

                <h3 className="epic-paragraph" style={{ color: "var(--steppe-emerald-light)", fontSize: "1.8rem", marginTop: "50px", marginBottom: "20px", fontFamily: "var(--font-display)" }}>
                    {t("epic.ergenekon.h2", "Demir Dağın Erimesi")}
                </h3>

                <p className="epic-paragraph" style={{ marginBottom: "30px" }}>
                    {t("epic.ergenekon.p3", "Dört yüz yıl boyunca Ergenekon'da yaşadılar ve o kadar çoğaldılar ki artık bu vadiye sığmaz oldular. Atalarının buraya geldiği o dar geçidi bulamadılar. Dağların etrafını araştırırken, sadece bir yerde demir madeni olduğunu fark ettiler.")}
                </p>

                <p className="epic-paragraph" style={{ marginBottom: "30px" }}>
                    {t("epic.ergenekon.p4", "Bir demirci, bu dağın eritilebileceğini söyledi. Dağın etrafına bir sıra odun, bir sıra kömür dizdiler. Yetmiş deriden devasa körükler yaptılar. Hep birlikte körükleri çektiklerinde ateş o kadar hiddetlendi ki, demir dağ eridi ve yüklü bir devenin geçebileceği kadar büyük bir yol açıldı.")}
                </p>

                <p className="epic-paragraph" style={{ marginBottom: "30px", padding: "20px", borderLeft: "3px solid var(--celestial-gold)", background: "rgba(212, 168, 67, 0.05)", color: "var(--text-primary)", fontStyle: "italic" }}>
                    {t("epic.ergenekon.p5", "O gün, Türklerin yeniden doğuş günü oldu. Gök yeleli, kutsal bir Bozkurt'un (Gökböri) rehberliğinde Ergenekon'dan çıktılar ve atalarının intikamını alarak tüm bozkırlara yeniden hakim oldular.")}
                </p>

            </article>

        </main>
    );
}