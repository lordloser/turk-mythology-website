"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import "../../i18n"; // i18n dosyanın yolunu bağıl yol olarak güncelledik

gsap.registerPlugin(ScrollTrigger);

// Yaratık verilerini ve metinlerini yöneten merkezi obje
const CREATURE_DATA = {
    alkarisi: {
        title: "ALKARISI",
        desc: "Türk mitolojisindeki en eski habis ruhlardan biridir. Erlik Han'ın taze yaşam enerjisi 'Kut'u hasat etmek için yeryüzüne gönderdiği bir avcıdır. Genellikle lohusa kadınlara ve yenidoğanlara musallat olmasıyla bilinir; ciğer çalan ve su kenarlarında yaşayan korkunç bir figürdür.",
    },
    abasi: {
        title: "ABASILAR",
        desc: "Erlik Han'ın yeraltı ordusunun temelini oluşturan şer ruhlardır. Tek gözlü, tek bacaklı veya dişsiz olarak tasvir edilirler. İnsanlara hastalık yaymak, talihsizlik getirmek ve kurbanlarını yeraltı zindanlarına sürüklemekle görevli, Erlik'in sadık piyadeleridir.",
    },
    kamos: {
        title: "KAMOS",
        desc: "Uykunun ve kabusların karanlık efendisidir. Geceleri insanların göğsüne çökerek nefeslerini kesen, onları hareket edemez hale getiren duman formunda bir varlıktır. Erlik Han'ın zihinsel baskı kurmak ve korku yaymak için kullandığı en etkili gölgelerden biridir.",
    },
};

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

            <div className="section-inner" style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>

                {/* ÜST KISIM (HERO) */}
                <header className="kulliyat-header" style={{ textAlign: "center", padding: "60px 0 40px" }}>
                    <span style={{ color: "var(--celestial-gold)", letterSpacing: "4px", fontSize: "0.9rem", textTransform: "uppercase" }}>
                        {t("sagas.ergenekon.subtitle", "Demir Dağ Hapishanesi")}
                    </span>
                    <h1 style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontFamily: "var(--font-display)", margin: "10px 0", color: "var(--text-primary)", textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}>
                        {t("common.kulliyat", "KARANLIK KÜLLİYAT")}
                    </h1>
                </header>

                {/* GERİ DÖN BUTONU */}
                <div style={{ marginBottom: "60px" }}>
                    <Link href="/#shadow-realm" style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", letterSpacing: "1px", transition: "color 0.3s" }} className="hover-gold">
                        <span>←</span> {t("common.back", "Shadow Realm'e Dön")}
                    </Link>
                </div>

                {/* YARATIK LİSTESİ */}
                {Object.keys(CREATURE_DATA).map((key) => {
                    const creature = CREATURE_DATA[key];
                    return (
                        <article key={key} className="creature-article" style={{ marginBottom: "80px" }}>
                            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "var(--font-display)", color: "var(--celestial-gold)", margin: "0 0 30px", borderBottom: "1px solid var(--celestial-gold)", paddingBottom: "10px" }}>
                                {creature.title}
                            </h2>

                            {/* Resim Alanı */}
                            <div style={createCreatureImageStyle(key)} className="creature-image-container" />

                            <p style={{ fontSize: "1.15rem", lineHeight: "1.8", color: "var(--text-secondary)", marginBottom: "30px" }}>
                                {creature.desc}
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
    width: "90%", // Kapsayıcı genişliği
    aspectRatio: "1/1", // Kare formatını zorunlu kılar
    backgroundImage: `url('/images/${creatureKey}.png')`, // Resim yolu / ile başlamalıdır
    backgroundSize: "cover", // Resmi sığdırmak için
    backgroundPosition: "center",
    borderRadius: "12px", // Kenar yuvarlama
    marginBottom: "35px",
    opacity: 0.8,
    filter: "brightness(0.8) contrast(1.1)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
});