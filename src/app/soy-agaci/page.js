"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import "../../i18n";
import NexusWeb from "../components/NexusWeb";

export default function SoyAgaciPage() {
    const { t } = useTranslation();
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from(".tree-header", {
            y: -30,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out"
        });

        gsap.from(".tree-content", {
            opacity: 0,
            scale: 0.95,
            duration: 1.5,
            delay: 0.5,
            ease: "power2.out"
        });
    }, { scope: containerRef });

    return (
        <main ref={containerRef} style={{ background: "var(--bg-dark)", minHeight: "100vh", color: "var(--text-primary)", paddingBottom: "100px" }}>
            <div className="section-inner" style={{ maxWidth: "1000px", margin: "0 auto", padding: "60px 20px" }}>
                
                <header className="tree-header" style={{ textAlign: "center", marginBottom: "40px" }}>
                    <span style={{ color: "var(--celestial-gold)", letterSpacing: "4px", fontSize: "0.9rem", textTransform: "uppercase" }}>
                        {t("familyTree.subtitle")}
                    </span>
                    <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontFamily: "var(--font-display)", margin: "10px 0" }}>
                        {t("familyTree.title")}
                    </h1>
                </header>

                <div className="tree-header" style={{ marginBottom: "50px", textAlign: "center" }}>
                    <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.3s" }} className="hover-gold">
                        <span>←</span> {t("common.back", "Ana Sayfaya Dön")}
                    </Link>
                </div>

                <div className="tree-content" style={{
                    background: "rgba(15, 15, 15, 0.8)",
                    border: "1px solid var(--border-glow)",
                    borderRadius: "20px",
                    padding: "40px",
                    boxShadow: "0 0 40px rgba(0,0,0,0.5)"
                }}>
                    <NexusWeb />
                </div>
                
                <p className="tree-header" style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "30px", fontSize: "0.9rem" }}>
                    {t("familyTree.hint")}
                </p>
            </div>
        </main>
    );
}
