import { Cinzel, Inter, MedievalSharp } from "next/font/google";
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
const medieval = MedievalSharp({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-medieval",
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

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${cinzel.variable} ${inter.variable} ${medieval.variable}`}
    >
      <body>
        <LanguageSync />
        <MotionPreferences />
        {children}
      </body>
    </html>
  );
}
