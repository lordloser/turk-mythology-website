import "./globals.css";

export const metadata = {
  title: "The Infinite Cycle — A Cinematic Journey into Turkic Mythology",
  description:
    "Explore the living tapestry of Turkic Cosmology. Travel through the Celestial Heavens, the Steppes of Humanity, and the Abyss of Tamag. Discover deities, creatures, and legendary sagas.",
  keywords:
    "Turkic mythology, Tengri, Türk mitolojisi, Bayterek, Erlik Han, Ülgen, Kayra Han, Turkic gods, steppes mythology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
