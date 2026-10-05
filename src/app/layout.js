import { Cinzel, Inter, MedievalSharp, Noto_Sans_Old_Turkic } from "next/font/google";
import "./globals.css";
import LanguageSync from "./components/LanguageSync";
import MotionPreferences from "./components/MotionPreferences";
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, OG_IMAGE } from "@/site";

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

// Göktürk (Orhun) harfleri için; logodaki 𐱅 gibi karakterler her cihazda görünsün
const oldTurkic = Noto_Sans_Old_Turkic({
  subsets: ["old-turkic"],
  weight: "400",
  variable: "--font-old-turkic",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | The Infinite Cycle`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Türk mitolojisi",
    "Turkic mythology",
    "Tengri",
    "Gök Tengri",
    "Bayterek",
    "Erlik Han",
    "Ülgen",
    "Kayra Han",
    "Umay Ana",
    "Asena",
    "Ergenekon",
    "Oğuz Kağan",
    "Manas Destanı",
    "Türk destanları",
    "mitolojik yaratıklar",
    "şamanizm",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export const viewport = {
  themeColor: "#080808",
};

// Schema.org yapılandırılmış veri (arama motorları için site tanımı)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: "The Infinite Cycle — Turkic Mythology",
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  genre: "Mythology, Folklore, History",
  inLanguage: ["tr", "en"],
};

const INTRO_SCRIPT =
  "try{if(sessionStorage.getItem('introSeen'))document.documentElement.setAttribute('data-intro-seen','')}catch(e){}";

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${cinzel.variable} ${inter.variable} ${medievalSharp.variable} ${oldTurkic.variable}`}
    >
      <head>
        {/* Giriş ekranı oturumda görüldüyse sayfa çizilmeden işaretle (Loader.jsx) */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageSync />
        <MotionPreferences />
        {children}
      </body>
    </html>
  );
}
