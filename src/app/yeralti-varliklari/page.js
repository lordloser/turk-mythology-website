"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import SubPageTopBar from "@/app/components/SubPageTopBar";
import "../../i18n"; // i18n dosyanın yolunu bağıl yol olarak güncelledik

gsap.registerPlugin(ScrollTrigger);

const CREATURE_KEYS = ["alkarisi", "abasi", "kamos"];

export default function YeraltiVarliklariPage() {
    const { t } = useTranslation();
    const containerRef = useRef(null);

    useGSAP(() => {
        // Sayfa açıldığında başlığın ve geri butonunun yumuşakça gelmesi
        gsap.from(".kulliyat-header", {
            y: -50,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out"
        });

        // Paragrafların scroll yaptıkça sırayla belirmesi
        const articles = gsap.utils.toArray(".creature-article");
        articles.forEach((art, i) => {
            gsap.from(art, {
                opacity: 0,
                y: 40,
                duration: 1.2,
                scrollTrigger: {
                    trigger: art,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }, { scope: containerRef });

    return (
        <main ref={containerRef} style={{ background: "var(--bg-dark)", minHeight: "100vh", color: "var(--text-primary)", paddingBottom: "100px" }}>
            <SubPageTopBar />

            <div className="section-inner" style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>

                {/* ÜST KISIM (HERO) */}
                <header className="kulliyat-header" style={{ textAlign: "center", padding: "120px 0 40px" }}>
                    <span style={{ color: "var(--celestial-gold)", letterSpacing: "4px", fontSize: "0.9rem", textTransform: "uppercase" }}>
                        {t("kulliyat.subtitle")}
                    </span>
                    <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontFamily: "var(--font-display)", margin: "10px 0", color: "var(--text-primary)", textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}>
                        {t("kulliyat.title")} {t("kulliyat.titleAccent")}
                    </h1>
                </header>

                {/* GERİ DÖN BUTONU */}
                <div style={{ marginBottom: "60px", textAlign: "center" }}>
                    <Link href="/#shadow-realm" className="back-link">
                        <span>←</span> {t("common.back")}
                    </Link>
                </div>

                {/* YARATIK LİSTESİ */}
                {CREATURE_KEYS.map((key) => {
                    return (
                        <article key={key} className="creature-article" style={{ marginBottom: "80px" }}>
                            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "var(--font-display)", color: "var(--celestial-gold)", margin: "0 0 30px", borderBottom: "1px solid var(--celestial-gold)", paddingBottom: "10px" }}>
                                {t(`kulliyat.creatures.${key}.title`)}
                            </h2>

                            {/* Resim Alanı */}
                            <div style={createCreatureImageStyle(key)} className="creature-image-container" />

                            <p style={{ fontSize: "1.15rem", lineHeight: "1.8", color: "var(--text-secondary)", marginBottom: "30px" }}>
                                {t(`kulliyat.creatures.${key}.desc`)}
                            </p>

                            <p style={{ fontSize: "1rem", lineHeight: "1.7", color: "var(--text-muted)", margin: "0 0 8px" }}>
                                <strong style={{ color: "var(--celestial-gold)" }}>{t("kulliyat.categoryLabel")}</strong> {t(`kulliyat.creatures.${key}.cat`)}
                            </p>
                            <p style={{ fontSize: "1rem", lineHeight: "1.7", color: "var(--text-muted)", margin: 0 }}>
                                <strong style={{ color: "var(--celestial-gold)" }}>{t("kulliyat.weaknessLabel")}</strong> {t(`kulliyat.creatures.${key}.weak`)}
                            </p>
                        </article>
                    );
                })}
            </div>
        </main>
    );
}

// Görseller için ortak stil fonksiyonu (Resim adını ve formatını buraya dinamik ekliyoruz)
const createCreatureImageStyle = (creatureKey) => ({
    width: "100%", // Kapsayıcı genişliği
    maxWidth: "560px",
    marginLeft: "auto",
    marginRight: "auto",
    aspectRatio: "1/1", // Kare formatını zorunlu kılar
    backgroundImage: `url('/images/${creatureKey}.webp')`, // Resim yolu / ile başlamalıdır
    backgroundSize: "cover", // Resmi sığdırmak için
    backgroundPosition: "center",
    borderRadius: "12px", // Kenar yuvarlama
    marginBottom: "35px",
    opacity: 0.8,
    filter: "brightness(0.8) contrast(1.1)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
});