import "./globals.css";
import { Cinzel, Inter, MedievalSharp } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const medievalSharp = MedievalSharp({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-medievalsharp",
  display: "swap",
});

export const metadata = {
  title: "Sonsuz Döngü — Türk Mitolojisi Dijital Ansiklopedisi",
  description:
    "Türk Kozmolojisinin yaşayan dokusuna yolculuk edin. Gökyüzü panteonu, Orta Dünya bozkırları ve Tamag'ın derinliklerini keşfedin. Tanrılar, yaratıklar ve destanların dijital müzesi.",
  keywords: "Türk mitolojisi, Tengri, Bayterek, Erlik Han, Ülgen, Kayra Han, Türk destanları, mitolojik yaratıklar",
  openGraph: {
    title: "Sonsuz Döngü — Türk Mitolojisi Dijital Ansiklopedisi",
    description: "Orta Asya'nın kadim mitolojisini ve kozmolojisini keşfedin.",
    url: "https://turkmitolojisi.com",
    siteName: "Sonsuz Döngü",
    images: [
      {
        url: "/images/hero-social.jpg",
        width: 1200,
        height: 630,
        alt: "Sonsuz Döngü - Türk Mitolojisi",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  // Schema.org JSON-LD structured data for Encyclopedia/VisualArtwork
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sonsuz Döngü — Türk Mitolojisi",
    "alternateName": "Turkic Mythology Digital Encyclopedia",
    "url": "https://turkmitolojisi.com",
    "description": "A comprehensive digital museum dedicated to Turkic mythology, deities, creatures, and sagas.",
    "genre": "Mythology, Folklore, History",
    "inLanguage": "tr"
  };

  return (
    <html
      lang="tr"
      className={`${cinzel.variable} ${inter.variable} ${medievalSharp.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
