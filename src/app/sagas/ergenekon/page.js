"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function YeraltiVarliklariPage() {
    const { t } = useTranslation();
    const containerRef = useRef(null);

    // Yaratık anahtarları
    const creatureKeys = ["alkarisi", "abasi", "kamos"];

    useGSAP(() => {
        // Header Animasyonu
        gsap.from(".kulliyat-header", {
            y: -50,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out"
        });

        // Kartların sırayla gelmesi
        const articles = gsap.utils.toArray(".creature-article");
        articles.forEach((art) => {
            gsap.from(art, {
                opacity: 0,
                y: 50,
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

            {/* HERO SECTION */}
            <div className="kulliyat-hero" style={{ position: "relative", height: "60vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <div
                    style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "url('/images/underworld-hero.jpg')", // Resim yolunu ayarla
                        backgroundSize: "cover", backgroundPosition: "center",
                        opacity: 0.3, filter: "grayscale(1) brightness(0.5)"
                    }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, var(--bg-dark))" }} />

                <div className="kulliyat-header" style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 20px" }}>
                    <span style={{ color: "var(--abyss-crimson-bright)", letterSpacing: "4px", fontSize: "0.9rem", textTransform: "uppercase" }}>
                        {t("kulliyat.subtitle", "Erlik Han'ın Gölge Ordusu")}
                    </span>
                    <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontFamily: "var(--font-display)", margin: "10px 0", color: "var(--text-primary)", textShadow: "0 4px 20px rgba(139,0,0,0.5)" }}>
                        {t("kulliyat.title", "KARANLIK KÜLLİYAT")}
                    </h1>
                </div>
            </div>

            {/* GERİ DÖN BUTONU */}
            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
                <Link href="/#shadow-realm" style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", letterSpacing: "1px", transition: "color 0.3s" }} className="hover-gold">
                    <span>←</span> {t("common.back", "Gölge Diyarına Dön")}
                </Link>
            </div>

            {/* YARATIK LİSTESİ */}
            <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>
                {creatureKeys.map((key) => (
                    <article key={key} className="creature-article" style={{ marginBottom: "80px", borderBottom: "1px solid rgba(139,0,0,0.1)", paddingBottom: "40px" }}>

                        <span style={{ color: "var(--abyss-crimson)", fontSize: "0.8rem", fontWeight: "bold", tracking: "2px", textTransform: "uppercase" }}>
                            {t(`kulliyat.creatures.${key}.cat`)}
                        </span>

                        <h2 style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--text-primary)", margin: "10px 0" }}>
                            {t(`kulliyat.creatures.${key}.title`)}
                        </h2>

                        <h4 style={{ color: "var(--abyss-magma)", fontSize: "1rem", marginBottom: "20px", opacity: 0.8 }}>
                            {t(`kulliyat.creatures.${key}.sub`)}
                        </h4>

                        <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--text-secondary)", marginBottom: "25px" }}>
                            {t(`kulliyat.creatures.${key}.desc`)}
                        </p>

                        <div style={{ padding: "15px 20px", background: "rgba(139, 0, 0, 0.05)", borderLeft: "3px solid var(--abyss-crimson)" }}>
                            <span style={{ color: "var(--abyss-crimson-bright)", fontWeight: "bold", fontSize: "0.8rem", textTransform: "uppercase", marginRight: "10px" }}>
                                {t("kulliyat.weaknessLabel", "ZAFİYETİ:")}
                            </span>
                            <span style={{ color: "var(--text-primary)", fontStyle: "italic" }}>
                                {t(`kulliyat.creatures.${key}.weak`)}
                            </span>
                        </div>
                    </article>
                ))}
            </div>

        </main>
    );
}