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
  title: "The Infinite Cycle — A Cinematic Journey into Turkic Mythology",
  description:
    "Explore the living tapestry of Turkic Cosmology. Travel through the Celestial Heavens, the Steppes of Humanity, and the Abyss of Tamag. Discover deities, creatures, and legendary sagas.",
  keywords:
    "Turkic mythology, Tengri, Türk mitolojisi, Bayterek, Erlik Han, Ülgen, Kayra Han, Turkic gods, steppes mythology",
  openGraph: {
    title: "The Infinite Cycle — A Cinematic Journey into Turkic Mythology",
    description:
      "Explore the living tapestry of Turkic Cosmology — deities, creatures, and legendary sagas of the eternal steppe.",
    type: "website",
    locale: "tr_TR",
    siteName: "The Infinite Cycle",
    images: [{ url: "/images/ak-ana.webp", width: 640, height: 640, alt: "Ak Ana" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Infinite Cycle — Turkic Mythology",
    description:
      "A cinematic journey through Turkic Cosmology — deities, creatures, and legendary sagas.",
    images: ["/images/ak-ana.webp"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      className={`${cinzel.variable} ${inter.variable} ${medievalSharp.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
