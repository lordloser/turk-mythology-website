"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import "../../i18n";

gsap.registerPlugin(ScrollTrigger);

export default function SozlukPage() {
    const { t } = useTranslation();
    const containerRef = useRef(null);

    // Make sure we have a fallback if translation array is not ready
    const terms = t("glossary.terms", { returnObjects: true }) || [];
    const validTerms = Array.isArray(terms) ? terms : [];

    useGSAP(() => {
        gsap.from(".header-anim", {
            y: -30,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out"
        });

        const items = gsap.utils.toArray(".glossary-item");
        items.forEach((item, i) => {
            gsap.from(item, {
                opacity: 0,
                x: -30,
                duration: 0.8,
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }, { scope: containerRef });

    return (
        <main ref={containerRef} style={{ background: "var(--bg-dark)", minHeight: "100vh", color: "var(--text-primary)", paddingBottom: "100px" }}>
            <div className="section-inner" style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 20px" }}>
                
                <header className="header-anim" style={{ textAlign: "center", marginBottom: "60px" }}>
                    <span style={{ color: "var(--celestial-gold)", letterSpacing: "4px", fontSize: "0.9rem", textTransform: "uppercase" }}>
                        {t("glossary.subtitle")}
                    </span>
                    <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontFamily: "var(--font-display)", margin: "10px 0" }}>
                        {t("glossary.title")}
                    </h1>
                </header>

                <div className="header-anim" style={{ marginBottom: "50px" }}>
                    <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.3s" }} className="hover-gold">
                        <span>←</span> {t("common.back", "Ana Sayfaya Dön")}
                    </Link>
                </div>

                <div className="glossary-list" style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                    {validTerms.map((item, index) => (
                        <article key={index} className="glossary-item" style={{ 
                            background: "rgba(20,20,20,0.6)", 
                            border: "1px solid rgba(212,168,67,0.1)", 
                            padding: "30px", 
                            borderRadius: "12px",
                            transition: "all 0.3s ease" 
                        }}>
                            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--celestial-gold-bright)", fontSize: "1.8rem", margin: "0 0 15px 0" }}>
                                {item.term}
                            </h2>
                            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: "1.7", margin: 0 }}>
                                {item.def}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}
